import * as yup from "yup";

export interface EditProfileFormT {
	username: string;
	email: string;
	uniqueId: string;
	bio: string;
	location: string;
}

export const schema = yup.object().shape({
	username: yup.string().required().trim().min(3).max(20),
	email: yup.string().required().trim().email(),
	uniqueId: yup.string().required().trim().min(3).max(36),
	bio: yup.string().trim().max(160),
	location: yup.string().trim().max(30),
});
