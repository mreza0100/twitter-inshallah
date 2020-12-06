import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import Post from "./Post";
import Updoot from "./Updoot";

@ObjectType()
@Entity()
export default class User /* O2M <-OOO */ extends BaseEntity {
	@Field(T => Int)
	@PrimaryGeneratedColumn()
	id!: number;

	@Field(T => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(T => String)
	@UpdateDateColumn()
	updatedAt: Date;

	@Field(T => String)
	@Column()
	username!: string;

	@Field(T => String)
	@Column({ unique: true })
	email!: string;

	@Field(T => String, { nullable: true })
	@Column({ nullable: true, default: "" })
	bio: string;

	@Field(T => String)
	@Column({ nullable: false, unique: true })
	uniqueId!: string;

	@Field(T => String, { nullable: true })
	@Column({ nullable: true, default: "" })
	location: string;

	@Column()
	password!: string;

	@OneToMany(T => Post, post => post.user)
	posts: Array<Post>;

	@OneToMany(T => Updoot, updoot => updoot.user)
	updoots: Array<Updoot>;
}
