import { $USE_CACHE } from "./cache";
import { jssToStr } from ".";

const resetInput = {
	"input, textarea": {
		border: "1px solid transparent",
		transition: "border 0.5s",
		outline: "none",
		"&::placeholder": {
			opacity: "1",
		},
		"&:focus": {
			outline: "none",
		},
	},
};

type FlexT = ["justifyContent", "alignItems"] | ["justifyContent"] | ["alignItems"] | [] | undefined;

const [flex] = $USE_CACHE((whatIDontWant: FlexT = [], returnString: boolean = true) => {
	const s = { display: "flex", justifyContent: "center", alignItems: "center" };
	for (const i of whatIDontWant) delete s[i];
	return returnString ? jssToStr(s) : s;
});

export { flex, resetInput };
