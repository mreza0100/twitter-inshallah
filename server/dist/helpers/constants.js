"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DELETE_DB = exports.FRONT_END_URL = exports.FORGET_PASSWORD_PREFIX = exports.COOKIE_NAME = exports.delayTime = exports.SECRET_KEY = exports.PORT = exports.__IS_DEV__ = exports.falseOK = exports.trueOK = void 0;
exports.trueOK = true;
exports.falseOK = false;
exports.__IS_DEV__ = process.env.NODE_ENV === "dev";
exports.PORT = process.env.PORT || 10000;
exports.SECRET_KEY = "@*!###@dkaaAWDwfkai2wDWA@@@adad?2WN@@KFNHJAKWAA";
exports.delayTime = 0;
exports.COOKIE_NAME = "qid";
exports.FORGET_PASSWORD_PREFIX = "forget-password:";
exports.FRONT_END_URL = exports.__IS_DEV__ ? "http://localhost:8000" : "";
exports.DELETE_DB = exports.__IS_DEV__ && false;
//# sourceMappingURL=constants.js.map