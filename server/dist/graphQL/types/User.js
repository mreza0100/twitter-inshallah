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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditProfielInput = exports.UserResponseMultiError = exports.UserResponseMultiUsers = exports.UserResponse = exports.RegisterInput = void 0;
const type_graphql_1 = require("type-graphql");
const general_1 = require("./general");
const User_1 = __importDefault(require("../../entities/User"));
let RegisterInput = class RegisterInput {
};
__decorate([
    type_graphql_1.Field(T => String),
    __metadata("design:type", String)
], RegisterInput.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(T => String),
    __metadata("design:type", String)
], RegisterInput.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(T => String),
    __metadata("design:type", String)
], RegisterInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(T => String),
    __metadata("design:type", String)
], RegisterInput.prototype, "uniqueId", void 0);
RegisterInput = __decorate([
    type_graphql_1.InputType()
], RegisterInput);
exports.RegisterInput = RegisterInput;
let UserResponse = class UserResponse {
};
__decorate([
    type_graphql_1.Field(T => general_1.FieldError, { nullable: true }),
    __metadata("design:type", general_1.FieldError)
], UserResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(T => User_1.default, { nullable: true }),
    __metadata("design:type", User_1.default)
], UserResponse.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(T => Boolean),
    __metadata("design:type", Boolean)
], UserResponse.prototype, "OK", void 0);
UserResponse = __decorate([
    type_graphql_1.ObjectType()
], UserResponse);
exports.UserResponse = UserResponse;
let UserResponseMultiUsers = class UserResponseMultiUsers {
};
__decorate([
    type_graphql_1.Field(T => general_1.FieldError, { nullable: true }),
    __metadata("design:type", general_1.FieldError)
], UserResponseMultiUsers.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(T => [User_1.default], { nullable: true }),
    __metadata("design:type", Array)
], UserResponseMultiUsers.prototype, "users", void 0);
__decorate([
    type_graphql_1.Field(T => Boolean),
    __metadata("design:type", Boolean)
], UserResponseMultiUsers.prototype, "OK", void 0);
UserResponseMultiUsers = __decorate([
    type_graphql_1.ObjectType()
], UserResponseMultiUsers);
exports.UserResponseMultiUsers = UserResponseMultiUsers;
let UserResponseMultiError = class UserResponseMultiError {
};
__decorate([
    type_graphql_1.Field(T => [general_1.FieldError], { nullable: true }),
    __metadata("design:type", Array)
], UserResponseMultiError.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(T => User_1.default, { nullable: true }),
    __metadata("design:type", User_1.default)
], UserResponseMultiError.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field(T => Boolean),
    __metadata("design:type", Boolean)
], UserResponseMultiError.prototype, "OK", void 0);
UserResponseMultiError = __decorate([
    type_graphql_1.ObjectType()
], UserResponseMultiError);
exports.UserResponseMultiError = UserResponseMultiError;
let EditProfielInput = class EditProfielInput {
};
__decorate([
    type_graphql_1.Field(T => String, { nullable: true }),
    __metadata("design:type", String)
], EditProfielInput.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(T => String, { nullable: true }),
    __metadata("design:type", String)
], EditProfielInput.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(T => String, { nullable: true }),
    __metadata("design:type", String)
], EditProfielInput.prototype, "uniqueId", void 0);
__decorate([
    type_graphql_1.Field(T => String, { nullable: true }),
    __metadata("design:type", String)
], EditProfielInput.prototype, "bio", void 0);
__decorate([
    type_graphql_1.Field(T => String, { nullable: true }),
    __metadata("design:type", String)
], EditProfielInput.prototype, "location", void 0);
EditProfielInput = __decorate([
    type_graphql_1.InputType()
], EditProfielInput);
exports.EditProfielInput = EditProfielInput;
//# sourceMappingURL=User.js.map