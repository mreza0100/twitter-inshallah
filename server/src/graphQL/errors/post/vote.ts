import { FieldError } from "../../types/general";

export function postNotFound(): FieldError {
	return { field: "value", message: "post not found" };
}
