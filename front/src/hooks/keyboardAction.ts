import { useEffect } from "react";
import { toArray } from "../helpers";

export default function useKeyDown<K extends keyof WindowEventMap>(
	type: K,
	key: string | Array<string>,
	action: (e: WindowEventMap[K]) => any
) {
	const keys = toArray(key);

	const func = (e: KeyboardEvent): any => {
		const promisionToCallAction = keys.every(k => {
			if (k === e.key) return true;
			return false;
		});

		if (promisionToCallAction) action(e as WindowEventMap[K]);
	};

	useEffect(() => {
		window.addEventListener(type, func as EventListener);
		return () => window.removeEventListener(type, func as EventListener);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
}
