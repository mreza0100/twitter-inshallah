import { DELETE_DB, __IS_DEV__ } from "../../helpers/constants";
import { ConnectionOptions } from "typeorm";
import { join } from "path";

export default {
	type: "postgres",
	database: "lireddit",
	username: "postgres",
	password: "1",
	entities: [join(__dirname, "../../entities/*")],
	logging: __IS_DEV__,
	logger: "advanced-console",
	synchronize: !DELETE_DB && true,
	// if DELETE_DB was false you can synchronize and migrate database
	// some thime I just want to reset all the data and its stuck on synchronize
} as ConnectionOptions;
