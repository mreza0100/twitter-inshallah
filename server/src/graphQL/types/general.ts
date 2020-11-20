import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class FieldError {
	@Field(T => String)
	field: string;
	@Field(T => String)
	message: string;
}
