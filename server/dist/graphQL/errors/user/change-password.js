"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notAValidToken = exports.passwordLength = void 0;
const constants_1 = require("../../../helpers/constants");
var register_1 = require("./register");
Object.defineProperty(exports, "passwordLength", { enumerable: true, get: function () { return register_1.passwordLength; } });
function notAValidToken() {
    return {
        errors: {
            field: "token",
            message: "token is not valid",
        },
        OK: constants_1.falseOK,
    };
}
exports.notAValidToken = notAValidToken;
//# sourceMappingURL=change-password.js.map