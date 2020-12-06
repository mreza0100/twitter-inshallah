import { css } from "styled-components";

function prevEnter(e: any) {
	if (e.key === "Enter" && e.target.nodeName !== "TEXTAREA") e.preventDefault();
}

function getCookie({ cookies, key }: { cookies: typeof document.cookie; key: string }) {
	if (!cookies) return false;
	const str = cookies
		.split("; ")
		.find(row => row.startsWith(key))
		?.split("=")[1];
	if (!str) return false;
	return str;
}

function setCookie({ key, value, days = 2 }: { key: string; value: string; days: number }) {
	let date = new Date();
	date.setTime(+date + days * 86400000);

	document.cookie = key + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}

function deleteCookie(name: string) {
	document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}

function invertHex(hex: string) {
	return (Number(`0x1${hex}`) ^ 0xffffff).toString(16).substr(1).toUpperCase();
}

function copyToClipboard(text: string) {
	try {
		navigator.clipboard.writeText(text);
		return true;
	} catch (err1) {
		try {
			const input = document.createElement("textarea");
			input.innerHTML = text;
			document.body.appendChild(input);
			input.select();
			const result = document.execCommand("copy");
			document.body.removeChild(input);
			return result;
		} catch (err2) {
			console.dir(err2);
			return false;
		}
	}
}

function getRandomColor(type: string = "hex") {
	if (type === "hex") return "#" + Math.floor(Math.random() * 16777215).toString(16);
	if (type === "rgb") {
		const num = Math.round(0xffffff * Math.random());
		return `rgb(${num >> 16}, ${(num >> 8) & 255}, ${num & 255})`;
	}
}

function isUndefined(theThing: any) {
	return typeof theThing === "undefined";
}

function getRandomNumber(min: number = 0, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function defer(func: () => any) {
	return setTimeout(func, 0);
}

function isEmptyObjOrArr(obj_arr: Array<any> | object) {
	for (const _ in obj_arr) return false;
	return true;
}

function trimObj(
	obj: { [key: string]: any },
	{
		removeFalseyValues = true,
		removeNull = false,
		removeEmptyArr = false,
	}: { removeFalseyValues?: boolean; removeNull?: boolean; removeEmptyArr?: boolean } = {}
) {
	const _obj = { ...obj };
	for (const key in _obj) {
		const value = _obj[key];
		if (removeNull && value === null) delete _obj[key];
		if (removeEmptyArr && Array.isArray(value) && isEmptyObjOrArr(value)) delete _obj[key];
		if (removeFalseyValues && !value) delete _obj[key];
	}
	return _obj;
}

function mapObject<ObjT, ObjTOut = any>(obj: ObjT, func: (currentItem: [string, any]) => ObjTOut) {
	return Object.entries(obj)
		.map(func)
		.reduce((accum: any, [k, v]: any) => {
			accum[k] = v;
			return accum;
		}, {});
}

function toRawType(value: any) {
	return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

function isObject(obj: any) {
	return obj !== null && typeof obj === "object";
}

function looseEqual(a: any, b: any): boolean {
	if (a === b) return true;

	const isObjectA = isObject(a);
	const isObjectB = isObject(b);
	if (isObjectA && isObjectB) {
		try {
			const isArrayA = Array.isArray(a);
			const isArrayB = Array.isArray(b);
			if (isArrayA && isArrayB) {
				return a.length === b.length && a.every((e: any, i: any) => looseEqual(e, b[i]));
			} else if (a instanceof Date && b instanceof Date) {
				return a.getTime() === b.getTime();
			} else if (!isArrayA && !isArrayB) {
				const keysA = Object.keys(a);
				const keysB = Object.keys(b);
				return (
					keysA.length === keysB.length && keysA.every(key => looseEqual(a[key], b[key]))
				);
			} else return /*istanbul ignore next*/ false;
		} catch (e) {
			/* istanbul ignore next */
			return false;
		}
	} else if (!isObjectA && !isObjectB) return String(a) === String(b);
	else return false;
}

function getLastArrayElem<T>(arr: T[]): T {
	return arr[arr.length - 1];
}

function toArray<T>(input: T | Array<T>): Array<T> {
	if (isUndefined(input)) return [];
	return Array.isArray(input) ? input : [input];
}

function toNormalArray(arr: Array<any>) {
	return Array.prototype.slice.call(arr);
	// changing arrayObjectLike to a normal array
}

function objectLength(obj: object) {
	return Object.keys(obj).length;
}

function randomText(n: number): string {
	const words = [
		"mamad",
		"darya",
		"sahra",
		"babayi(gosfand)",
		"mamad ___ 2",
		"shohar_ame",
		"file bardar",
		"baldare",
		"jojo",
		"goshne",
		"mehdi",
		"sepehre",
	];

	let i,
		result = "";
	for (i = 0; i < n; i++) result += words[getRandomNumber(0, words.length - 1)] + "  ";

	return result;
}

function trimArray<T>(array: T[]): T[] {
	return array.filter(elem => !!elem);
}

function makeRange(a: number, b: number): number[] {
	const range = [];
	for (let i = a; i < b; i++) range.push(i);
	return range;
}

function errorGenerator(
	funcLines: string[],
	{ errorLine, errorRange }: { errorLine: number; errorRange: number }
) {
	let strErr = "";
	const range = makeRange(errorLine - errorRange, errorLine + errorRange + 1);

	for (const lineIdx in funcLines) {
		const lineIdxN = Number(lineIdx);
		const thisLine = funcLines[lineIdx];
		if (range.includes(lineIdxN)) {
			if (errorLine === lineIdxN) {
				strErr += "----->   " + thisLine + "\n";
				strErr += "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n";
				continue;
			}
			strErr += "         " + thisLine + "\n";
		}
	}

	return strErr.trim();
}

function pushUp(top: number = 0) {
	return window.scrollTo({ top, behavior: "smooth" });
}

function jssToStr(styles: { [key: string]: any }): string {
	return css(styles).join("\n");
}

export {
	prevEnter,
	getCookie,
	setCookie,
	deleteCookie,
	invertHex,
	copyToClipboard,
	getRandomColor,
	isUndefined,
	getRandomNumber,
	defer,
	isEmptyObjOrArr,
	trimObj,
	mapObject,
	toRawType,
	isObject,
	looseEqual,
	getLastArrayElem,
	toArray,
	toNormalArray,
	objectLength,
	randomText,
	trimArray,
	makeRange,
	errorGenerator,
	pushUp,
	jssToStr,
};
