"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
function corsMiddleware(app) {
    app.use(cors_1.default({
        origin: ["*"],
        credentials: true,
    }));
}
exports.default = corsMiddleware;
//# sourceMappingURL=cors.js.map