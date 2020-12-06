import { useUsersQuery, User as UserT } from "../../graphQL";
import { RouteChildrenProps } from "react-router-dom";
import { Box, Grid } from "@material-ui/core";
import User from "../User";
import React from "react";

interface UsersPropsT extends RouteChildrenProps {}
export default function Users(props: UsersPropsT) {
	const [{ fetching, data }] = useUsersQuery();

	if (fetching) return null;
	const users = data?.users.users;

	return (
		<Box padding="10px">
			<Grid container justify="center" spacing={2}>
				{users?.map(user => {
					return <User key={user.id} history={props.history} user={user as UserT} />;
				})}
			</Grid>
		</Box>
	);
}
