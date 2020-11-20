import { RouteChildrenProps } from "react-router-dom";
import useMenuMaker, { MenuDataT } from "../../hooks/MenuMaker";
import { Grid } from "@material-ui/core";
import $ from "styled-components";
import React from "react";
import { ForgotPasswordFullPath, LoginFullPath, RegisterFullPath } from "../../routes/route.addresses";

const menuData: MenuDataT = [
	{
		path: LoginFullPath,
		Icon: "Login",
		isMyLocation: currentPath => currentPath === LoginFullPath,
	},
	{
		path: RegisterFullPath,
		Icon: "Register",
		isMyLocation: currentPath => currentPath === RegisterFullPath,
	},
	{
		path: ForgotPasswordFullPath,
		Icon: "forgot password",
		isMyLocation: currentPath => currentPath === ForgotPasswordFullPath,
	},
];

function Header() {
	const menu = useMenuMaker({ data: menuData });

	return <HeaderStyles>{menu}</HeaderStyles>;
}

const HeaderStyles = $.div(({ theme: { flex } }) => {
	return `
		width: 100%;
		background: #974163;

		padding: 10px 0;

		${flex(["justifyContent"])}
		justify-content: flex-start;
		flex-direction: column;
		`;
});

interface MainLayoutPropsT extends RouteChildrenProps {
	children: React.ReactNode;
}
export default function MainLayout(props: MainLayoutPropsT) {
	return (
		<Root>
			<Grid container justify="space-evenly">
				<Grid md={4} item container justify="center">
					<Header />
				</Grid>
				<Grid md={7} item container justify="center">
					<main>{props.children}</main>
				</Grid>
			</Grid>
		</Root>
	);
}

const Root = $.div(() => {
	return `
		animation: page-transition 0.5s;

		padding-top: 20px;
		@media (max-width: 960px) {
			padding-top: 0px;
		}
		


		main {
			width: 100%;
		}
		`;
});
