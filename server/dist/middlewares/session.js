"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sessions_1 = require("../configs/sessions");
const express_session_1 = __importDefault(require("express-session"));
function sessionMiddleware(app, { redis }) {
    app.use(express_session_1.default(sessions_1.QIDConfigs({ redis })));
}
exports.default = sessionMiddleware;
//# sourceMappingURL=session.js.map