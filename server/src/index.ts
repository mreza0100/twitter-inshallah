import "./helpers/test";
import "reflect-metadata";
// !--
import { PORT, DELETE_DB, __IS_DEV__ } from "./helpers/constants";
import middlewaresInitializing from "./middlewares";
import burningApllo from "./configs/apollo-server";
import { createConnection } from "typeorm";
import typeormConfigs from "./configs/db";
import Updoot from "./entities/Updoot";
import User from "./entities/User";
import Post from "./entities/Post";
import express from "express";
import Redis from "ioredis";

(async () => {
	await PSQLConnection();
	const redis = redisConnection();

	const app = express();

	middlewaresInitializing(app, { redis });
	burningApllo({ app, redis });

	app.listen(PORT, () => {
		console.log(
			"\x1b[36m%s\x1b[0m",
			`🚀<|*__*|>🚀 --> SERVER is up and running on port: ${PORT}
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n`
		);
	});
})().catch(err => console.error(err));

async function PSQLConnection() {
	const connection = await createConnection(typeormConfigs);
	if (DELETE_DB) {
		connection.getRepository(Updoot).delete({});
		connection.getRepository(Post).delete({});
		connection.getRepository(User).delete({});
	}
}
function redisConnection() {
	return new Redis();
}
