import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import Updoot from "./Updoot";
import User from "./User";

@ObjectType()
@Entity()
export default class Post /* M2O OOO->O */ extends BaseEntity {
	@Field(T => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field()
	@Column({ type: "int", default: 0 })
	points!: number;

	// @Field(T => Int, { nullable: true })
	// voteStatus: number | null;

	@Field(T => String)
	@CreateDateColumn()
	createdAt: Date;

	@Field(T => String)
	@UpdateDateColumn()
	updatedAt: Date;

	@Field(T => String)
	@Column({ length: 160 })
	text!: string;

	@Field(T => Int)
	@Column()
	userId!: number;

	@Field(T => User)
	@ManyToOne(T => User, user => user.posts)
	user!: User;

	@OneToMany(T => Updoot, updoot => updoot.post)
	updoots: Array<Updoot>;
}
