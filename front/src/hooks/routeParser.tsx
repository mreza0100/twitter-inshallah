/* eslint-disable no-lone-blocks */
import {
	RouteT,
	ParsedRouteT,
	PathsT,
	HOCT,
	ClassRouteT,
	ConfigT,
	NestedRouteParserDataParam,
} from "../@types/Routes";
import { errorGenerator, toArray } from "../helpers";
import { Route, RouteComponentProps } from "react-router-dom";
import { __IS_DEV__ } from "../helpers/constants";
import { withLayout } from "../components/HOC/";
import React from "react";

/**
 * @function addSlashFactory he can put "/" or just dont, its optional
 * add "/" to first of every string with out "/"
 * "/user" to "/user"
 * "user" to "/user"
 *
 * @param paths its a string or string[]
 */

function addSlashFactory(paths: PathsT) {
	paths = toArray(paths);

	const newPaths: Array<string> = [];

	for (const path of paths) {
		if (path[0] !== "/") newPaths.push("/" + path);
		else newPaths.push(path);
	}

	return newPaths;
}

/**
 * @function addPrevPathsToNewPaths simplie its adding a array of prev paths to new paths its like
 * if:
 *  prevPaths : ["user", "user1"]
 *  newPaths : ["all", ":id"]
 * return will be: ["user/all", "user/:id", "user1/all", "user1/:id"]
 *
 * @param newPaths its a string or string[]
 * @param prevPaths all paths that was compilited before this route
 */

function addPrevPathsToNewPaths(prevPaths: PathsT, newPaths: PathsT) {
	newPaths = toArray(newPaths);
	prevPaths = toArray(prevPaths);

	const newAddPaths: Array<string> = [];

	for (const prevPath of prevPaths) {
		for (const path of newPaths) {
			newAddPaths.push((prevPath + path).replace("//", "/"));
		}
	}

	return newAddPaths;
}

/**
 * @function trimPaths why using replace method? its because "/" with stick to "/user"
 * and it will be "//user" and thats not what we want
 *
 * @param paths
 */

function trimPaths(paths: PathsT): PathsT {
	paths = toArray(paths);
	paths = paths.map(path => path.replace("//", "/"));

	return paths.length === 1 ? paths[0] : paths;
}

/**
 * ## the core of route parser
 * @function __RouteSpinner__ is for route compilition in nest property
 *
 * if data is { name: route1, nest:{ name: underlye route } }
 * then return will be: [{name: route1},{name: underlye route}]
 * TODO: add ability for passing array for "to" and "from" on Redirect Handler
 *
 * how it works: its recursive function that every time see a nest property repeat it self for that nest routes
 * again and again... the object passed with a nest property will back as a array with too object and compilited routes
 *
 *
 * @param data its a object and probably includes nest property(underlying routes)
 * @param prevPath is for tracking paths. its can be a string or string[]
 */
function __RouteSpinner__(data: NestedRouteParserDataParam, prevPath: PathsT = ""): Array<ParsedRouteT> {
	data = { ...data };
	// getting a clone of real obj now I can delete data.nest in the end of func
	const result: Array<ParsedRouteT> = [];
	// I will keep sort by pushing to result array
	// he can pass array or single obj to nest
	const nestedRoute = toArray(data.nest) as Array<RouteT>;

	if (data?.path) {
		data.path = addSlashFactory(data.path);
		data.path = addPrevPathsToNewPaths(prevPath, data.path);
		data.path = trimPaths(data.path);
	}
	if (data.from) data.from = trimPaths(data.from) as string;
	if (data.to) data.to = trimPaths(data.to) as string;

	result.push(data);
	for (const nest of nestedRoute) {
		result.push(...__RouteSpinner__(nest, data.path));
	}

	delete data.nest;
	// i'm deleting nested array from my cloned data
	// its not effecting on any where else
	return result;
}

