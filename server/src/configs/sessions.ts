import { SECRET_KEY, __IS_DEV__, COOKIE_NAME as name } from "../helpers/constants";
import connectRedis from "connect-redis";
import session from "express-session";
import { Redis } from "ioredis";

interface RequirementsT {
	redis: Redis;
}
export function QIDConfigs({ redis }: RequirementsT) {
	// const RediStore = connectRedis(session);
	return {
		name,
		store: new (connectRedis(session))({ client: redis, disableTouch: true }),
		cookie: {
			maxAge: __IS_DEV__ ? /*1 year*/ 1000 * 60 * 60 * 24 * 365 : /*3 days*/ 1000 * 60 * 60 * 24 * 3,
			httpOnly: true,
			sameSite: "lax",
			secure: /*only works in https*/ false,
			path: "/",
		},
		saveUninitialized: false,
		secret: SECRET_KEY,
		resave: false,
	} as session.SessionOptions;
}
