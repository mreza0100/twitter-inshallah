import { POST_CHAR_LIMIT, __IS_DEV__ } from "../../helpers/constants";
import { randomText } from "../../helpers";
import * as yup from "yup";

export interface CreatePostFormT {
	text: string;
}

export const initialValues = {
	text: __IS_DEV__ ? randomText(10) : "",
};

export const schema = yup.object().shape({
	text: yup.string().required().trim().min(1).max(POST_CHAR_LIMIT),
});
