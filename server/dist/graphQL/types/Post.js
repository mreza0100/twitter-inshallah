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
exports.PaginatedPosts = exports.PostInput = exports.PostResponse = void 0;
const type_graphql_1 = require("type-graphql");
const Post_1 = __importDefault(require("../../entities/Post"));
const general_1 = require("./general");
let PostResponse = class PostResponse {
};
__decorate([
    type_graphql_1.Field(T => Post_1.default, { nullable: true }),
    __metadata("design:type", Post_1.default)
], PostResponse.prototype, "post", void 0);
__decorate([
    type_graphql_1.Field(T => general_1.FieldError, { nullable: true }),
    __metadata("design:type", general_1.FieldError)
], PostResponse.prototype, "errors", void 0);
__decorate([
    type_graphql_1.Field(T => Boolean),
    __metadata("design:type", Boolean)
], PostResponse.prototype, "OK", void 0);
PostResponse = __decorate([
    type_graphql_1.ObjectType()
], PostResponse);
exports.PostResponse = PostResponse;
let PostInput = class PostInput {
};
__decorate([
    type_graphql_1.Field(T => String),
    __metadata("design:type", String)
], PostInput.prototype, "text", void 0);
PostInput = __decorate([
    type_graphql_1.InputType()
], PostInput);
exports.PostInput = PostInput;
let PaginatedPosts = class PaginatedPosts {
};
__decorate([
    type_graphql_1.Field(T => [Post_1.default]),
    __metadata("design:type", Array)
], PaginatedPosts.prototype, "posts", void 0);
__decorate([
    type_graphql_1.Field(T => Number),
    __metadata("design:type", Number)
], PaginatedPosts.prototype, "left", void 0);
__decorate([
    type_graphql_1.Field(T => Boolean),
    __metadata("design:type", Boolean)
], PaginatedPosts.prototype, "hasMore", void 0);
PaginatedPosts = __decorate([
    type_graphql_1.ObjectType()
], PaginatedPosts);
exports.PaginatedPosts = PaginatedPosts;
//# sourceMappingURL=Post.js.map