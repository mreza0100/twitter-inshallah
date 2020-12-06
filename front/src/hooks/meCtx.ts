import { useContext } from "react";
import MeCTX from "../contexts/me";

export default function useMeCtx() {
	const me = useContext(MeCTX);

	if (!me) throw new Error("ctx was not provided");

	return me;
}
