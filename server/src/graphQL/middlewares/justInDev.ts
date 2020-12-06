import { __IS_DEV__ } from "../../helpers/constants";
import { MiddlewareFn } from "type-graphql";
import { GraphCTXT } from "../../@types";

export default (async function justInDev(_, next): Promise<any> {
	if (!__IS_DEV__) throw new Error("not found route");

	return next();
} as MiddlewareFn<GraphCTXT>);
