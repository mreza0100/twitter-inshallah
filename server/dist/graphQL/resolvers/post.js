"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const Post_1 = require("../types/Post");
const typeorm_1 = require("typeorm");
const privateRoute_1 = __importDefault(require("../middlewares/privateRoute"));
const constants_1 = require("../../helpers/constants");
const justInDev_1 = __importDefault(require("../middlewares/justInDev"));
const Updoot_1 = __importDefault(require("../../entities/Updoot"));
const helpers_1 = require("../../helpers");
const Post_2 = __importDefault(require("../../entities/Post"));
const User_1 = __importDefault(require("../../entities/User"));
function postInnerJoinWithUser(qb) {
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
let PostResolver = class PostResolver {
    async vote(postId, value, { userId }) {
        if (value !== 0 && value !== -1 && value !== 1)
            return undefined;
        const updoot = await Updoot_1.default.findOne({ where: { postId, userId } });
        const post = await Post_2.default.findOne({ id: postId }, { relations: ["user"] });
        if (!post)
            return undefined;
        if (value === 0)
            await Updoot_1.default.delete({ postId, userId });
        else {
            const createAndPoint = () => Updoot_1.default.insert({ userId, postId, value });
            const updateExistedPoint = () => Updoot_1.default.update({ userId, postId }, { value });
            if (updoot)
                await updateExistedPoint();
            else if (!updoot)
                await createAndPoint();
        }
        const getNewPoints = async () => {
            const mapQueryRes = (res) => Number(res[0].count);
            const upVotes = await typeorm_1.getConnection().query(`select count(value) from updoot WHERE value = 1 AND "postId" = ${postId}`);
            const downVotes = await typeorm_1.getConnection().query(`select count(value) from updoot WHERE value = -1 AND "postId" = ${postId}`);
            return mapQueryRes(upVotes) + -mapQueryRes(downVotes);
        };
        const newPoints = await getNewPoints();
        await Post_2.default.update({ id: postId }, { points: newPoints });
        post.points = newPoints;
        return post;
    }
    async posts(limit, skip, cursor, uniqueProfileId, titlePattern, textPattern, { userId }) {
        const qb = typeorm_1.getConnection()
            .getRepository(Post_2.default)
            .createQueryBuilder("p")
            .orderBy("p.createdAt", "DESC")
            .take(Math.min(50, limit));
        postInnerJoinWithUser(qb);
        if (cursor)
            qb.where("p.createdAt < :cursor", { cursor: new Date(parseInt(cursor)) });
        if (skip)
            qb.skip(skip);
        if (titlePattern)
            qb.andWhere(helpers_1.TextSearch("p.title", titlePattern));
        if (textPattern)
            qb.andWhere(helpers_1.TextSearch("p.text", textPattern));
        if (uniqueProfileId) {
            const targetProfile = await User_1.default.findOne({ where: { uniqueId: uniqueProfileId } });
            if (!targetProfile)
                return { hasMore: false, left: 0, posts: [] };
            qb.andWhere("p.userId = :userId", { userId: targetProfile.id });
        }
        const [posts, count] = await qb.getManyAndCount();
        return { posts, hasMore: count !== posts.length, left: count - posts.length };
    }
    async post(postId, {}) {
        return Post_2.default.findOne({ where: { id: postId }, relations: ["user", "updoots"] });
    }
    async createPost(input, { userId }) {
        if (input.text.length > 160 || input.text.length < 1)
            return;
        const postId = (await Post_2.default.create({ ...input, userId }).save()).id;
        return Post_2.default.findOne({ where: { id: postId }, relations: ["user"] });
    }
    async deletePost(id, { userId }) {
        const post = await Post_2.default.findOne({ where: { id } });
        if (!post || post.userId !== userId)
            return false;
        Updoot_1.default.delete({ postId: id });
        Post_2.default.delete({ id, userId });
        return true;
    }
    async postTest(deleteAll, {}) {
        if (deleteAll) {
            await Updoot_1.default.delete({});
            await Post_2.default.delete({});
        }
        return Post_2.default.find({});
    }
};
__decorate([
    type_graphql_1.UseMiddleware(privateRoute_1.default),
    type_graphql_1.Mutation(T => Post_2.default, { nullable: constants_1.trueOK }),
    __param(0, type_graphql_1.Arg("postId", T => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("value", T => type_graphql_1.Int)),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "vote", null);
__decorate([
    type_graphql_1.Query(T => Post_1.PaginatedPosts, { nullable: constants_1.trueOK }),
    __param(0, type_graphql_1.Arg("limit", T => type_graphql_1.Int, { nullable: constants_1.trueOK, defaultValue: 25 })),
    __param(1, type_graphql_1.Arg("skip", T => type_graphql_1.Int, { nullable: constants_1.trueOK, defaultValue: false })),
    __param(2, type_graphql_1.Arg("cursor", T => String, { nullable: constants_1.trueOK, defaultValue: false })),
    __param(3, type_graphql_1.Arg("uniqueProfileId", T => String, { nullable: constants_1.trueOK, defaultValue: false })),
    __param(4, type_graphql_1.Arg("titlePattern", T => String, { nullable: constants_1.trueOK, defaultValue: false })),
    __param(5, type_graphql_1.Arg("textPattern", T => String, { nullable: constants_1.trueOK, defaultValue: false })),
    __param(6, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object, Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "posts", null);
__decorate([
    type_graphql_1.UseMiddleware(privateRoute_1.default),
    type_graphql_1.Query(T => Post_2.default, { nullable: constants_1.trueOK }),
    __param(0, type_graphql_1.Arg("id", T => type_graphql_1.Int)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "post", null);
__decorate([
    type_graphql_1.UseMiddleware(privateRoute_1.default),
    type_graphql_1.Mutation(T => Post_2.default, { nullable: constants_1.trueOK }),
    __param(0, type_graphql_1.Arg("input", T => Post_1.PostInput)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Post_1.PostInput, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
__decorate([
    type_graphql_1.UseMiddleware(privateRoute_1.default),
    type_graphql_1.Mutation(T => Boolean, { nullable: constants_1.trueOK }),
    __param(0, type_graphql_1.Arg("id", T => type_graphql_1.Int)), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deletePost", null);
__decorate([
    type_graphql_1.UseMiddleware(privateRoute_1.default, justInDev_1.default),
    type_graphql_1.Query(T => [Post_2.default], { nullable: constants_1.trueOK }),
    __param(0, type_graphql_1.Arg("deleteAll", T => Boolean, { nullable: constants_1.trueOK })), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "postTest", null);
PostResolver = __decorate([
    type_graphql_1.Resolver(Post_2.default)
], PostResolver);
exports.default = PostResolver;
//# sourceMappingURL=post.js.map