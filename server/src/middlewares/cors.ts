import { __IS_DEV__ } from "../helpers/constants";
import { Application } from "express";
import cors from "cors";

export default function corsMiddleware(app: Application) {
	app.use(
		cors({
			origin: ["http://localhost:5000", "http://localhost:8000", "http://192.168.42.57:8000"],
			credentials: true,
		})
	);
}
