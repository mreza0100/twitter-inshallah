import { Application } from "express";
import { __IS_DEV__ } from "../helpers/constants";

export default async function redirects(app: Application) {
	if (!__IS_DEV__) return;

	app.get("/", (req, res) => {
		res.redirect("/graphql");
	});
}
