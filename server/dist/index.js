"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./helpers/test");
require("reflect-metadata");
const constants_1 = require("./helpers/constants");
const middlewares_1 = __importDefault(require("./middlewares"));
const apollo_server_1 = __importDefault(require("./configs/apollo-server"));
const typeorm_1 = require("typeorm");
const db_1 = __importDefault(require("./configs/db"));
const Updoot_1 = __importDefault(require("./entities/Updoot"));
const User_1 = __importDefault(require("./entities/User"));
const Post_1 = __importDefault(require("./entities/Post"));
const express_1 = __importDefault(require("express"));
const ioredis_1 = __importDefault(require("ioredis"));
(async () => {
    await PSQLConnection();
    const redis = redisConnection();
    const app = express_1.default();
    middlewares_1.default(app, { redis });
    apollo_server_1.default({ app, redis });
    app.listen(constants_1.PORT, () => {
        console.log("\x1b[36m%s\x1b[0m", `🚀<|*__*|>🚀 --> SERVER is up and running on port: ${constants_1.PORT}
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n`);
    });
})().catch(err => console.error(err));
async function PSQLConnection() {
    const connection = await typeorm_1.createConnection(db_1.default);
    if (constants_1.DELETE_DB) {
        connection.getRepository(Updoot_1.default).delete({});
        connection.getRepository(Post_1.default).delete({});
        connection.getRepository(User_1.default).delete({});
    }
}
function redisConnection() {
    return new ioredis_1.default();
}
//# sourceMappingURL=index.js.map