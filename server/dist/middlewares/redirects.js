"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../helpers/constants");
async function redirects(app) {
    if (!constants_1.__IS_DEV__)
        return;
    app.get("/", (req, res) => {
        res.redirect("/graphql");
    });
}
exports.default = redirects;
//# sourceMappingURL=redirects.js.map