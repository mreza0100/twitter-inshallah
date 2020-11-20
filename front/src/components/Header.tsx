import { IndexPath, UserPath } from "../routes/route.addresses";
import useMenuMaker, { MenuDataT } from "../hooks/MenuMaker";
import { Home, Person, People } from "@material-ui/icons";
import { Box, Typography } from "@material-ui/core";
import useMeCtx from "../hooks/meCtx";
import { MeQuery } from "../graphQL";
import $ from "styled-components";
import React from "react";

const menuData = (me: MeQuery["me"]) =>
	[
		{
			path: IndexPath,
			Icon: <Home />,
			isMyLocation: currentPath => currentPath === IndexPath,
		},
		{
			path: `${UserPath}/${me.user?.uniqueId}`,
			Icon: (
				<Box display="flex" alignItems="center" justifyContent="center">
					<Person />
					<span>{me.user?.username}</span>
				</Box>
			),
			isMyLocation: currentPath => currentPath.includes(`${UserPath}/${me.user?.uniqueId}`),
		},
		{
			path: UserPath,
			Icon: <People />,
			isMyLocation: currentPath => currentPath === UserPath,
		},
	] as MenuDataT;

interface HeaderPropsT {}
export default function Header(props: HeaderPropsT) {
	const me = useMeCtx();

	const menu = useMenuMaker({ data: menuData(me) });

	if (!me.user) return null;
	return (
		<Root>
			<Box width="100%">
				<Typography variant="h6" id="heading">
					Twitter inshalaH
				</Typography>
				<Box marginTop="20px" minWidth="100%">
					{menu}
				</Box>
			</Box>
		</Root>
	);
}

const Root = $.header(({ theme: { flex } }) => {
	return `
		width: 100%;
		max-width: inherit;
		height: 100vh;

		position: fixed;
		left: 0;
		top: 0;
		bottom: 0;

		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;


		background: #974163;

		color: white;
		text-align: center;

		#heading {
			font-weight: 600;
		}

		.h-100 {
			height: 100% !important;
		}
		`;
});
