import { falseOK as OK } from "../../../helpers/constants";
import { UserResponse } from "../../types/User";

export function notAllowed(id: number): UserResponse {
	return {
		errors: {
			field: "ID",
			message: `${id} ID is not allowed`,
		},

		OK,
	};
}
