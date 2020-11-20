import { Grid, CardActionArea, Card, Box, Typography } from "@material-ui/core";
import { UserPath } from "../routes/route.addresses";
import { User as UserT } from "../graphQL";
import $ from "styled-components";
import { History } from "history";
import React from "react";

interface UserPropsT {
	user: UserT;
	history: History;
}
export default function User({ user, history }: UserPropsT) {
	const onClick = () => history.push(`${UserPath}/${user.uniqueId}`);

	return (
		<Grid item xs={12}>
			<Card>
				<CardActionArea onClick={onClick}>
					<StyledUser>
						<Grid container justify="flex-start">
							<Grid item xs={12} container justify="flex-start">
								<Grid item xs={3}>
									<Typography>{user.username}</Typography>
								</Grid>
								<Grid item xs={5}>
									<Box paddingLeft="20px">
										<Typography>@{user.uniqueId}</Typography>
									</Box>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Box padding="10px 0">
									<Typography>{user.bio}</Typography>
								</Box>
							</Grid>
						</Grid>
					</StyledUser>
				</CardActionArea>
			</Card>
		</Grid>
	);
}
const StyledUser = $.div(props => {
	return `
		padding: 10px;
		min-height: 80px;
		a {
			color: black;
		}
		`;
});
