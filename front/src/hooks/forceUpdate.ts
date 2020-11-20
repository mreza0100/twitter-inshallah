import { useState } from "react";

export default function useForceUpdate() {
	const [, setState] = useState(0);

	return () => setState(prev => prev + 1);
}
