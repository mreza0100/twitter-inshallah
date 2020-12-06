import { PostsQueryVariables, usePostsQuery } from "../graphQL";
import { getLastArrayElem } from "../helpers";
import { useEffect, useState } from "react";

interface UserPostsPropsT {
	variables: PostsQueryVariables;
	setVars: React.Dispatch<React.SetStateAction<PostsQueryVariables>>;
}
export default function usePosts({ variables, setVars }: UserPostsPropsT) {
	const [lastCreatedAt, setLastCreatedAt] = useState<string | null>(null);
	const postsQuery = usePostsQuery({ variables });

	const [{ fetching, data }] = postsQuery;

	useEffect(() => {
		if (!fetching && data && data.posts?.left) {
			if (data.posts.posts.length !== 0) {
				setLastCreatedAt(getLastArrayElem(data.posts.posts).createdAt);
			}
			if (data.posts.posts.length === 0) {
				setVars(prevVars => ({
					...prevVars,
					cursor: lastCreatedAt,
				}));
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	return { postsQuery, lastCreatedAt };
}