function DEBUGGER(parsedRoutes: Array<ParsedRouteT>, RouteDriver: string) {
	for (const route of parsedRoutes) {
		const path = route.path ? toArray(route.path) : "no path";
		console.log("path>>", path, "<<  		 |full parsedRoutes>>>", route);
	}

	const duplicateErr = (duplicatedPath: string) => {
		const allDriverLines = RouteDriver.split("\n");
		var isThrowedError = false;
		duplicatedPath = duplicatedPath.slice(1);
		// changing "/new" to "new"

		for (const idx in allDriverLines) {
			const driverLineIdx = Number(idx);
			if (
				allDriverLines[driverLineIdx].includes(`"${duplicatedPath}"`) ||
				allDriverLines[driverLineIdx].includes(`"/${duplicatedPath}"`)
			) {
				if (!isThrowedError) {
					console.warn("WARNING: there was duplicated path");
					isThrowedError = true;
				}

				console.error(
					errorGenerator(allDriverLines, {
						errorLine: driverLineIdx,
						errorRange: 4,
					})
				);
			}
		}
	};

	const goodPaths: Array<string> = [];
	const duplicatedPaths: Array<string> = [];
	for (const parsedRoute of parsedRoutes) {
		const paths = toArray(parsedRoute.path);

		for (const curentPath of paths) {
			if (!curentPath) continue;

			if (goodPaths.find(storedPath => storedPath === curentPath)) {
				duplicatedPaths.push(curentPath);
			} else {
				goodPaths.push(curentPath);
			}
		}
	}
	for (const duplicatedPath of duplicatedPaths) duplicateErr(duplicatedPath);
}

/**
 * @function parseRoutes parsing each route(with calling nestedRouteParser) and spread and push thim to parsedRoutes array
 *
 * @param RouteDriver all raw routes its like { name: route1, nest:{ name: underlye route } }
 */

function parseRoutes(RouteDriver: any, configs: ConfigT) {
	const routes: ClassRouteT = new RouteDriver();

	const hellGate = configs.hellGate
		? routes[configs.hellGate]
		: routes["/"] || routes["/index"] || routes["index"];

	if (!hellGate) {
		throw new Error(
			"can't find hellGate, you must pass it in config obj or name it ['/'] || ['/index'] || ['index'"
		);
	}

	const parsedRoutes = __RouteSpinner__(hellGate as NestedRouteParserDataParam);

	if (configs.DEBUG && __IS_DEV__) DEBUGGER(parsedRoutes, RouteDriver.toString());

	return parsedRoutes;
}

/**
 *
 * @function setHOCs initing OHCs from config object
 *
 * @param Component from config object
 * @param HOCs passes HOC from config object
 *
 */

function setHOCs(Component: React.ReactNode, HOCs: Array<HOCT>) {
	for (const HOC of HOCs) {
		Component = HOC(Component);
	}

	return Component;
}
/**
 * @function useParseRouter you must call this func and pass your array of raw routes
 * he call other functions to parse and... in the end it returns nativeJSXRoutes in a array
 *
 * @param rawRouteConfigs your raw config for routes its like [{ name: route1, nest:{ name: underlye route } }]
 *
 * @constant ComponentWithLayout will have the component with seated prevition HOCs and seated Layout
 */
export default function useRouterParse(RouteDriver: any, configs: ConfigT) {
	const parsedRoutes = parseRoutes(RouteDriver, configs);

	const nativeJSXRoutes = parsedRoutes.map((data, idx) => {
		const {
			Handler = Route,
			component: Component = null,
			Layout = null,
			HOC = [],
			setProps = null,
			...handlerProps
		} = data;
		handlerProps.key = idx;
		const HOCArray = toArray(HOC);

		const ComponentWithSeatedHOCs = setHOCs(Component, HOCArray);

		const ComponentWithLayout = withLayout(ComponentWithSeatedHOCs, Layout);

		return (
			<Handler {...handlerProps}>
				{(() => {
					if (!ComponentWithLayout) return null;
					return (routerProps: RouteComponentProps) => {
						if (setProps) routerProps = setProps(routerProps);

						return <ComponentWithLayout {...routerProps} />;
					};
				})()}
			</Handler>
		);
	});
	return nativeJSXRoutes;
}
