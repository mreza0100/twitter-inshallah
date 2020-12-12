"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (async function privateRoute({ context: { userId } }, next) {
    if (!userId)
        throw new Error("user is not authenticated");
    return next();
});
//# sourceMappingURL=privateRoute.js.map