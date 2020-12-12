"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../helpers/constants");
const path_1 = require("path");
exports.default = {
    type: "postgres",
    username: "postgres",
    database: "postgres",
    password: "1",
    entities: [path_1.join(__dirname, "../../entities/*")],
    logging: constants_1.__IS_DEV__,
    logger: "advanced-console",
    synchronize: !constants_1.DELETE_DB && true,
};
//# sourceMappingURL=index.js.map