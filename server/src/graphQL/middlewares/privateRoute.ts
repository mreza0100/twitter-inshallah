import { MiddlewareFn } from "type-graphql";
import { GraphCTXT } from "../../@types";

export default (async function privateRoute({ context: { userId } }, next) {
	if (!userId) throw new Error("user is not authenticated");

	return next();
} as MiddlewareFn<GraphCTXT>);
