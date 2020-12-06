import { Redirect, RedirectProps, Route, RouteComponentProps, RouteProps } from "react-router-dom";

export type HOCT = (...args: any[]) => any;

interface ParserPropsRputeT {
	nest?: RoutesT | RouteT;
	Layout?: any;
	HOC?: HOCT | Array<HOCT>;
	Handler?: typeof Route | typeof Redirect;
	setProps?: (routerProps: RouteComponentProps) => RouteComponentProps & { [key: string]: any };
}

export type RouteT<T = RouteProps> = T & ParserPropsRputeT;
export type RoutesT = Array<RouteT>;

export type ParsedRouteT<T = RouteProps> = T & {
	// there is no nest prop in parsed routes its deleted
	setProps?: (routerProps: RouteComponentProps) => RouteComponentProps & { [key: string]: any };
	Layout?: any;
	HOC?: HOCT | Array<HOCT>;
	key?: any;
	Handler?: typeof Route | typeof Redirect;
};

// for using in config file
export type PathsT = string | Array<string>;
export type RedirectT = RedirectProps & {
	Handler: typeof Redirect;
	nest?: RoutesT | RouteT;
};

export interface ConfigT {
	DEBUG: boolean;
	hellGate: string;
}

export type ClassRouteT = {
	[key: string]: RouteT | RedirectT;
};

export type NestedRouteParserDataParam = ParserPropsRputeT & {
	from?: string;
	to?: string;
	path?: string | Array<string>;
};
