import { Post as PostT, PostsQueryVariables, useLogoutMutation, useUserQuery, User } from "../../graphQL";
import { Box, Button, Grid, LinearProgress, Typography } from "@material-ui/core";
import { confirmAlert, ReactConfirmAlertProps } from "react-confirm-alert";
import { ExitToAppOutlined, Email, LocationOn } from "@material-ui/icons";
import { EditProfilePath, UserPath } from "../../routes/route.addresses";
import { postPaginationLimit } from "../../helpers/constants";
import { RouteComponentProps } from "react-router-dom";
import { usePosts, useMeCtx } from "../../hooks";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { defer } from "../../helpers";
import ShowPosts from "../ShowPosts";
import $ from "styled-components";
import LoadBtn from "../LoadBtn";

function initCostomUI(onLogout: () => void, me: User): ReactConfirmAlertProps["customUI"] {
	return ({ onClose }) => {
		return (
			<div>
				<h1>{`Exit from ${me.username}`}</h1>
				<p>Are you sure to leave this account you can come back again</p>
				<Box display="flex">
					<Box padding="0 20px">
						<Button onClick={onClose} variant="outlined" color="primary">
							<Box padding="5px">No</Box>
						</Button>
					</Box>
					<Box padding="0 20px">
						<Button
							onClick={() => {
								onClose();
								onLogout();
							}}
							variant="outlined"
							color="secondary"
						>
							<Box padding="5px">Yes</Box>
						</Button>
					</Box>
				</Box>
			</div>
		);
	};
}

interface UserPropsT extends RouteComponentProps<{ uniqueId: string }> {}
export default function SingleUser(props: UserPropsT) {
	const me = useMeCtx();

	const userUniqueId = props.match.params.uniqueId;
	const isMyProfile = userUniqueId === me.user?.uniqueId;

	const [, logout] = useLogoutMutation(),
		[variables, setVars] = useState<PostsQueryVariables>({
			limit: postPaginationLimit,
			cursor: null,
			uniqueProfileId: userUniqueId,
		}),
		{
			postsQuery: [{ fetching: postsFetching, data: postsData }],
			lastCreatedAt,
		} = usePosts({ variables, setVars }),
		[{ fetching: userFetching, data: userData }] = useUserQuery({
			variables: { uniqueId: userUniqueId },
		});

	const onLogout = () => {
			toast.error(`existing from ${me.user?.username}`, {
				onClose: () => defer(logout),
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		},
		askToLeave = () => {
			confirmAlert({
				customUI: initCostomUI(onLogout, me.user as User),
			});
		},
		goToEdit = () => {
			props.history.push(`${UserPath}/${userUniqueId}${EditProfilePath}`);
		};

	if (!postsData && postsFetching) return <LinearProgress />;
	if (!postsData || !postsData.posts || userFetching) return null;

	if (!userData?.user.OK || !userData?.user.user) {
		return (
			<Root>
				<h1 id="not-found-user">this user dos not exist</h1>
			</Root>
		);
	}

	const { posts = [], hasMore, left } = postsData.posts;
	const user = userData.user.user;

	return (
		<Root>
			<Grid container justify="flex-start" alignContent="flex-start" id="user-section">
				<Grid item xs={12} container>
					<Grid item xs={4}>
						<Typography variant="h5">{user.username}</Typography>
					</Grid>
					<Grid item xs={8}>
						{isMyProfile && (
							<Box display="flex" justifyContent="flex-end">
								<Box paddingRight="10px">
									<Button
										variant="outlined"
										color="primary"
										onClick={goToEdit}
									>
										<Box padding="2px 4px">Edit</Box>
									</Button>
								</Box>
								<Box>
									<Button
										variant="outlined"
										color="primary"
										onClick={askToLeave}
									>
										<Box
											display="flex"
											alignItems="center"
											padding="2px 4px"
										>
											<span>logout</span>
											<ExitToAppOutlined color="error" />
										</Box>
									</Button>
								</Box>
							</Box>
						)}
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<Box padding="5px 0">
						<Typography variant="subtitle1">@{user.uniqueId}</Typography>
					</Box>
				</Grid>
				<Grid item xs={12}>
					<Box padding="5px 0">
						<Typography variant="body2">{user.bio}</Typography>
					</Box>
				</Grid>
				<Grid item xs={12}>
					<Grid container justify="flex-start" alignContent="center">
						{user.location && (
							<Grid item xs="auto">
								<Box className="inner-box" padding="0 10px 0 0">
									<LocationOn className="icon" />
									<p>{user.location}</p>
								</Box>
							</Grid>
						)}
						{user.email && (
							<Grid item xs="auto">
								<Box className="inner-box">
									<Email className="icon" />
									<p>{user.email}</p>
								</Box>
							</Grid>
						)}
					</Grid>
				</Grid>
			</Grid>

			<ShowPosts me={me} posts={posts as PostT[]} />
			<LoadBtn hasMore={hasMore} left={left} setVars={setVars} lastCreatedAt={lastCreatedAt} />
		</Root>
	);
}

const Root = $.div(({ theme: { flex } }) => {
	return `
		#user-section {
			min-height: 200px;
			padding-top: 10px;
			color: black;
			.inner-box {
				${flex(["justifyContent"])}
				justify-content: flex-start;
			}
			.icon {
				font-size: 25px;
				padding-right: 10px;
			}
			* {
				white-space: pre-line;
			}
		}
		#not-found-user {
			text-align: center;
		}
		
		`;
});
