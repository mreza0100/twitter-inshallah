"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
function test(app) {
    app.get("/test", async (req, res) => {
        const isConnected = typeorm_1.getConnection().isConnected;
        res.json({ dbConnection: isConnected });
    });
}
exports.default = test;
//# sourceMappingURL=test.js.map