import { IndexPath } from "../../routes/route.addresses";
import { RouteChildrenProps } from "react-router-dom";
import useMeCtx from "../../hooks/meCtx";
import { defer } from "../../helpers";
import React from "react";

export default function withSoPrivateRoute(keyInPath = "uniqueId") {
	return (Component: JSXElementT) => {
		return function <T extends RouteChildrenProps<{ [key: string]: string }>>(props: T) {
			const me = useMeCtx();

			const idInPath = props.match?.params[keyInPath] as string;
			const loggedInUniqueId = me.user?.uniqueId;
			const freeToGoForward = idInPath === loggedInUniqueId;

			if (!freeToGoForward) {
				defer(() => props.history.replace(IndexPath));
				return null;
			}
			return <Component {...props} />;
		};
	};
}
