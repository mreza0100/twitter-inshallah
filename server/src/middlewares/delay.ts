import { delayTime, __IS_DEV__ } from "../helpers/constants";
import { Application } from "express";

export default function delayMiddlaware(app: Application) {
	if (!__IS_DEV__) return;

	if (delayTime) {
		app.use((req, res, next) => {
			setTimeout(() => {
				next();
			}, delayTime);
		});
	}
}
