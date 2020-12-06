import { MeQuery, Post as PostT, useVoteMutation } from "../graphQL";
import { Box, Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Post, { PostPropsT } from "./Post";
import React, { useMemo, useRef } from "react";
import $ from "styled-components";
import { useRealHeight } from "../hooks";

interface ShowPostsPropsT {
	me: MeQuery["me"];
	posts: PostT[];
}
export default function ShowPosts({ posts, me }: ShowPostsPropsT) {
	const history = useHistory();
	const [, vote] = useVoteMutation();
	const wrapperRef = useRef<HTMLDivElement>(null);

	const voteHandler: PostPropsT["voteHandler"] = async (value, postId) => {
		await vote({ postId, value });
	};

	return useMemo(
		() => (
			<Root wrapperRef={wrapperRef}>
				<Grid ref={wrapperRef} container className="m-t-b">
					<Grid container>
						{posts.map(post => {
							return (
								<Grid key={post.id} item xs={12}>
									<Post
										isMyPost={me.user?.id === post.user?.id}
										voteHandler={voteHandler}
										data={post as PostT}
										history={history}
									/>
								</Grid>
							);
						})}
						{!posts.length && (
							<Box justifyContent="center" display="flex" width="100%">
								<Typography>there is no post yet</Typography>
							</Box>
						)}
					</Grid>
				</Grid>
			</Root>
		),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[posts, me]
	);
}

type RootPropsT = { wrapperRef: React.RefObject<HTMLDivElement> };
const Root = $.div<RootPropsT>(({ wrapperRef }) => {
	const height = useRealHeight({ open: true, RootRef: wrapperRef });

	return `
		transition: all 0.7s;
		height: ${height};
		scroll-behavior: none;
		`;
});
