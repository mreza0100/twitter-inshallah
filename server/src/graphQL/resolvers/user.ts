import {
	existEmail,
	notAEmail,
	passwordLength,
	usernamelength,
	existUniqueId,
	uniqueIdLength,
} from "../errors/user/register";
import {
	notAllowedToEditProfile,
	existEmailEditProfile,
	existUniqueIdEditProfile,
	notAEmailEditProfile,
	uniqueIdLengthEditProfile,
	bioLengthEditProfile,
	locationLengthEditProfile,
} from "../errors/user/editProfile";
import {
	UserResponse,
	RegisterInput,
	UserResponseMultiError,
	EditProfielInput,
	UserResponseMultiUsers,
} from "../types/User";
import { notAValidToken, passwordLength as passwordLengthForChangePassword } from "../errors/user/change-password";
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX, FRONT_END_URL, trueOK as OK } from "../../helpers/constants";
import { Arg, Ctx, Resolver, Mutation, Query, UseMiddleware, FieldResolver, Root } from "type-graphql";
import { notValidPasswordOrUsername } from "../errors/user/login";
import { initWhere, mergeRecords } from "../../helpers";
import privateRoute from "../middlewares/privateRoute";
import { isEmail } from "../../helpers/validation";
import justInDev from "../middlewares/justInDev";
import { notAllowed } from "../errors/user/me";
import sendEmail from "../../helpers/email";
import { GraphCTXT } from "../../@types";
import User from "../../entities/User";
import argon2 from "argon2";
import { v4 } from "uuid";

@Resolver(User)
export default class UserResolver {
	@FieldResolver(T => String)
	email(@Root() user: User, @Ctx() { userId }: GraphCTXT): string | null {
		if (user.id === userId) return user.email;
		return "";
	}

	@Mutation(T => UserResponse)
	async changePassword(
		@Arg("token") token: string,
		@Arg("newPassword") newPassword: string,
		@Ctx() { redis }: GraphCTXT
	): Promise<UserResponse> {
		if (newPassword.length < 8) return passwordLengthForChangePassword(newPassword);

		const redisKey = FORGET_PASSWORD_PREFIX + token;

		const userId = await redis.get(redisKey);
		if (!userId) return notAValidToken();

		const user = await User.findOne({ id: Number(userId) });
		if (!user) return notAValidToken();

		user.password = await argon2.hash(newPassword);
		user.save();

		// await must be here but we dont care about result of it
		redis.del(redisKey);

		return { user, OK };
	}

	@Mutation(T => Boolean)
	async forgotPassword(@Ctx() { redis }: GraphCTXT, @Arg("email") email: string): Promise<true> {
		const user = await User.findOne<User>({ email });
		if (!user) return true;

		const token = v4();

		await redis.set(FORGET_PASSWORD_PREFIX + token, user.id, "ex", 1000 * 60 * 60 * 24 * 1);

		await sendEmail(user.email, {
			subject: "Reset password",
			html: `<a href="${FRONT_END_URL}/auth/change-password/${token}">reset password</a>`,
		});

		return true;
	}

	@Mutation(T => UserResponse)
	async register(@Arg("inputs") inputs: RegisterInput, @Ctx() ctx: GraphCTXT): Promise<UserResponse> {
		if (!isEmail(inputs.email)) return notAEmail(inputs.email);
		if (inputs.username.length < 3) return usernamelength(inputs.username);
		if (inputs.password.length < 8) return passwordLength(inputs.password);
		if (inputs.uniqueId.length < 3) return uniqueIdLength(inputs.uniqueId);

		const checkIsExist = await User.findOne({
			where: [{ email: inputs.email }, { username: inputs.username }, { uniqueId: inputs.uniqueId }],
		});

		if (checkIsExist) {
			if (checkIsExist.email === inputs.email) return existEmail(inputs.email);
			if (checkIsExist.uniqueId === inputs.uniqueId) return existUniqueId(inputs.uniqueId);
		}

		const user = await User.create({
			username: inputs.username,
			email: inputs.email,
			password: await argon2.hash(inputs.password),
			uniqueId: inputs.uniqueId,
		}).save();

		ctx.session.userId = user.id;

		return { user, OK };
	}

