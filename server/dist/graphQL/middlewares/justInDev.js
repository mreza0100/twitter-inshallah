"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../helpers/constants");
exports.default = (async function justInDev(_, next) {
    if (!constants_1.__IS_DEV__)
        throw new Error("not found route");
    return next();
});
//# sourceMappingURL=justInDev.js.map