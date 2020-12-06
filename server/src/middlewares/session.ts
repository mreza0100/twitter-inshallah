import { __IS_DEV__ } from "../helpers/constants";
import { QIDConfigs } from "../configs/sessions";
import { Redis as RedisT } from "ioredis";
import { Application } from "express";
import session from "express-session";

interface RequirementsT {
	redis: RedisT;
}
export default function sessionMiddleware(app: Application, { redis }: RequirementsT) {
	app.use(session(QIDConfigs({ redis })));
}
