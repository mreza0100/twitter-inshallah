import { dedupExchange, fetchExchange } from "urql";
import cashe from "./cache";

const exchangeConfigs = [cashe, dedupExchange, fetchExchange];
export default exchangeConfigs;
