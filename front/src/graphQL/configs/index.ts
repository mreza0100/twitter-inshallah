import { BACK_END_URL as url } from "../../helpers/constants";
import { createClient } from "urql";
import exchanges from "./exchanges";

const fetchOptions: RequestInit = {
	credentials: "include",
};

export default createClient({
	url,
	exchanges,
	fetchOptions,
});
