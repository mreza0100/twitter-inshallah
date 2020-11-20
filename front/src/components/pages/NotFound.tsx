import $ from "styled-components";
import React from "react";

export default function NotFound(props: any) {
	return (
		<Root>
			<h1>404</h1>
			<h6>this route is not defined</h6>
		</Root>
	);
}

const Root = $.div(props => {
	return `
		width: 80%;
		margin: auto;
		text-align: center;
		font-size: 40px;
		h1 {
			color: red;
			margin: 0;
		}

		`;
});
