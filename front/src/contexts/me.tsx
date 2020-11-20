import { MeQuery, useMeQuery } from "../graphQL";
import React from "react";

type MeCTXT = MeQuery["me"];

const MeCTX = React.createContext<MeCTXT | undefined>(undefined);

function MeCTXProvider({ children }: { children: React.ReactNode }) {
	const [{ fetching, data }] = useMeQuery();
	const { Provider } = MeCTX;

	if (fetching) return null;

	return <Provider value={data?.me || { OK: false }}>{children}</Provider>;
}

export { MeCTXProvider };
export default MeCTX;
