"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redirects_1 = __importDefault(require("./redirects"));
const session_1 = __importDefault(require("./session"));
const logger_1 = __importDefault(require("./logger"));
const delay_1 = __importDefault(require("./delay"));
const test_1 = __importDefault(require("./test"));
const cors_1 = __importDefault(require("./cors"));
function middlewaresInitializing(app, { redis }) {
    logger_1.default(app);
    delay_1.default(app);
    test_1.default(app);
    cors_1.default(app);
    session_1.default(app, { redis });
    redirects_1.default(app);
}
exports.default = middlewaresInitializing;
//# sourceMappingURL=index.js.map