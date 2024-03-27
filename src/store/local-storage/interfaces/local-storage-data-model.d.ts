/**
 * Represents user settings stored in local(async) storage
 *
 * @interface Settings
 * @property {string | undefined} apiUrl - The API URL configured in user settings, if available.
 */
export interface Settings {
	apiUrl?: string;
}

/**
 * Represents authentication data stored in local(async) storage
 *
 * @interface AuthDataStore
 * @property {string} refreshToken - The refresh token used for obtaining new access tokens.
 */
export interface AuthDataStore {
	refreshToken: string;
}