import {
	Box,
	Button,
	Grid,
	InputAdornment,
	LinearProgress,
	TextField,
	TextFieldProps,
} from "@material-ui/core";
import { schema, EditProfileFormT } from "../../lib/forms/editProfile";
import { UserPath } from "../../routes/route.addresses";
import { useEditProfileMutation } from "../../graphQL";
import { RouteChildrenProps } from "react-router-dom";
import { ErrMaping } from "../../helpers/private";
import useMeCtx from "../../hooks/meCtx";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import React from "react";
import { defer } from "../../helpers";

type InputsData = ({ name: keyof EditProfileFormT } & TextFieldProps)[];
const inputsData: InputsData = [
	{
		name: "username",
	},
	{ name: "bio", multiline: true, variant: "outlined" },
	{
		name: "uniqueId",
		required: true,
		InputProps: {
			startAdornment: <InputAdornment position="start">@</InputAdornment>,
		},
	},
	{ name: "email", required: true },
	{ name: "location" },
];

interface EditProfilePropsT extends RouteChildrenProps {}
export default function EditProfile(props: EditProfilePropsT) {
	const me = useMeCtx();

	const [, editProfile] = useEditProfileMutation();

	if (!me.user) return null;
	const initialValues: EditProfileFormT = {
		username: me.user.username,
		email: me.user.email,
		uniqueId: me.user.uniqueId,
		bio: me.user?.bio || "",
		location: me.user?.location || "",
	};
	const onSubmit: FormikOnSubmitT<EditProfileFormT> = async (values, { setSubmitting, setErrors }) => {
		const res = await editProfile(values).finally(() => setSubmitting(false));
		if (res.data?.editProfile.OK) {
			return defer(() => props.history.push(`${UserPath}/${values.uniqueId}`));
		}
		toast.error("there was a error check you inputs", {
			position: "top-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
		});
		const errors = ErrMaping(res.data?.editProfile.errors);
		if (!res.data?.editProfile.OK && errors) setErrors(errors);
	};
	return (
		<Formik<EditProfileFormT>
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={schema}
		>
			{({ values, errors, isSubmitting, handleChange, handleBlur }) => {
				const forFields = {
					onChange: handleChange,
					onBlur: handleBlur,
					size: "small",
					fullWidth: true,
				} as TextFieldProps;
				return (
					<Form>
						{isSubmitting && <LinearProgress />}
						<Box padding="0 20px">
							<Grid container>
								<Grid item container xs={12} justify="flex-end">
									<Box paddingTop="20px">
										<Button
											variant="outlined"
											color="primary"
											type="submit"
											disabled={isSubmitting}
										>
											Submit
										</Button>
									</Box>
								</Grid>
								{inputsData.map(({ name, ...otherProps }) => {
									return (
										<Grid key={name} item xs={12}>
											<Box padding="20px 0">
												<TextField
													{...forFields}
													{...otherProps}
													name={name}
													label={name}
													value={values[name]}
													error={!!errors[name]}
													helperText={errors[name]}
												/>
											</Box>
										</Grid>
									);
								})}
							</Grid>
						</Box>
					</Form>
				);
			}}
		</Formik>
	);
}
