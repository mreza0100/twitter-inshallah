import { LoginFullPath } from "../../routes/route.addresses";
import { RouteChildrenProps } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";
import { useMeQuery } from "../../graphQL";
import { defer } from "../../helpers";
import React from "react";

export default function withPrivateRoute(Component: JSXElementT) {
	return function <T extends RouteChildrenProps>(props: T) {
		const [{ data, fetching }] = useMeQuery();

		if (fetching) return <LinearProgress color="secondary" />;

		if (!data?.me.OK) {
			defer(() => props.history.replace(LoginFullPath));
			return null;
		}
		return <Component {...props} />;
	};
}
