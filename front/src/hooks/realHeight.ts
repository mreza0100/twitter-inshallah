import React, { useLayoutEffect, useState } from "react";

interface RealHeightPropsT {
	open: boolean;
	RootRef: React.RefObject<HTMLElement> | null;
}
export default function useRealHeight({ open, RootRef }: RealHeightPropsT) {
	const [height, setHeight] = useState("0px");

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useLayoutEffect(() => {
		setTimeout(() => {
			if (RootRef && RootRef.current) {
				setHeight(RootRef.current.scrollHeight + "px");
			}
		}, 200);
	});

	return open ? height : "0px";
}
