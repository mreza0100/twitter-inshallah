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
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const Updoot_1 = __importDefault(require("./Updoot"));
const User_1 = __importDefault(require("./User"));
let Post = class Post extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(T => type_graphql_1.Int),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Post.prototype, "points", void 0);
__decorate([
    type_graphql_1.Field(T => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Post.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(T => String),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Post.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field(T => String),
    typeorm_1.Column({ length: 160 }),
    __metadata("design:type", String)
], Post.prototype, "text", void 0);
__decorate([
    type_graphql_1.Field(T => type_graphql_1.Int),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Post.prototype, "userId", void 0);
__decorate([
    type_graphql_1.Field(T => User_1.default),
    typeorm_1.ManyToOne(T => User_1.default, user => user.posts),
    __metadata("design:type", User_1.default)
], Post.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(T => Updoot_1.default, updoot => updoot.post),
    __metadata("design:type", Array)
], Post.prototype, "updoots", void 0);
Post = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Post);
exports.default = Post;
//# sourceMappingURL=Post.js.map