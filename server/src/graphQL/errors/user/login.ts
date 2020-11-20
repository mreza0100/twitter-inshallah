import { falseOK as OK } from "../../../helpers/constants";
import { UserResponseMultiError } from "../../types/User";

export function notValidPasswordOrUsername(): UserResponseMultiError {
	return {
		errors: [
			{ field: "username", message: "username or password is wrong" },
			{ field: "password", message: "password or username is wrong" },
		],
		OK,
	};
}
