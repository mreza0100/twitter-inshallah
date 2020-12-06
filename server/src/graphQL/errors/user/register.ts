import { falseOK as OK } from "../../../helpers/constants";
import { UserResponse } from "../../types/User";

export function usernamelength(username: string): UserResponse {
	return {
		errors: {
			field: "username",
			message: `${username} username is less then 3 char`,
		},

		OK,
	};
}
export function passwordLength(password: string): UserResponse {
	return {
		errors: {
			field: "password",
			message: `${password} is less then 8 char`,
		},

		OK,
	};
}

export function existEmail(email: string): UserResponse {
	return {
		errors: {
			field: "email",
			message: `${email} email alridy exist in db`,
		},

		OK,
	};
}
export function notAEmail(email: string): UserResponse {
	return {
		errors: {
			field: "email",
			message: `${email} is not a email`,
		},

		OK,
	};
}

export function existUniqueId(uniqueId: string): UserResponse {
	return {
		errors: {
			field: "uniqueId",
			message: `${uniqueId} unique is exist`,
		},

		OK,
	};
}

export function uniqueIdLength(uniqueId: string): UserResponse {
	return {
		errors: {
			field: "uniqueId",
			message: `your ${uniqueId} is less then 3 char`,
		},

		OK,
	};
}
