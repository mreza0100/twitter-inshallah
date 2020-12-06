import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import Post from "./Post";
import User from "./User";

@Entity()
export default class Updoot extends BaseEntity {
	@Column({ type: "int" })
	value: number;

	@PrimaryColumn()
	userId: number;
	@ManyToOne(T => User, user => user.updoots)
	user: User;

	@PrimaryColumn()
	postId: number;
	@ManyToOne(T => Post, post => post.updoots)
	post: Post;
}
