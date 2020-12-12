import { __IS_DEV__, FRONT_END_URL } from "../helpers/constants";
import { Application } from "express";
import cors from "cors";

export default function corsMiddleware(app: Application) {
	app.use(
		cors({
			origin: FRONT_END_URL,
			credentials: true,
		})
	);
}
