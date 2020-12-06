import { PostsQueryVariables } from "../graphQL";
import { Box, Button } from "@material-ui/core";
import React from "react";

interface LoadBtnPropsT {
	hasMore: boolean;
	left: number;
	lastCreatedAt: string | null;
	setVars: React.Dispatch<React.SetStateAction<PostsQueryVariables>>;
}
export default function LoadBtn({ hasMore, left, setVars, lastCreatedAt }: LoadBtnPropsT) {
	if (!hasMore) return null;

	return (
		<Box
			margin="35px auto 75px"
			width="100%"
			display="flex"
			alignItems="center"
			justifyContent="space-between"
		>
			<Button
				fullWidth
				variant="outlined"
				color="primary"
				onClick={() => setVars((prevVars: {}) => ({ ...prevVars, cursor: lastCreatedAt }))}
			>
				load more {left} left
			</Button>
		</Box>
	);
}
