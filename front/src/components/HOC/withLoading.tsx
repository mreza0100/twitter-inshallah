import { LinearProgress } from "@material-ui/core";
import React, { useState } from "react";
import { defer } from "../../helpers";

interface WithLoadingPropsT {
	active?: boolean;
}
export default function withLoading(Component: JSXElementT, { active = false }: WithLoadingPropsT = {}) {
	return function <T>(props: T) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [isLoading, setLoading] = useState(active);

		if (!active) return <Component {...props} />;

		defer(() => setLoading(false));
		if (isLoading) return <LinearProgress color="secondary" />;
		return <Component {...props} />;
	};
}
