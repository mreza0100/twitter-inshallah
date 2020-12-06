import fix from "../../../helpers/fixPageScroll";
import { FieldInfo, Resolver, Variables } from "@urql/exchange-graphcache";
import { looseEqual } from "../../../helpers";
import { stringifyVariables } from "urql";

const compareArgs = (fieldArgs: Variables, connectionArgs: Variables): boolean => {
	for (const key in connectionArgs) {
		if (key === "cursor" || key === "limit") continue;
		if (!(key in fieldArgs)) return false;

		const argA = fieldArgs[key];
		const argB = connectionArgs[key];
		if (!looseEqual(argA, argB)) return false;
	}

	for (const key in fieldArgs) {
		if (key === "cursor" || key === "limit") continue;

		if (!(key in connectionArgs)) return false;
	}

	return true;
};

export const cursorPagination: Resolver = (_parent, args, cache, info) => {
	const { parentKey: entityKey, fieldName } = info;
	const allQueries = cache.inspectFields(entityKey);

	var postsFields: FieldInfo[];

	postsFields = allQueries.filter(fi => fi.fieldName === fieldName);
	// .filter(fi => compareArgs(fi.arguments as any, args));

	if (!postsFields.length) return undefined;

	const areFieldKey = `posts(${stringifyVariables(args)})`;

	const isItInTheCache = !!cache.resolveFieldByKey(entityKey, areFieldKey);

	info.partial = !isItInTheCache;
	fix(isItInTheCache);

	var left: any;
	var hasMore: any;
	const result: string[] = [];
	for (const i of postsFields) {
		if (!compareArgs(i.arguments as any, args)) continue;
		// collecting all the stored querys from different cursores to a single array of posts in "result" and return it
		const realKeyOfThisField = cache.resolveFieldByKey(entityKey, i.fieldKey) as string;
		const storedData = cache.resolve(realKeyOfThisField, "posts") as string[];

		left = cache.resolve(realKeyOfThisField, "left") as number;
		hasMore = cache.resolve(realKeyOfThisField, "hasMore") as boolean;

		result.push(...storedData);
	}

	return {
		left,
		hasMore,
		posts: result,
		__typename: "PaginatedPosts",
	} as any;
};

// import { Resolver, Variables, NullArray } from "@urql/exchange-graphcache";
// import { stringifyVariables } from "@urql/core";

// export interface PaginationParams {
// 	offsetArgument?: string;
// 	limitArgument?: string;
// }

// export const simplePagination = ({
// 	offsetArgument = "skip",
// 	limitArgument = "limit",
// }: PaginationParams = {}): Resolver => {
// 	const compareArgs = (fieldArgs: Variables, connectionArgs: Variables): boolean => {
// 		for (const key in connectionArgs) {
// 			if (key === offsetArgument || key === limitArgument) {
// 				continue;
// 			} else if (!(key in fieldArgs)) {
// 				return false;
// 			}

// 			const argA = fieldArgs[key];
// 			const argB = connectionArgs[key];

// 			if (
// 				typeof argA !== typeof argB || typeof argA !== "object"
// 					? argA !== argB
// 					: stringifyVariables(argA) !== stringifyVariables(argB)
// 			) {
// 				return false;
// 			}
// 		}

// 		for (const key in fieldArgs) {
// 			if (key === offsetArgument || key === limitArgument) {
// 				continue;
// 			}
// 			if (!(key in connectionArgs)) return false;
// 		}

// 		return true;
// 	};

// 	return (_parent, fieldArgs, cache, info) => {
// 		const { parentKey: entityKey, fieldName } = info;

// 		const allFields = cache.inspectFields(entityKey);
// 		const thisFieldInfos = allFields.filter(info => info.fieldName === fieldName);
// 		const size = thisFieldInfos.length;

// 		if (!size) return undefined;

// 		const visited = new Set();
// 		let result: NullArray<string> = [];
// 		let prevOffset: number | null = null;

// 		for (let i = 0; i < size; i++) {
// 			const { fieldKey, arguments: args } = thisFieldInfos[i];
// 			if (args === null || !compareArgs(fieldArgs, args)) {
// 				continue;
// 			}

// 			const links = cache.resolveFieldByKey(entityKey, fieldKey) as string[];
// 			const currentOffset = args[offsetArgument];

// 			if (links === null || links.length === 0 || typeof currentOffset !== "number") {
// 				continue;
// 			}

// 			if (!prevOffset || currentOffset > prevOffset) {
// 				for (let j = 0; j < links.length; j++) {
// 					const link = links[j];
// 					if (visited.has(link)) continue;
// 					result.push(link);
// 					visited.add(link);
// 				}
// 			} else {
// 				const tempResult: NullArray<string> = [];
// 				for (let j = 0; j < links.length; j++) {
// 					const link = links[j];
// 					if (visited.has(link)) continue;
// 					tempResult.push(link);
// 					visited.add(link);
// 				}
// 				result = [...tempResult, ...result];
// 			}

// 			prevOffset = currentOffset;
// 		}

// 		const hasCurrentPage = cache.resolve(entityKey, fieldName, fieldArgs);
// 		if (hasCurrentPage) {
// 			return result;
// 		} else if (!(info as any).store.schema) {
// 			return undefined;
// 		} else {
// 			info.partial = true;
// 			return result;
// 		}
// 	};
// };
