"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../helpers/constants");
function delayMiddlaware(app) {
    if (!constants_1.__IS_DEV__)
        return;
    if (constants_1.delayTime) {
        app.use((req, res, next) => {
            setTimeout(() => {
                next();
            }, constants_1.delayTime);
        });
    }
}
exports.default = delayMiddlaware;
//# sourceMappingURL=delay.js.map