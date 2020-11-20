import RouteDriver, { configs } from "../routes/RouteDriver";
import { PostCTXProvider } from "../contexts/posts";
import useParseRoutes from "../hooks/routeParser";
import { Provider as UrlqProvider } from "urql";
import { MeCTXProvider } from "../contexts/me";
import { Switch } from "react-router-dom";
import client from "../graphQL/configs";
import React from "react";

export default function App() {
	const parsedRoutes = useParseRoutes(RouteDriver, configs);

	return (
		<UrlqProvider value={client}>
			<MeCTXProvider>
				<PostCTXProvider>
					<Switch>{parsedRoutes}</Switch>
				</PostCTXProvider>
			</MeCTXProvider>
		</UrlqProvider>
	);
}
