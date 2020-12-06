import { TextFieldProps } from "@material-ui/core";
import { IndexPath } from "../../routes/route.addresses";
import { RouteComponentProps } from "react-router-dom";
import $ from "styled-components";
import React from "react";

import { initilavalues, RegisterFormT, schema } from "../../lib/forms/register";
import { useRegisterMutation } from "../../graphQL";
import { ErrMaping } from "../../helpers/private";
import Inputs from "../Inputs";

const formFields: TextFieldProps[] = [
	{
		label: "User Name",
		name: "username",
	},
	{
		label: "Password",
		type: "password",
		name: "password",
	},
	{
		label: "Confirm Password",
		type: "password",
		name: "confirmPassword",
	},
	{
		label: "email",
		type: "email",
		name: "email",
	},
	{
		label: "uniqueId",
		name: "uniqueId",
	},
];

interface RegisterPropsT extends RouteComponentProps {}
export default function Register(props: RegisterPropsT) {
	const [, register] = useRegisterMutation();

	const onSubmit: FormikOnSubmitT<RegisterFormT> = async (values, { setSubmitting, setErrors }) => {
		const res = await register(values).finally(() => setSubmitting(false));
		const errors = ErrMaping(res.data?.register.errors);

		if (!res.data?.register.OK && errors) setErrors(errors);
		else props.history.push(IndexPath);
	};

	return (
		<Root>
			<Inputs
				title="Register Form"
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
