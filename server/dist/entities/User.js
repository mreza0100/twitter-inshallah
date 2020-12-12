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
const Post_1 = __importDefault(require("./Post"));
const Updoot_1 = __importDefault(require("./Updoot"));
let User = class User extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(T => type_graphql_1.Int),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(T => String),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(T => String),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    type_graphql_1.Field(T => String),
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(T => String),
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(T => String, { nullable: true }),
    typeorm_1.Column({ nullable: true, default: "" }),
    __metadata("design:type", String)
], User.prototype, "bio", void 0);
__decorate([
    type_graphql_1.Field(T => String),
    typeorm_1.Column({ nullable: false, unique: true }),
    __metadata("design:type", String)
], User.prototype, "uniqueId", void 0);
__decorate([
    type_graphql_1.Field(T => String, { nullable: true }),
    typeorm_1.Column({ nullable: true, default: "" }),
    __metadata("design:type", String)
], User.prototype, "location", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.OneToMany(T => Post_1.default, post => post.user),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    typeorm_1.OneToMany(T => Updoot_1.default, updoot => updoot.user),
    __metadata("design:type", Array)
], User.prototype, "updoots", void 0);
User = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], User);
exports.default = User;
//# sourceMappingURL=User.js.map