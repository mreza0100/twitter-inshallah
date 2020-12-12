"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../helpers/constants");
const morgan_1 = __importDefault(require("morgan"));
async function redirects(app) {
    if (!constants_1.__IS_DEV__)
        return;
    app.use(morgan_1.default("dev", {
        stream: { write: console.log },
        immediate: false,
        skip: (req, res) => {
            if (req.body && req.body.operationName === "IntrospectionQuery")
                return true;
            return false;
        },
    }));
}
exports.default = redirects;
//# sourceMappingURL=logger.js.map