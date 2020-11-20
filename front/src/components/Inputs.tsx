import {
	Card,
	CardContent,
	TextField,
	TextFieldProps,
	CardHeader,
	Button,
	LinearProgress,
	Box,
} from "@material-ui/core";
import { Formik, Form, FormikConfig } from "formik";
import { ObjectSchema, Shape } from "yup";
import { objectLength } from "../helpers";
import React from "react";

interface InputsPropsT<FormT> {
	onSubmit: FormikOnSubmitT<FormT>;
	initilavalues: FormikConfig<FormT>["initialValues"];
	schema: ObjectSchema<Shape<object | undefined, {}>, object>;
	title: string;
	formFields: TextFieldProps[];
}
export default function Inputs<FormT = { [key: string]: any }>({
	onSubmit,
	initilavalues,
	schema,
	formFields,
	title,
}: InputsPropsT<FormT>) {
	return (
		<Formik<FormT> onSubmit={onSubmit} initialValues={initilavalues} validationSchema={schema}>
			{({
				/*props*/
				handleChange,
				handleBlur,
				handleSubmit,
				isSubmitting,
				touched,
				values,
				errors: _errors,
			}) => {
				const forFields = {
					onChange: handleChange,
					onBlur: handleBlur,
					size: "small",
					variant: "outlined",
					fullWidth: true,
					required: true,
					margin: "normal",
					className: "field",
				} as TextFieldProps;

				const errors: { [key: string]: any } = {};

				for (const key in _errors) {
					errors[key] = touched[key] ? _errors[key] : undefined;
				}

				const disabled = !!objectLength(errors) || isSubmitting;
				return (
					<Form>
						<Card id="content">
							<CardHeader title={title} />
							<CardContent>
								{formFields.map(({ name: _name, ...fieldProps }) => {
									const name = _name as string;
									const value = (values as any)[name] as string;

									return (
										<TextField
											{...forFields}
											{...fieldProps}
											name={name}
											value={value}
											error={!!errors[name]}
											helperText={errors[name]}
											key={name}
										/>
									);
								})}
							</CardContent>
							<Box margin="20px 0">
								<Button
									fullWidth
									onClick={() => handleSubmit()}
									disabled={disabled}
									type="submit"
									id="submit"
								>
									Submit
								</Button>
								{isSubmitting && <LinearProgress />}
							</Box>
						</Card>
					</Form>
				);
			}}
		</Formik>
	);
}
