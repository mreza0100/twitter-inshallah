import { falseOK as OK } from "../../../helpers/constants";
import { UserResponse } from "../../types/User";
export { passwordLength } from "./register";

export function notAValidToken(): UserResponse {
	return {
		errors: {
			field: "token",
			message: "token is not valid",
		},

		OK,
	};
}
