"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeRecords = exports.initWhere = exports.TextSearch = exports.getIP = exports.destroy = void 0;
function destroy() {
    process.kill(process.pid);
    process.abort();
    process.exit();
}
exports.destroy = destroy;
function getIP(req) {
    return req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress;
}
exports.getIP = getIP;
function TextSearch(field, reg) {
    return `'${field}' LIKE '%${reg}%'`;
}
exports.TextSearch = TextSearch;
function initWhere(initialWhere = {}) {
    var where = initialWhere;
    return {
        add: (newWhere = {}) => {
            where = { ...where, ...newWhere };
        },
        get: () => {
            const newWhere = {};
            for (const key in where) {
                const value = where[key];
                if (value)
                    newWhere[key] = value;
            }
            return newWhere;
        },
    };
}
exports.initWhere = initWhere;
function mergeRecords(entiti, data) {
    for (const key in data)
        entiti[key] = data[key];
}
exports.mergeRecords = mergeRecords;
//# sourceMappingURL=index.js.map