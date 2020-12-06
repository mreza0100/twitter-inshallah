import { initilavalues, LoginFormT, schema } from "../../lib/forms/login";
import { IndexPath } from "../../routes/route.addresses";
import { RouteComponentProps } from "react-router-dom";
import { TextFieldProps } from "@material-ui/core";
import { ErrMaping } from "../../helpers/private";
import { useLoginMutation } from "../../graphQL";
import $ from "styled-components";
import Inputs from "../Inputs";
import React from "react";

const formFields: TextFieldProps[] = [
	{
		name: "uniqueIdOrEmail",
		label: "ID or email",
	},
	{
		name: "password",
		label: "Password",
		type: "password",
	},
];

interface RegisterPropsT extends RouteComponentProps {}
export default function Login(props: RegisterPropsT) {
	const [, register] = useLoginMutation();

	const onSubmit: FormikOnSubmitT<LoginFormT> = async (values, { setSubmitting, setErrors }) => {
		const { uniqueIdOrEmail, password } = values;
		const res = await register({ uniqueIdOrEmail, password }).finally(() => setSubmitting(false));
		const errors = ErrMaping(res.data?.login.errors);

		if (errors) setErrors(errors);
		else props.history.push(IndexPath);
	};

	return (
		<Root>
			<Inputs
				title="Login Form"
				schema={schema}
				onSubmit={onSubmit}
				initilavalues={initilavalues}
				formFields={formFields}
			/>
		</Root>
	);
}

const Root = $.div(props => {
	return `
		#wrapper {			
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
