// ! ____________private only for this project____________
import { FieldError } from "../graphQL";
import { toArray } from ".";

/**
 * @function ErrMaping mapping a array of objects to on single object
 * [{field: "a", message: "bla bla bla"}] -> {a: "bla bla bla"}
 *
 * @param errors [{field: "a", message: "bla bla bla"}]
 */

function ErrMaping(errors: FieldError | FieldError[] | null | undefined) {
	const arrayOfErrors = toArray(errors);

	if (!arrayOfErrors[0]) return null;

	const mapedError: Record<string, string> = {};
	for (const err of arrayOfErrors) {
		const { field, message } = err as FieldError;
		mapedError[field] = message;
	}
	return mapedError;
}

export { ErrMaping };
