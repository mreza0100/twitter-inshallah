import { __IS_DEV__ } from "../helpers/constants";
import { Application } from "express";
import morgan from "morgan";

export default async function redirects(app: Application) {
	if (!__IS_DEV__) return;

	app.use(
		morgan("dev", {
			stream: { write: console.log },
			immediate: false,
			skip: (req, res) => {
				if (req.body && req.body.operationName === "IntrospectionQuery") return true;
				return false;
			},
		})
	);
}
