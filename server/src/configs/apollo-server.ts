import { ApolloServer, ApolloServerExpressConfig, ServerRegistration } from "apollo-server-express";
import PostResolver from "../graphQL/resolvers/post";
import UserResolver from "../graphQL/resolvers/user";
import { CustomReqT, GraphCTXT } from "../@types";
import { __IS_DEV__ } from "../helpers/constants";
import { Response, Application } from "express";
import { buildSchemaSync } from "type-graphql";
import { Redis } from "ioredis";

interface RequirementsT {
	app: Application;
	redis: Redis;
}
export default function burningApllo({ app, redis }: RequirementsT) {
	const apolloServerConfigs: ApolloServerExpressConfig = {
		playground: __IS_DEV__,
		schema: buildSchemaSync({
			resolvers: [PostResolver, UserResolver],
			validate: false,
		}),
		context: ({ req, res }: { req: CustomReqT; res: Response }): GraphCTXT => ({
			req,
			res,
			userId: req.session.userId as number,
			session: req.session,
			redis,
		}),
	};
	const applyMiddlewareConfigs: ServerRegistration = { app, cors: { origin: false } };

	new ApolloServer(apolloServerConfigs).applyMiddleware(applyMiddlewareConfigs);
}
