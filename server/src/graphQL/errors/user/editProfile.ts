import { falseOK as OK } from "../../../helpers/constants";
import { UserResponse } from "../../types/User";

export function notAllowedToEditProfile(): UserResponse {
	return { OK, errors: { field: "not allowed", message: "not allowed" } };
}

export function bioLengthEditProfile(): UserResponse {
	return { OK, errors: { field: "bio", message: "chars are more then 160" } };
}

export function locationLengthEditProfile(): UserResponse {
	return { OK, errors: { field: "location", message: "chars are more then 30" } };
}

export function existUsername(username: string): UserResponse {
	return {
		errors: {
			field: "username",
			message: `${username} username alridy exist in db`,
		},

		OK,
	};
}

export {
	existEmail as existEmailEditProfile,
	existUniqueId as existUniqueIdEditProfile,
	notAEmail as notAEmailEditProfile,
	uniqueIdLength as uniqueIdLengthEditProfile,
	usernamelength as usernamelengthEditProfile,
} from "./register";
