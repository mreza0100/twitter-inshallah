import {
	FieldError,
	LoginMutation,
	MeDocument,
	RegisterMutation,
	UserResponse,
	CreatePostMutation,
	InternalPostsDocument,
	PaginatedPosts,
	VoteMutation,
} from "../..";
import { cacheExchange } from "@urql/exchange-graphcache";
import { cursorPagination } from "./pagination";
import gql from "graphql-tag";

export default cacheExchange({
	keys: {
		PaginatedPosts: ((_: PaginatedPosts) => {
			return null;
		}) as any,
		UserResponse: ((data: UserResponse) => {
			return data.user?.id || null;
		}) as any,
		FieldError: ((_: FieldError) => {
			return null;
		}) as any,
		UserResponseMultiError: ((_: FieldError) => {
			return null;
		}) as any,
		UserResponseMultiUsers: ((_: FieldError) => {
			return null;
		}) as any,
	},
	resolvers: {
		Query: {
			posts: cursorPagination,
		},
	},
	updates: {
		Mutation: {
			logout: (result, args, cache, info) => {
				// destroying all the cached data
				cache.invalidate("Query");
			},
			login: (_result, args, cache) => {
				const result = _result as LoginMutation;
				const updater: any = (cachedData: any) => {
					if (result.login.errors) return cachedData;
					return { me: _result.login };
				};
				cache.updateQuery({ query: MeDocument }, updater);
			},
			register: (_result, args, cache) => {
				const result = _result as RegisterMutation;
				const updater: any = (cachedData: any) => {
					if (result.register.errors) return cachedData;
					return { me: _result.register };
				};
				cache.updateQuery({ query: MeDocument }, updater);
			},
			createPost: (_result, createPostArgs, cache, info) => {
				const result = _result as CreatePostMutation;
				const allQueries = cache.inspectFields("Query");

				const postsFields = allQueries.filter(fi => fi.fieldName === "posts");

				type CacheT = { posts: { posts: { __typename: "Post"; id: number }[] } };
				const updater: any = (cachedData: CacheT): CacheT => {
					cachedData.posts.posts.unshift({
						__typename: "Post",
						id: result.createPost?.id as number,
					});

					return cachedData;
				};

				const targetField = postsFields[0];
				// adding createdPost to the lastest query not all queres

				cache.updateQuery(
					{
						query: InternalPostsDocument,
						variables: targetField.arguments as any,
					},
					updater
				);
			},
			deletePost: (_result, deletePostArgs, cache, info) => {
				// const result = _result as DeletePostMutation;
				if (!_result.deletePost) {
					return alert("some thing went wrong");
				}
				const allQueries = cache.inspectFields("Query");
				const postsFields = allQueries.filter(fi => fi.fieldName === "posts");

				for (const postFiled of postsFields) {
					type CacheT = { posts: { posts: { __typename: "Post"; id: number }[] } };
					const updater: any = (cachedData: CacheT): CacheT => {
						cachedData.posts.posts = cachedData.posts.posts.filter(
							post => post.id !== deletePostArgs.id
						);
						return cachedData;
					};

					cache.updateQuery(
						{
							query: InternalPostsDocument,
							variables: postFiled.arguments as any,
						},
						updater
					);
				}
			},
			vote: (_result, args, cache, info) => {
				const result = _result as VoteMutation;
				const { points: newPoints, id: postId } = result.vote!;

				// const fragmentForRead = gql`
				// 	fragment _ on Post {
				// 		id
				// 		points
				// 	}
				// `;
				// const data = cache.readFragment(fragmentForRead, { id: postId }) as {
				// 	id: number;
				// 	points: number;
				// };

				const fragmentForWrite = gql`
					fragment __ on Post {
						points
					}
				`;

				cache.writeFragment(fragmentForWrite, { id: postId, points: newPoints });
			},
		},
	},
});
