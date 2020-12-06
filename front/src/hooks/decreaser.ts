import { useEffect } from "react";

const timeOutVals: { [key: string]: any } = {};

export default function useDecreaser<FuncT = () => any>(func: FuncT, time: number = 1000, id: string) {
	useEffect(
		() => () => {
			delete timeOutVals[id];
		},
		[id]
	);

	return () => {
		clearTimeout(timeOutVals[id]);
		timeOutVals[id] = setTimeout(func, time);
	};
}
