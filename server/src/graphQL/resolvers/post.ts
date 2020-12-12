import { Arg, Ctx, Query, Resolver, Int, Mutation, UseMiddleware, FieldResolver, Root } from "type-graphql";
import { PaginatedPosts, PostInput, PostResponse } from "../types/Post";
import { getConnection, SelectQueryBuilder } from "typeorm";
import privateRoute from "../middlewares/privateRoute";
import { textLength } from "../errors/post/createPost";
import { trueOK as nullable } from "../../helpers/constants";
import justInDev from "../middlewares/justInDev";
import Updoot from "../../entities/Updoot";
import { TextSearch } from "../../helpers";
import { GraphCTXT } from "../../@types";
import Post from "../../entities/Post";
import User from "../../entities/User";

function postInnerJoinWithUser(qb: SelectQueryBuilder<Post>) {
	qb.innerJoin("p.user", "u")
		.addSelect("u.id", "u_id")
		.addSelect("u.email", "u_email")
		.addSelect("u.username", "u_username")
		.addSelect("u.bio", "u_bio")
		.addSelect("u.uniqueId", "u_uniqueId")
		.addSelect("u.location", "u_location")
		.addSelect("u.createdAt", "u_createdAt")
		.addSelect("u.updatedAt", "u_updatedAt");
}

@Resolver(Post)
export default class PostResolver {
	@UseMiddleware(privateRoute)
	@Mutation(T => Post, { nullable })
	async vote(
		@Arg("postId", T => Int) postId: number,
		@Arg("value", T => Int) value: number,
		@Ctx() { userId }: GraphCTXT
	): Promise<Post | undefined> {
		if (value !== 0 && value !== -1 && value !== 1) return undefined;

		const updoot = await Updoot.findOne({ where: { postId, userId } });
		const post = await Post.findOne({ id: postId }, { relations: ["user"] });

		if (!post) return undefined;

		if (value === 0) await Updoot.delete({ postId, userId });
		else {
			const createAndPoint = () => Updoot.insert({ userId, postId, value });
			const updateExistedPoint = () => Updoot.update({ userId, postId }, { value });

			if (updoot) await updateExistedPoint();
			else if (!updoot) await createAndPoint();
		}

		const getNewPoints = async () => {
			type CountResultT = { count: string }[];

			const mapQueryRes = (res: CountResultT) => Number(res[0].count);

			const upVotes: CountResultT = await getConnection().query(
				`select count(value) from updoot WHERE value = 1 AND "postId" = ${postId}`
			);
			const downVotes: CountResultT = await getConnection().query(
				`select count(value) from updoot WHERE value = -1 AND "postId" = ${postId}`
			);

			return mapQueryRes(upVotes) + -mapQueryRes(downVotes);
		};

		const newPoints = await getNewPoints();

		await Post.update({ id: postId }, { points: newPoints });

		post.points = newPoints;
		return post;
	}

	@Query(T => PaginatedPosts, { nullable })
	async posts(
		@Arg("limit", T => Int, { nullable, defaultValue: 25 }) limit: number | 25,
		@Arg("skip", T => Int, { nullable, defaultValue: false }) skip: number | false,
		@Arg("cursor", T => String, { nullable, defaultValue: false }) cursor: string | false,
		@Arg("uniqueProfileId", T => String, { nullable, defaultValue: false }) uniqueProfileId: string | false,
		@Arg("titlePattern", T => String, { nullable, defaultValue: false }) titlePattern: string | false,
		@Arg("textPattern", T => String, { nullable, defaultValue: false }) textPattern: string | false,
		@Ctx() { userId }: GraphCTXT<number | undefined>
	): Promise<PaginatedPosts> {
		const qb = getConnection()
			.getRepository(Post)
			.createQueryBuilder("p")
			.orderBy("p.createdAt", "DESC")
			.take(Math.min(50, limit));

		postInnerJoinWithUser(qb);

		if (cursor) qb.where("p.createdAt < :cursor", { cursor: new Date(parseInt(cursor)) });
		if (skip) qb.skip(skip);
		if (titlePattern) qb.andWhere(TextSearch("p.title", titlePattern));
		if (textPattern) qb.andWhere(TextSearch("p.text", textPattern));
		if (uniqueProfileId) {
			const targetProfile = await User.findOne({ where: { uniqueId: uniqueProfileId } });
			if (!targetProfile) return { hasMore: false, left: 0, posts: [] };
			qb.andWhere("p.userId = :userId", { userId: targetProfile.id });
		}

		const [posts, count] = await qb.getManyAndCount();

		return { posts, hasMore: count !== posts.length, left: count - posts.length };
	}

	@UseMiddleware(privateRoute)
	@Query(T => Post, { nullable })
	async post(
		@Arg("id", T => Int)
		postId: number,
		@Ctx() {}: GraphCTXT
	): Promise<Post | undefined> {
		return Post.findOne({ where: { id: postId }, relations: ["user", "updoots"] });
	}

	@UseMiddleware(privateRoute)
	@Mutation(T => Post, { nullable })
	async createPost(
		@Arg("input", T => PostInput) input: PostInput,
		@Ctx() { userId }: GraphCTXT
	): Promise<Post | undefined> {
		if (input.text.length > 160 || input.text.length < 1) return;

		const postId = (await Post.create({ ...input, userId }).save()).id;

		return Post.findOne({ where: { id: postId }, relations: ["user"] });
	}

	@UseMiddleware(privateRoute)
	@Mutation(T => Boolean, { nullable })
	async deletePost(@Arg("id", T => Int) id: number, @Ctx() { userId }: GraphCTXT): Promise<boolean> {
		const post = await Post.findOne({ where: { id } });
		if (!post || post.userId !== userId) return false;

		Updoot.delete({ postId: id });
		Post.delete({ id, userId });

		return true;
	}

	@UseMiddleware(privateRoute, justInDev)
	@Query(T => [Post], { nullable })
	async postTest(@Arg("deleteAll", T => Boolean, { nullable }) deleteAll: boolean, @Ctx() {}: GraphCTXT): Promise<any> {
		if (deleteAll) {
			await Updoot.delete({});
			await Post.delete({});
		}
		return Post.find({});
	}
}
