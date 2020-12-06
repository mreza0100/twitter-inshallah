import { Box, Button, Card, Grid, Typography } from "@material-ui/core";
import { PostDataFFragment, useDeletePostMutation } from "../graphQL";
import { RouteChildrenProps } from "react-router-dom";
import { UserPath } from "../routes/route.addresses";
import { Delete, MoreVert } from "@material-ui/icons";
import DropDownMenu from "./DropDownMenu";
import $ from "styled-components";
import React from "react";
import Vote from "./Vote";

export interface PostPropsT {
	data: PostDataFFragment;
	voteHandler: VoteHandlerT;
	isMyPost: boolean;
	history: RouteChildrenProps["history"];
}
export default function Post({ data, isMyPost, voteHandler, history }: PostPropsT) {
	const {
		text,
		points,
		user: { uniqueId, username },
		id: postId,
	} = data;
	const [, deletePost] = useDeletePostMutation();

	const onDeletePost = async () => {
		await deletePost({ id: postId });
	};

	return (
		<Root isMyPost={isMyPost}>
			<Card className="card">
				<Grid container justify="space-between">
					<Grid item xs={9}>
						<Box
							marginBottom="10px"
							display="flex"
							justifyContent="space-between"
							alignItems="center"
						>
							<Button
								className="author-btn"
								onClick={() => history.push(`${UserPath}/${uniqueId}`)}
							>
								from: {isMyPost ? "You" : username}
							</Button>
						</Box>
						<Box paddingLeft="12px">
							<Grid item xs={12}>
								<Box>
									<Typography variant="body1" noWrap className="text">
										{text}
									</Typography>
								</Box>
							</Grid>
						</Box>
					</Grid>
					<Grid item xs={3} container justify="center" alignContent="flex-start">
						{isMyPost && (
							<Box className="options">
								<DropDownMenu title={<MoreVert />}>
									<li>
										<Box padding="5px 10px">
											<Button
												color="secondary"
												startIcon={
													<Delete color="secondary" />
												}
												onClick={onDeletePost}
											>
												Delete
											</Button>
										</Box>
									</li>
								</DropDownMenu>
							</Box>
						)}
						<Vote voteHandler={voteHandler} points={points} postId={postId} />
					</Grid>
				</Grid>
			</Card>
		</Root>
	);
}

interface RootPropsT {
	isMyPost: boolean;
}
const Root = $.div<RootPropsT>(({ isMyPost }) => {
	return `
		animation: post-mount 0.5s;
		background-color: #1565c0;
		margin: 15px 0;
		color: #FFF !important;
		button {
			color: #FFF
		}
		> .card {
			overflow: unset;
			padding: 15px;
			color: #FFF !important;
			background-color: transparent;
			.author-btn span {
				display: flex;
				justify-content: left;
				a {
					text-decoration: none;
				}
			}
			.text {
				line-height: 1.3;
				white-space: pre-line;
				word-break: break-word;
			}
		}
		`;
});
