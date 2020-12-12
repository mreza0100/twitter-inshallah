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
const register_1 = require("../errors/user/register");
const editProfile_1 = require("../errors/user/editProfile");
const User_1 = require("../types/User");
const change_password_1 = require("../errors/user/change-password");
const constants_1 = require("../../helpers/constants");
const type_graphql_1 = require("type-graphql");
const login_1 = require("../errors/user/login");
const helpers_1 = require("../../helpers");
const privateRoute_1 = __importDefault(require("../middlewares/privateRoute"));
const validation_1 = require("../../helpers/validation");
const justInDev_1 = __importDefault(require("../middlewares/justInDev"));
const me_1 = require("../errors/user/me");
const email_1 = __importDefault(require("../../helpers/email"));
const User_2 = __importDefault(require("../../entities/User"));
const argon2_1 = __importDefault(require("argon2"));
const uuid_1 = require("uuid");
let UserResolver = class UserResolver {
    email(user, { userId }) {
        if (user.id === userId)
            return user.email;
        return "";
    }
    async changePassword(token, newPassword, { redis }) {
        if (newPassword.length < 8)
            return change_password_1.passwordLength(newPassword);
        const redisKey = constants_1.FORGET_PASSWORD_PREFIX + token;
        const userId = await redis.get(redisKey);
        if (!userId)
            return change_password_1.notAValidToken();
        const user = await User_2.default.findOne({ id: Number(userId) });
        if (!user)
            return change_password_1.notAValidToken();
        user.password = await argon2_1.default.hash(newPassword);
        user.save();
        redis.del(redisKey);
        return { user, OK: constants_1.trueOK };
    }
    async forgotPassword({ redis }, email) {
        const user = await User_2.default.findOne({ email });
        if (!user)
            return true;
        const token = uuid_1.v4();
        await redis.set(constants_1.FORGET_PASSWORD_PREFIX + token, user.id, "ex", 1000 * 60 * 60 * 24 * 1);
        await email_1.default(user.email, {
            subject: "Reset password",
            html: `<a href="${constants_1.FRONT_END_URL}/auth/change-password/${token}">reset password</a>`,
        });
        return true;
    }
    async register(inputs, ctx) {
        if (!validation_1.isEmail(inputs.email))
            return register_1.notAEmail(inputs.email);
        if (inputs.username.length < 3)
            return register_1.usernamelength(inputs.username);
        if (inputs.password.length < 8)
            return register_1.passwordLength(inputs.password);
        if (inputs.uniqueId.length < 3)
            return register_1.uniqueIdLength(inputs.uniqueId);
        const checkIsExist = await User_2.default.findOne({
            where: [{ email: inputs.email }, { username: inputs.username }, { uniqueId: inputs.uniqueId }],
        });
        if (checkIsExist) {
            if (checkIsExist.email === inputs.email)
                return register_1.existEmail(inputs.email);
            if (checkIsExist.uniqueId === inputs.uniqueId)
                return register_1.existUniqueId(inputs.uniqueId);
        }
        const user = await User_2.default.create({
            username: inputs.username,
            email: inputs.email,
            password: await argon2_1.default.hash(inputs.password),
            uniqueId: inputs.uniqueId,
        }).save();
        ctx.session.userId = user.id;
        return { user, OK: constants_1.trueOK };
    }
    async login(uniqueIdOrEmail, password, ctx) {
        const { add, get } = helpers_1.initWhere();
        if (validation_1.isEmail(uniqueIdOrEmail))
            add({ email: uniqueIdOrEmail });
        else
            add({ uniqueId: uniqueIdOrEmail });
        const user = await User_2.default.findOne({ where: get() });
        if (!user || !(await argon2_1.default.verify(user.password, password)))
            return login_1.notValidPasswordOrUsername();
        ctx.session.userId = user.id;
        return { user, OK: constants_1.trueOK };
    }
    async logout(ctx) {
        ctx.res.clearCookie(constants_1.COOKIE_NAME);
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
    async me({ userId }) {
        const user = await User_2.default.findOne({ where: { id: userId } });
        if (!user)
            return me_1.notAllowed(userId);
        return { user, OK: constants_1.trueOK };
    }
    async editProfile(inputs, { userId }) {
        const user = await User_2.default.findOne({ where: { id: userId } });
        if (!user)
            return editProfile_1.notAllowedToEditProfile();
        if (inputs.email && !validation_1.isEmail(inputs.email))
            return editProfile_1.notAEmailEditProfile(inputs.email);
        if (inputs.uniqueId && inputs.uniqueId.length < 3)
            return editProfile_1.uniqueIdLengthEditProfile(inputs.uniqueId);
        if (inputs.bio && inputs.bio.length > 160)
            return editProfile_1.bioLengthEditProfile();
        if (inputs.location && inputs.location.length > 30)
            return editProfile_1.locationLengthEditProfile();
        const duplicationCheck = await User_2.default.findOne({
            where: [{ email: inputs.email }, { uniqueId: inputs.uniqueId }],
        });
        if (duplicationCheck) {
            if (duplicationCheck.email === inputs.email && inputs.email !== user.email)
                return editProfile_1.existEmailEditProfile(inputs.email);
            if (duplicationCheck.uniqueId === inputs.uniqueId && inputs.uniqueId !== user.uniqueId)
                return editProfile_1.existUniqueIdEditProfile(inputs.uniqueId);
        }
        helpers_1.mergeRecords(user, inputs);
        return { user: await user.save(), OK: constants_1.trueOK };
    }
    async user(uniqueId, {}) {
        const user = await User_2.default.findOne({ where: { uniqueId } });
        if (!user)
            return { user: undefined, OK: false };
        return { user, OK: constants_1.trueOK };
    }
    async users(limit) {
        const users = await User_2.default.find({ order: { createdAt: "DESC" }, take: limit });
        return { OK: constants_1.trueOK, users };
    }
    async userTest(deleteAll, ctx) {
        if (deleteAll)
            await User_2.default.delete({});
        return User_2.default.find();
    }
};
__decorate([
    type_graphql_1.FieldResolver(T => String),
    __param(0, type_graphql_1.Root()), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_2.default, Object]),
    __metadata("design:returntype", Object)
], UserResolver.prototype, "email", null);
__decorate([
    type_graphql_1.Mutation(T => User_1.UserResponse),
    __param(0, type_graphql_1.Arg("token")),
    __param(1, type_graphql_1.Arg("newPassword")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "changePassword", null);
__decorate([
    type_graphql_1.Mutation(T => Boolean),
    __param(0, type_graphql_1.Ctx()), __param(1, type_graphql_1.Arg("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "forgotPassword", null);
__decorate([
    type_graphql_1.Mutation(T => User_1.UserResponse),
    __param(0, type_graphql_1.Arg("inputs")), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.RegisterInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    type_graphql_1.Mutation(T => User_1.UserResponseMultiError),
    __param(0, type_graphql_1.Arg("uniqueIdOrEmail")),
    __param(1, type_graphql_1.Arg("password")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Mutation(T => Boolean),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "logout", null);
__decorate([
    type_graphql_1.Query(T => User_1.UserResponse),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "me", null);
__decorate([
    type_graphql_1.UseMiddleware(privateRoute_1.default),
    type_graphql_1.Mutation(T => User_1.UserResponse),
    __param(0, type_graphql_1.Arg("inputs")), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User_1.EditProfielInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "editProfile", null);
__decorate([
    type_graphql_1.UseMiddleware(privateRoute_1.default),
    type_graphql_1.Query(T => User_1.UserResponse),
    __param(0, type_graphql_1.Arg("uniqueId")), __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "user", null);
__decorate([
    type_graphql_1.UseMiddleware(privateRoute_1.default),
    type_graphql_1.Query(T => User_1.UserResponseMultiUsers),
    __param(0, type_graphql_1.Arg("limit", { nullable: true, defaultValue: 0 })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    type_graphql_1.UseMiddleware(justInDev_1.default),
    type_graphql_1.Query(T => [User_2.default], { nullable: true }),
    __param(0, type_graphql_1.Arg("deleteAll", T => Boolean, { nullable: true })),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "userTest", null);
UserResolver = __decorate([
    type_graphql_1.Resolver(User_2.default)
], UserResolver);
exports.default = UserResolver;
//# sourceMappingURL=user.js.map