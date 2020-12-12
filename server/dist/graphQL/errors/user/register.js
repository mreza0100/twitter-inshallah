"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniqueIdLength = exports.existUniqueId = exports.notAEmail = exports.existEmail = exports.passwordLength = exports.usernamelength = void 0;
const constants_1 = require("../../../helpers/constants");
function usernamelength(username) {
    return {
        errors: {
            field: "username",
            message: `${username} username is less then 3 char`,
        },
        OK: constants_1.falseOK,
    };
}
exports.usernamelength = usernamelength;
function passwordLength(password) {
    return {
        errors: {
            field: "password",
            message: `${password} is less then 8 char`,
        },
        OK: constants_1.falseOK,
    };
}
exports.passwordLength = passwordLength;
function existEmail(email) {
    return {
        errors: {
            field: "email",
            message: `${email} email alridy exist in db`,
        },
        OK: constants_1.falseOK,
    };
}
exports.existEmail = existEmail;
function notAEmail(email) {
    return {
        errors: {
            field: "email",
            message: `${email} is not a email`,
        },
        OK: constants_1.falseOK,
    };
}
exports.notAEmail = notAEmail;
function existUniqueId(uniqueId) {
    return {
        errors: {
            field: "uniqueId",
            message: `${uniqueId} unique is exist`,
        },
        OK: constants_1.falseOK,
    };
}
exports.existUniqueId = existUniqueId;
function uniqueIdLength(uniqueId) {
    return {
        errors: {
            field: "uniqueId",
            message: `your ${uniqueId} is less then 3 char`,
        },
        OK: constants_1.falseOK,
    };
}
exports.uniqueIdLength = uniqueIdLength;
//# sourceMappingURL=register.js.map