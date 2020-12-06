import { InputType, Field, ObjectType } from "type-graphql";
import { FieldError } from "./general";
import User from "../../entities/User";

@InputType()
export class RegisterInput {
	@Field(T => String)
	username!: string;
	@Field(T => String)
	password!: string;
	@Field(T => String)
	email!: string;
	@Field(T => String)
	uniqueId!: string;
}

@ObjectType()
export class UserResponse {
	@Field(T => FieldError, { nullable: true })
	errors?: FieldError;

	@Field(T => User, { nullable: true })
	user?: User;

	@Field(T => Boolean)
	OK!: boolean;
}

@ObjectType()
export class UserResponseMultiUsers {
	@Field(T => FieldError, { nullable: true })
	errors?: FieldError;

	@Field(T => [User], { nullable: true })
	users?: Array<User>;

	@Field(T => Boolean)
	OK!: boolean;
}

@ObjectType()
export class UserResponseMultiError {
	@Field(T => [FieldError], { nullable: true })
	errors?: Array<FieldError>;

	@Field(T => User, { nullable: true })
	user?: User;

	@Field(T => Boolean)
	OK: boolean;
}

@InputType()
export class EditProfielInput {
	@Field(T => String, { nullable: true })
	username: string;
	@Field(T => String, { nullable: true })
	email: string;
	@Field(T => String, { nullable: true })
	uniqueId: string;
	@Field(T => String, { nullable: true })
	bio: string;
	@Field(T => String, { nullable: true })
	location!: string;
}
