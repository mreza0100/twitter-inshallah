import { __IS_DEV__ } from "../../helpers/constants";
import * as yup from "yup";

export interface LoginFormT {
	uniqueIdOrEmail: string;
	password: string;
}

export const initilavalues = {
	uniqueIdOrEmail: __IS_DEV__ ? "mamad" : "",
	password: __IS_DEV__ ? "88888888" : "",
};

export const schema = yup.object().shape({
	uniqueIdOrEmail: yup.string().required().trim(),
	password: yup.string().required().trim().min(8).max(36),
});
