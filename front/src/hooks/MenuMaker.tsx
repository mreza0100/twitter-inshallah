import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { pushUp } from "../helpers";
import $ from "styled-components";
import React from "react";

export type MenuDataT = Array<{
	Icon?: React.ReactNode;
	onClick?: (path: string) => () => any;
	isMyLocation: (currentPath: string) => boolean;
	path: string;
	JSX?: React.ReactNode;
}>;

interface MenuMakerPropsT {
	data: MenuDataT;
}
export default function useMenuMaker({ data }: MenuMakerPropsT) {
	const history = useHistory();

	const currentPath = history.location.pathname;

	const onClick = (path: string) => {
		return () => {
			if (currentPath === path) return pushUp();
			history.push(path);
		};
	};

	return data.map((row, idx) => {
		if (row.JSX) return row.JSX;

		const handler = row?.onClick ? row.onClick(row.path) : onClick(row.path);
		const isMyLocation = row.isMyLocation(currentPath);

		return (
			<Section key={idx} isSelectedMe={isMyLocation}>
				<Button fullWidth onClick={handler}>
					{row.Icon}
				</Button>
			</Section>
		);
	});
}

interface SectionPtopsT {
	isSelectedMe?: boolean;
}
const Section = $.div<SectionPtopsT>(({ isSelectedMe: me }) => {
	return `
		width: 100%;
		height: 30px;
		margin-top: 20px;
		
		button {
			color: ${me ? "#1565c0" : "#FFF"} !important;
		}
		`;
});
