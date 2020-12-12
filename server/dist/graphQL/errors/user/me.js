"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notAllowed = void 0;
const constants_1 = require("../../../helpers/constants");
function notAllowed(id) {
    return {
        errors: {
            field: "ID",
            message: `${id} ID is not allowed`,
        },
        OK: constants_1.falseOK,
    };
}
exports.notAllowed = notAllowed;
//# sourceMappingURL=me.js.map