import { FieldError } from "../../types/general";
import { PostResponse } from "../../types/Post";

export function textLength(): PostResponse {
	return { errors: { field: "text", message: "text length is not correct" }, OK: false };
}
