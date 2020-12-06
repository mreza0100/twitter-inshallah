import { __IS_DEV__ } from "../../helpers/constants";
import * as yup from "yup";

export interface ForgotPasswordFormT {
	email: string;
}

export const initilavalues = {
	email: __IS_DEV__ ? "mrez9090@gmail.com" : "",
};

export const schema = yup.object().shape({
	email: yup.string().required().trim().email(),
});
