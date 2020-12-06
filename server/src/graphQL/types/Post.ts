import { InputType, Field, ObjectType } from "type-graphql";
import Post from "../../entities/Post";
import { FieldError } from "./general";

@ObjectType()
export class PostResponse {
	@Field(T => Post, { nullable: true })
	post?: Post;

	@Field(T => FieldError, { nullable: true })
	errors?: FieldError;

	@Field(T => Boolean)
	OK: boolean;
}

@InputType()
export class PostInput {
	@Field(T => String)
	text!: string;
}

@ObjectType()
export class PaginatedPosts {
	@Field(T => [Post])
	posts: Array<Post>;
	@Field(T => Number)
	left: number;
	@Field(T => Boolean)
	hasMore: boolean;
}
