import React from "react";

export default function withLayout(Component: JSXElementT | null, Layout: JSXElementT | null) {
	if (!Component) return null;

	return function <T>(props: T) {
		if (!Layout) return <Component {...props} />;

		return (
			<Layout {...props}>
				<Component {...props} />
			</Layout>
		);
	};
}
