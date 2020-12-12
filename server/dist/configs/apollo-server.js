"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const post_1 = __importDefault(require("../graphQL/resolvers/post"));
const user_1 = __importDefault(require("../graphQL/resolvers/user"));
const type_graphql_1 = require("type-graphql");
function burningApllo({ app, redis }) {
    const apolloServerConfigs = {
        playground: true,
        schema: type_graphql_1.buildSchemaSync({
            resolvers: [post_1.default, user_1.default],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
            userId: req.session.userId,
            session: req.session,
            redis,
        }),
    };
    const applyMiddlewareConfigs = { app, cors: { origin: false } };
    new apollo_server_express_1.ApolloServer(apolloServerConfigs).applyMiddleware(applyMiddlewareConfigs);
}
exports.default = burningApllo;
//# sourceMappingURL=apollo-server.js.map