import { __IS_DEV__ } from "../../helpers/constants";
import * as yup from "yup";

export interface RegisterFormT {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	uniqueId: string;
}

export const initilavalues = {
	username: __IS_DEV__ ? "mamad" : "",
	email: __IS_DEV__ ? "mrez9090@gmail.com" : "",
	password: __IS_DEV__ ? "88888888" : "",
	confirmPassword: __IS_DEV__ ? "88888888" : "",
	uniqueId: __IS_DEV__ ? "mamade" : "",
};

export const schema = yup.object().shape({
	username: yup.string().required().trim().min(3).max(20),
	email: yup.string().required().trim().email(),
	uniqueId: yup.string().required().trim().min(3).max(36),
	password: yup.string().required().trim().min(8).max(36),
	confirmPassword: yup
		.string()
		.required()
		.trim()
		.min(8)
		.max(36)
		.oneOf([yup.ref("password")], "Passwords must match"),
});
