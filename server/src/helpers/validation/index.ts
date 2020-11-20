import { emailRegExp } from "./regExp";

export function isEmail(email: string): boolean {
	return emailRegExp.test(email);
}
