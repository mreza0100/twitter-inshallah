"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmail = void 0;
const regExp_1 = require("./regExp");
function isEmail(email) {
    return regExp_1.emailRegExp.test(email);
}
exports.isEmail = isEmail;
//# sourceMappingURL=index.js.map