"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QIDConfigs = void 0;
const constants_1 = require("../helpers/constants");
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
function QIDConfigs({ redis }) {
    return {
        name: constants_1.COOKIE_NAME,
        store: new (connect_redis_1.default(express_session_1.default))({ client: redis, disableTouch: true }),
        cookie: {
            maxAge: constants_1.__IS_DEV__ ? 1000 * 60 * 60 * 24 * 365 : 1000 * 60 * 60 * 24 * 3,
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            path: "/",
        },
        saveUninitialized: false,
        secret: constants_1.SECRET_KEY,
        resave: false,
    };
}
exports.QIDConfigs = QIDConfigs;
//# sourceMappingURL=sessions.js.map