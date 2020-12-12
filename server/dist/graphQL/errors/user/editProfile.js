"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usernamelengthEditProfile = exports.uniqueIdLengthEditProfile = exports.notAEmailEditProfile = exports.existUniqueIdEditProfile = exports.existEmailEditProfile = exports.existUsername = exports.locationLengthEditProfile = exports.bioLengthEditProfile = exports.notAllowedToEditProfile = void 0;
const constants_1 = require("../../../helpers/constants");
function notAllowedToEditProfile() {
    return { OK: constants_1.falseOK, errors: { field: "not allowed", message: "not allowed" } };
}
exports.notAllowedToEditProfile = notAllowedToEditProfile;
function bioLengthEditProfile() {
    return { OK: constants_1.falseOK, errors: { field: "bio", message: "chars are more then 160" } };
}
exports.bioLengthEditProfile = bioLengthEditProfile;
function locationLengthEditProfile() {
    return { OK: constants_1.falseOK, errors: { field: "location", message: "chars are more then 30" } };
}
exports.locationLengthEditProfile = locationLengthEditProfile;
function existUsername(username) {
    return {
        errors: {
            field: "username",
            message: `${username} username alridy exist in db`,
        },
        OK: constants_1.falseOK,
    };
}
exports.existUsername = existUsername;
var register_1 = require("./register");
Object.defineProperty(exports, "existEmailEditProfile", { enumerable: true, get: function () { return register_1.existEmail; } });
Object.defineProperty(exports, "existUniqueIdEditProfile", { enumerable: true, get: function () { return register_1.existUniqueId; } });
Object.defineProperty(exports, "notAEmailEditProfile", { enumerable: true, get: function () { return register_1.notAEmail; } });
Object.defineProperty(exports, "uniqueIdLengthEditProfile", { enumerable: true, get: function () { return register_1.uniqueIdLength; } });
Object.defineProperty(exports, "usernamelengthEditProfile", { enumerable: true, get: function () { return register_1.usernamelength; } });
//# sourceMappingURL=editProfile.js.map