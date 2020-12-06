const { stringify: str, parse } = JSON;
// !-- EXTERNAL

type AnyFuncT = (...args: Array<any>) => any;

interface CacheT {
	[key: string]: string;
}
type ReturnT =
	| Array<AnyFuncT>
	| [
			AnyFuncT,
			{
				resetCache: () => void;
				getCache: () => any;
				changeCache: (...args: any[]) => CacheT;
			}
	  ];

export function $USE_CACHE(func: AnyFuncT, getUtils = false): ReturnT {
	let cache: CacheT = {};

	if (getUtils) {
		return [
			(...args: any[]) => parse(cache[str(args)] || (cache[str(args)] = str(func(...args)))),
			{
				resetCache: () => (cache = {}),
				getCache: () => cache,
				changeCache: (setCache: (...args: any[]) => CacheT) => (cache = setCache(cache)),
			},
		];
	}
	return [(...args: any[]) => parse(cache[str(args)] || (cache[str(args)] = str(func(...args))))];
}

// ? im not using Internal cache any more
// !-- INTERNAL
// const { cacheedData, functions } = (function init(functions, initialCache) {
// 	if (!new.target) return new init(functions, initialCache);
// 	this.cacheData = initialCache;
// 	this.functions = functions;
// 	Object.keys(this.functions).forEach(func => {
// 		if (!this.cacheData[func]) this.cacheData[func] = {};
// 	});
// })(
// 	{
// 		/* <!><!><!><!><!><!><!><!> PURE FUNCTIONS <!><!><!><!><!><!><!><!>  */
// 		flex(whatIDontWant) {
// 			const s = { display: "flex", justifyContent: "center", alignItems: "center" };
// 			for (const i of whatIDontWant) delete s[i];
// 			return s;
// 		},
// 		transition(time) {
// 			return {
// 				transition: `${time}s ease-in-out,background-color
// 			    ${time}s ease-in-out,border-color
// 			    ${time}s ease-in-out,box-shadow
// 			    ${time}s ease-in-out;`,
// 			};
// 		},
// 		test(a, b) {
// 			console.log("not cached!!");
// 			var x = [];
// 			for (let i = 0; i < 100; i++) x.push(a ** b);

// 			console.log(x);
// 			return x;
// 		},
// 	},
// 	{}
// );
// const { stringify: str, parse } = JSON;
// // ?-- INTERNAL
// export default function $CACHE(funcName, ...args) {
// 	const strArgs = str(args);
// 	const cached = cacheData[funcName];

// 	return parse(cached[strArgs] || (cached[strArgs] = str(functions[funcName](...args))));
// }

// ! external test
// (function () {
// 	const test = $USE_CACHE((a, b) => {
// 		console.log("not cached!!");
// 		var x = [];
// 		for (let i = 0; i < 100; i++) x.push(a ** b);

// 		return x;
// 	});

// 	for (let i = 0; i < 10; i++) {
// 		console.time();
// 		test(10, 10);
// 		console.timeEnd();
// 	}
// })();

// ! external test with getUtils
// (function () {
// 	if (!process.browser) return void 0;
// 	const [test, { deleteCache, getCache, changeCache }] = $USE_CACHE(
// 		(a, b) => {
// 			console.log("not cached!!");
// 			var x = [];
// 			for (let i = 0; i < 100; i++) x.push(a ** b);

// 			return x;
// 		},
// 		{ getUtils: true }
// 	);

// 	for (let i = 0; i < 10; i++) {
// 		changeCache(prev => {
// 			const newCache = { ...prev };
// 			newCache["x" + i] = ["1000" + 1];
// 			return newCache;
// 		});
// 		console.log(getCache());
// 		console.time();
// 		test(10, 10);
// 		console.timeEnd();
// 	}
// 	deleteCache();
// 	console.log(getCache());
// })();

// ! internal test
// (function () {
// 	if (!process.browser) return void 0;
// 	const args = [100, 100];
// 	for (let i = 0; i < 10; i++) {
// 		console.time();
// 		$CACHE("test", ...args);
// 		console.timeEnd();
// 	}
// })();

// ! perototype of cache func
// const cache = {};
// function sumArray(arr) {
// 	const { stringify: str, parse } = JSON;
// 	if (cache[str(arr)]) return parse(cache[str(arr)]);
// 	console.log(arr, "not in cached data. calculating it");

// 	var result = 0;
// 	for (const i of arr) result += i;

// 	cache[str(arr)] = str(result);

// 	return result;
// }
