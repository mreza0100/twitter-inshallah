import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { Button, Grid } from "@material-ui/core";
import $ from "styled-components";
import React from "react";

interface VotePropsT {
	voteHandler: VoteHandlerT;
	postId: number;
	points: number;
}
export default function Vote({ voteHandler, points, postId }: VotePropsT) {
	return (
		<Grid container direction="column" justify="center" alignItems="center">
			<Button onClick={() => voteHandler(1, postId)}>
				<ArrowUpward />
			</Button>
			<Button onClick={() => voteHandler(0, postId)}>
				<Points points={points}>{points}</Points>
			</Button>
			<Button onClick={() => voteHandler(-1, postId)}>
				<ArrowDownward />
			</Button>
		</Grid>
	);
}
interface PointsPropsT {
	points: number;
}
const Points = $.div<PointsPropsT>(({ points }) => {
	const color = points === 0 ? "unset" : points > 0 ? "#03ff00" : "#ff0000";

	return `
		color: ${color};
		`;
});
