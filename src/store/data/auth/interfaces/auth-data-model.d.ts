/**
 * Represents the structure of a login form containing user email and password.
 *
 * @interface LoginForm
 */
export interface LoginForm {
	email: string;
	password: string;
	isAfterSignup: boolean;
}

/**
 * Represents the structure of a login form for refreshing authentication tokens.
 *
 * @interface RefreshTokenForm
 * @property {string} refreshToken - The refresh token used for obtaining a new access token.
 */
export interface RefreshTokenForm {
	refreshToken: string;
}

export interface SignUpForm {
	firstName: string,
	lastName: string,
	username: string,
	password: string
}