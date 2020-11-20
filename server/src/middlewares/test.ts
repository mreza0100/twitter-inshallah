import { __IS_DEV__ } from "../helpers/constants";
import { getConnection } from "typeorm";
import { Application } from "express";

export default function test(app: Application) {
	app.get("/test", async (req, res) => {
		const isConnected = getConnection().isConnected;
		res.json({ dbConnection: isConnected });
	});
}
