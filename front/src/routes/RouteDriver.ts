import {
	AuthPath,
	IndexPath,
	LoginPath,
	NotFoundPath,
	RegisterPath,
	RegisterFullPath,
	ChangePasswordPath,
	ChangePasswordFullPath,
	ChangePasswordWithTokenPath,
	ForgotPasswordPath,
	UserPath,
	EditProfilePath,
} from "./route.addresses";
import {
	NotFound,
	Index,
	Register,
	Login,
	ChangePassword,
	ForgotPassword,
	EditProfile,
	SingleUser,
	Users,
} from "../components/pages";
import { withLoading, withPrivateRoute, withJustForThisUser } from "../components/HOC";
import { ConfigT, RedirectT, RouteT } from "../@types/Routes";
import { AuthLayout, MainLayout } from "../components/layouts";
import { Redirect } from "react-router-dom";

const exact = true;
export default class RouteDriver {
	["/auth/login"]: RouteT = {
		exact,
		Layout: AuthLayout,
		path: LoginPath,
		component: Login,
	};

	["/auth/register"]: RouteT = {
		exact,
		Layout: AuthLayout,
		path: RegisterPath,
		component: Register,
	};

	["/auth/forgot-password"]: RouteT = {
		exact,
		Layout: AuthLayout,
		path: ForgotPasswordPath,
		component: ForgotPassword,
	};

	["/auth/forgot-password/:token"]: RouteT = {
		Layout: AuthLayout,
		exact,
		path: ChangePasswordWithTokenPath,
		component: ChangePassword,
	};

	["/auth/change-password"]: RedirectT = {
		Handler: Redirect,
		exact,
		from: ChangePasswordFullPath,
		to: RegisterFullPath,
		path: ChangePasswordPath,
		nest: this["/auth/forgot-password/:token"],
	};

	["/auth"]: RedirectT = {
		Handler: Redirect,
		exact,
		from: AuthPath,
		path: AuthPath,
		to: RegisterFullPath,
		nest: [
			this["/auth/login"],
			this["/auth/register"],
			this["/auth/forgot-password"],
			this["/auth/change-password"],
		],
	};

	["/user/:uniqueId/edit-profile"]: RouteT = {
		exact,
		component: EditProfile,
		path: EditProfilePath,
		HOC: [withLoading, withPrivateRoute, withJustForThisUser()],
		Layout: MainLayout,
	};

	["/user/:uniqueId"]: RouteT = {
		exact,
		component: SingleUser,
		path: "/:uniqueId",
		HOC: [withLoading, withPrivateRoute],
		Layout: MainLayout,
		nest: this["/user/:uniqueId/edit-profile"],
	};

	["/user"]: RouteT = {
		exact,
		Layout: MainLayout,
		component: Users,
		HOC: [withLoading, withPrivateRoute],
		path: UserPath,
		nest: this["/user/:uniqueId"],
	};

	["/404"]: RouteT = {
		exact,
		path: NotFoundPath,
		component: NotFound,
	};

	["*"]: RedirectT = {
		Handler: Redirect,
		from: "*",
		to: NotFoundPath,
	};

	["/"]: RouteT = {
		exact,
		path: IndexPath,
		component: Index,
		HOC: [withLoading, withPrivateRoute],
		Layout: MainLayout,
		nest: [this["/auth"], this["/user"], this["/404"], this["*"]],
	};
}
export const configs: ConfigT = {
	DEBUG: false,
	hellGate: "/",
};
