import { RouteChildrenProps } from "react-router-dom";
import { Box, Grid } from "@material-ui/core";
import Header from "../Header";
import React from "react";

interface MainLayoutPropsT extends RouteChildrenProps {
	children: React.ReactNode;
}
export default function MainLayout(props: MainLayoutPropsT) {
	return (
		<Box>
			<Grid container justify="space-evenly">
				<Grid item sm={2} xs={3}>
					<Header />
				</Grid>
				<Grid item xs={7}>
					{props.children}
				</Grid>
				<Grid item xs={1} />
			</Grid>
		</Box>
	);
}
