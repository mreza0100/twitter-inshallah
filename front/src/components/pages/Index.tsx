import { Post as PostT, PostsQueryVariables } from "../../graphQL";
import { postPaginationLimit } from "../../helpers/constants";
import { RouteChildrenProps } from "react-router-dom";
import { LinearProgress } from "@material-ui/core";
import useMeCtx from "../../hooks/meCtx";
import React, { useState } from "react";
import { usePosts } from "../../hooks";
import CreatePost from "../CreatePost";
import ShowPosts from "../ShowPosts";
import $ from "styled-components";
import LoadBtn from "../LoadBtn";

interface IndexPropsT extends RouteChildrenProps {}
export default function Index(props: IndexPropsT) {
	const [variables, setVars] = useState<PostsQueryVariables>({
		limit: postPaginationLimit,
		cursor: null as string | null,
	});
	const {
		postsQuery: [{ fetching, data }],
		lastCreatedAt,
	} = usePosts({ variables, setVars });
	const me = useMeCtx();

	if (!data && fetching) return <LinearProgress />;
	if (!data || !data.posts) return null;

	const { posts = [], hasMore, left } = data.posts;
	return (
		<Root>
			<CreatePost />
			<ShowPosts me={me} posts={posts as PostT[]} />
			<LoadBtn hasMore={hasMore} left={left} setVars={setVars} lastCreatedAt={lastCreatedAt} />
		</Root>
	);
}

const Root = $.main(() => {
	return `
		margin-top: 20px;
		width: 100%;
            `;
});
