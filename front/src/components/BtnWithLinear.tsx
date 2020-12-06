import { Button, LinearProgress } from "@material-ui/core";
import React from "react";

interface BtnWithLinearPropsT {
	children: React.ReactNode;
	isSubmitting: boolean;
	btnProps?: Parameters<typeof Button>[0];
}
export default function BtnWithLinear({ isSubmitting, children, btnProps }: BtnWithLinearPropsT) {
	return (
		<>
			<Button fullWidth type="submit" {...btnProps}>
				{children}
			</Button>
			{isSubmitting && <LinearProgress />}
		</>
	);
}
