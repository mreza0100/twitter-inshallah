"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notValidPasswordOrUsername = void 0;
const constants_1 = require("../../../helpers/constants");
function notValidPasswordOrUsername() {
    return {
        errors: [
            { field: "username", message: "username or password is wrong" },
            { field: "password", message: "password or username is wrong" },
        ],
        OK: constants_1.falseOK,
    };
}
exports.notValidPasswordOrUsername = notValidPasswordOrUsername;
//# sourceMappingURL=login.js.map