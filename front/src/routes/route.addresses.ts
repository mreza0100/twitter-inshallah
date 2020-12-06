function pathResolver(...paths: string[]): string {
	return paths.join("").replace("//", "/");
}

export const IndexPath = "/";

export const NotFoundPath = "/404";

export const AuthPath = "/auth";
export const RegisterPath = "/register";
export const RegisterFullPath = pathResolver(IndexPath, AuthPath, RegisterPath);

export const LoginPath = "/login";
export const LoginFullPath = pathResolver(IndexPath, AuthPath, LoginPath);

export const ChangePasswordPath = "/change-password";
export const ChangePasswordFullPath = pathResolver(IndexPath, AuthPath, ChangePasswordPath);

export const ChangePasswordWithTokenPath = "/:token";
export const ChangePasswordWithTokenFullPath = pathResolver(
	ChangePasswordFullPath,
	ChangePasswordWithTokenPath
);

export const ForgotPasswordPath = "/forgot-password";
export const ForgotPasswordFullPath = pathResolver(IndexPath, AuthPath, ForgotPasswordPath);

export const UserPath = "/user";

export const EditProfilePath = "/edit-profile";