	@Mutation(T => UserResponseMultiError)
	async login(
		@Arg("uniqueIdOrEmail") uniqueIdOrEmail: string,
		@Arg("password") password: string,
		@Ctx() ctx: GraphCTXT
	): Promise<UserResponseMultiError> {
		const { add, get } = initWhere<User>();

		if (isEmail(uniqueIdOrEmail)) add({ email: uniqueIdOrEmail });
		else add({ uniqueId: uniqueIdOrEmail });

		const user = await User.findOne<User>({ where: get() });

		if (!user || !(await argon2.verify(user.password, password))) return notValidPasswordOrUsername();

		ctx.session.userId = user.id;

		return { user, OK };
	}

	@Mutation(T => Boolean)
	async logout(@Ctx() ctx: GraphCTXT): Promise<Boolean> {
		ctx.res.clearCookie(COOKIE_NAME);
		return new Promise(resolve => {
			ctx.session.destroy(err => {
				if (err) {
					console.log(err);
					return resolve(false);
				}

				resolve(true);
			});
		});
	}

	@Query(T => UserResponse)
	async me(@Ctx() { userId }: GraphCTXT): Promise<UserResponse> {
		const user = await User.findOne({ where: { id: userId } });
		if (!user) return notAllowed(userId);

		return { user, OK };
	}

	@UseMiddleware(privateRoute)
	@Mutation(T => UserResponse)
	async editProfile(@Arg("inputs") inputs: EditProfielInput, @Ctx() { userId }: GraphCTXT): Promise<UserResponse> {
		const user = await User.findOne({ where: { id: userId } });
		if (!user) return notAllowedToEditProfile();
		if (inputs.email && !isEmail(inputs.email)) return notAEmailEditProfile(inputs.email);
		if (inputs.uniqueId && inputs.uniqueId.length < 3) return uniqueIdLengthEditProfile(inputs.uniqueId);
		if (inputs.bio && inputs.bio.length > 160) return bioLengthEditProfile();
		if (inputs.location && inputs.location.length > 30) return locationLengthEditProfile();

		const duplicationCheck = await User.findOne({
			where: [{ email: inputs.email }, { uniqueId: inputs.uniqueId }],
		});
		if (duplicationCheck) {
			if (duplicationCheck.email === inputs.email && inputs.email !== user.email)
				return existEmailEditProfile(inputs.email);
			if (duplicationCheck.uniqueId === inputs.uniqueId && inputs.uniqueId !== user.uniqueId)
				return existUniqueIdEditProfile(inputs.uniqueId);
		}

		mergeRecords(user, inputs);

		return { user: await user.save(), OK };
	}

	@UseMiddleware(privateRoute)
	@Query(T => UserResponse)
	async user(@Arg("uniqueId") uniqueId: string, @Ctx() {}: GraphCTXT): Promise<UserResponse> {
		const user = await User.findOne({ where: { uniqueId } });
		if (!user) return { user: undefined, OK: false };

		return { user, OK };
	}

	@UseMiddleware(privateRoute)
	@Query(T => UserResponseMultiUsers)
	async users(@Arg("limit", { nullable: true, defaultValue: 0 }) limit: number): Promise<UserResponseMultiUsers> {
		const users = await User.find({ order: { createdAt: "DESC" }, take: limit });

		return { OK, users };
	}

	@UseMiddleware(justInDev)
	@Query(T => [User], { nullable: true })
	async userTest(
		@Arg("deleteAll", T => Boolean, { nullable: true }) deleteAll: boolean,
		@Ctx() ctx: GraphCTXT
	): Promise<any> {
		if (deleteAll) await User.delete({});

		return User.find();
	}
}
