import { __IS_DEV__ } from "../../helpers/constants";
import * as yup from "yup";

export interface RegisterFormT {
	newPassword: string;
	confirmNewPassword: string;
}

export const initilavalues = {
	newPassword: __IS_DEV__ ? "99999999" : "",
	confirmNewPassword: __IS_DEV__ ? "99999999" : "",
};

export const schema = yup.object().shape({
	newPassword: yup.string().required().trim().min(8).max(36),
	confirmNewPassword: yup
		.string()
		.required()
		.trim()
		.min(8)
		.max(36)
		.oneOf([yup.ref("newPassword")], "Passwords must match"),
});
