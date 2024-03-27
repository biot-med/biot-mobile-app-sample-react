import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthDataStore, Settings } from "./interfaces/local-storage-data-model";
import APP_CONFIG from '../../config/AppConfig';

const APP_SETTINGS_KEY = 'APP_SETTINGS_KEY';
const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN_KEY';

/**
 * Retrieve user settings stored locally in AsyncStorage.
 *
 * @async
 * @function getLocalSettings
 * @returns {Promise<Settings>} - A Promise that resolves to the user settings, including the API URL, if available. 
 * If settings are not found, it defaults to the API URL specified in the application configuration.
 */
export const getLocalSettings = async () => {
	try {
		const settingsString = await AsyncStorage.getItem(APP_SETTINGS_KEY);
		if (settingsString) {
			const settings: Settings = JSON.parse(settingsString);
			return settings;
		}
	} catch (e) {
		return {
			apiUrl: APP_CONFIG.API_URL
		};
	}
	return {
		apiUrl: APP_CONFIG.API_URL
	};
}

/**
 * Save user settings locally in AsyncStorage.
 *
 * @function saveSettingsLocally
 * @param {Settings} settings - The user settings to be saved, including the API URL.
 */
export const saveSettingsLocally = (settings: Settings) => {
	AsyncStorage.setItem(APP_SETTINGS_KEY, JSON.stringify(settings));
}

/**
 * Save authentication data (e.g., refresh token) locally in AsyncStorage.
 *
 * @function saveAuthData
 * @param {AuthDataStore} authData - The authentication data to be saved.
 */
export const saveAuthData = (authData: AuthDataStore) => {
	AsyncStorage.setItem(REFRESH_TOKEN_KEY, JSON.stringify(authData));
}

/**
 * Remove authentication data (e.g., refresh token) from AsyncStorage.
 *
 * @function cleanAuthData
 */
export const cleanAuthData = async () => {
	AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
}

/**
 * Retrieve authentication data (e.g., refresh token) stored locally in AsyncStorage.
 *
 * @async
 * @function getAuthData
 * @returns {Promise<AuthDataStore | null>} - A Promise that resolves to the stored authentication data, including the refresh token, if available. 
 * If no authentication data is found, it resolves to null.
 */
export const getAuthData = async (): Promise<AuthDataStore | null> => {
	try {
		const authDataString = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
		if (authDataString) {
			const authData: AuthDataStore = JSON.parse(authDataString);
			return authData;
		}
	} catch (e) {
		return null;
	}
	return null;
}