import React from "react";

interface PostsCTXT {}

const PostsCTX = React.createContext<PostsCTXT | undefined>(undefined);

function PostCTXProvider({ children }: { children: React.ReactNode }) {
	const { Provider } = PostsCTX;

	return <Provider value={{}}>{children}</Provider>;
}

export { PostCTXProvider };
export default PostsCTX;
