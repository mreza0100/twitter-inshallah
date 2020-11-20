import { Request } from "express";
import { FindOneOptions } from "typeorm";

export function destroy() {
	process.kill(process.pid);
	process.abort();
	process.exit();
}

export function getIP(req: Request) {
	return req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress;
}

export function TextSearch(field: string, reg: string) {
	return `'${field}' LIKE '%${reg}%'`;
}

export function initWhere<Entiti>(initialWhere: FindOneOptions<Entiti>["where"] = {}) {
	type WhereT = FindOneOptions<Entiti>["where"];
	type O = object;
	var where: WhereT = initialWhere;

	return {
		add: (newWhere: WhereT = {}) => {
			where = { ...(where as O), ...(newWhere as O) };
		},
		get: () => {
			const newWhere: WhereT = {};
			for (const key in where as O) {
				const value = where![key];
				if (value) newWhere[key] = value;
			}
			return newWhere;
		},
	};
}

export function mergeRecords<Entiti>(entiti: Entiti, data: object) {
	for (const key in data) entiti[key] = data[key];
}
