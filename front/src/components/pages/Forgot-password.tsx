import { initilavalues, ForgotPasswordFormT, schema } from "../../lib/forms/forgot-password";
import { useForgotPasswordMutation } from "../../graphQL";
import { RouteChildrenProps } from "react-router-dom";
import { TextFieldProps } from "@material-ui/core";
import { toast } from "react-toastify";
import $ from "styled-components";
import Inputs from "../Inputs";
import React from "react";

const formFields: TextFieldProps[] = [
	{
		label: "email",
		type: "email",
		name: "email",
	},
];

interface ForgotPasswordPropsT extends RouteChildrenProps {}
export default function ForgotPassword(props: ForgotPasswordPropsT) {
	const [, forgotPassword] = useForgotPasswordMutation();

	const onSubmit: FormikOnSubmitT<ForgotPasswordFormT> = async values => {
		const res = await forgotPassword(values);
		if (res.data?.forgotPassword) {
			toast.success("check your email", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		}
	};

	return (
		<Root>
			<Inputs
				formFields={formFields}
				initilavalues={initilavalues}
				onSubmit={onSubmit}
				schema={schema}
				title="Forgot password Form"
			/>
		</Root>
	);
}

const Root = $.main(() => {
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
