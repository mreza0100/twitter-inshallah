import redirectsMiddleware from "./redirects";
import sessionMiddleware from "./session";
import loggerMiddleware from "./logger";
import delayMiddleware from "./delay";
import testMiddleware from "./test";
import corsMiddleware from "./cors";

import { Application } from "express";
import { Redis } from "ioredis";

interface ExtraRequirements {
	redis: Redis;
}
export default function middlewaresInitializing(app: Application, { redis }: ExtraRequirements) {
	loggerMiddleware(app);
	delayMiddleware(app);
	testMiddleware(app);

	corsMiddleware(app);
	sessionMiddleware(app, { redis });
	redirectsMiddleware(app);
}
