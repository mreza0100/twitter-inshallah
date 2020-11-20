import { initilavalues, RegisterFormT, schema } from "../../lib/forms/resetPassword";
import { LoginFullPath } from "../../routes/route.addresses";
import { useChangePasswordMutation } from "../../graphQL";
import { RouteChildrenProps } from "react-router-dom";
import { ErrMaping } from "../../helpers/private";
import { TextFieldProps } from "@material-ui/core";
import $ from "styled-components";
import Inputs from "../Inputs";
import React from "react";

const formFields: TextFieldProps[] = [
	{
		label: "newPassword",
		type: "password",
		name: "newPassword",
	},
	{
		name: "confirmNewPassword",
		label: "Confirm new password",
		type: "password",
	},
];

interface ChangePasswordPropsT extends RouteChildrenProps<{ token: string }> {}
export default function ChangePassword(props: ChangePasswordPropsT) {
	const [, changePassword] = useChangePasswordMutation();

	const onSubmit: FormikOnSubmitT<RegisterFormT> = async (values, { setSubmitting, setErrors }) => {
		const vars = { newPassword: values.newPassword, token: props!.match!.params.token };
		const res = await changePassword(vars).finally(() => setSubmitting(false));

		if (res.data?.changePassword.OK) props.history.replace(LoginFullPath);
		else {
			if (res.data?.changePassword.errors?.field === "token") {
				alert("there was a problem with your token");
				props.history.replace(LoginFullPath);
			} else {
				const errors = ErrMaping(res.data?.changePassword.errors);
				if (errors) setErrors(errors);
			}
		}
	};

	return (
		<Root>
			<Inputs
				title="Change Password Form"
				schema={schema}
				onSubmit={onSubmit}
				initilavalues={initilavalues}
				formFields={formFields}
			/>
		</Root>
	);
}

const Root = $.main(props => {
	return `
		#wrapper {
			padding: 20px 0;
			margin: auto;

			background-color: transparent;
			> div {
			}

			form {
				width: 100%;
				#content {
					padding: 20px;
					.field {
						height: 60px;
					}
				}
				#submit {
					width: 100%;
					text-align: center;
				}
			}
		}



            `;
});
