import { Box, Card, CircularProgress, Container, Grid, TextField } from "@material-ui/core";
import { CreatePostFormT, initialValues, schema } from "../lib/forms/create-post";
import { POST_CHAR_LIMIT } from "../helpers/constants";
import { useCreatePostMutation } from "../graphQL";
import useRealHeight from "../hooks/realHeight";
import BtnWithLinear from "./BtnWithLinear";
import { Form, Formik } from "formik";
import React, { useRef } from "react";
import $ from "styled-components";

interface CreatePostPropsT {}
export default function CreatePost(props: CreatePostPropsT) {
	const [, createPost] = useCreatePostMutation();

	const onSubmit: FormikOnSubmitT<CreatePostFormT> = async (values, { setSubmitting, resetForm }) => {
		const res = await createPost(values).finally(() => setSubmitting(false));
		if (res.error) {
			alert("something went wrong");
			return;
		}
		resetForm({ errors: {}, values: { text: "" }, touched: {} });
	};

	const rootRef = useRef<HTMLDivElement>(null);

	return (
		<Root ref={rootRef} RootRef={rootRef}>
			<Container maxWidth="xl" id="form-content">
				<Card className="background">
					<Formik<CreatePostFormT>
						onSubmit={onSubmit}
						initialValues={initialValues}
						validationSchema={schema}
					>
						{({
							handleChange,
							handleBlur,
							isSubmitting,
							errors,
							touched,
							values,
						}) => {
							const textErr = touched.text && errors.text;
							const textLen = values.text.length;

							const isTooManyChar = textLen > POST_CHAR_LIMIT;

							const isOkay = Boolean(!isTooManyChar && textLen > 0);

							return (
								<Form>
									<Grid container>
										<Grid xs={12} item>
											<Box>
												<TextField
													variant="outlined"
													multiline
													label="text"
													type="text"
													name="text"
													value={values.text}
													error={isTooManyChar}
													helperText={
														isTooManyChar && textErr
													}
													onChange={handleChange}
													onBlur={handleBlur}
													size="small"
													fullWidth={true}
													required={true}
												/>
											</Box>
										</Grid>
										<Grid item xs={12}>
											<Box
												display="flex"
												justifyContent="flex-end"
												alignItems="center"
												marginTop="20px"
											>
												<Box marginRight="20px">
													<CircularProgress
														color={
															isTooManyChar
																? "secondary"
																: "primary"
														}
														size="20px"
														variant="static"
														value={textLen / 1.6}
													/>
												</Box>
												<Box>
													{textLen}/{POST_CHAR_LIMIT}
												</Box>
											</Box>
										</Grid>
										<Grid xs={12} item id="submit-btn">
											<BtnWithLinear
												isSubmitting={isSubmitting}
												btnProps={{
													color: "primary",
													disabled: !isOkay,
												}}
											>
												Submit
											</BtnWithLinear>
										</Grid>
									</Grid>
								</Form>
							);
						}}
					</Formik>
				</Card>
			</Container>
		</Root>
	);
}

type RootPropsT = { RootRef: React.RefObject<HTMLDivElement> };
const Root = $.div<RootPropsT>(({ RootRef }) => {
	const height = useRealHeight({ open: true, RootRef });

	return `
		min-height: ${height};
		animation: create-post-mount 0.8s;
		transition: all 0.5s;
		overflow: auto;
		background: #fafafa;
		box-shadow: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
		form {
			padding: 25px 0;
			align-items: flex-start;
			#submit-btn {
				padding-top: 25px;
				margin-top: auto;
			}
			#title {
				text-align: center;
			}
		}
		.background {
			background: transparent;
			box-shadow: unset;
		}
		.justify-center {
			justify-content: center;
		}
		.flex-start {
			align-items: flex-start;
		}
		#counter {



		}
		`;
});
