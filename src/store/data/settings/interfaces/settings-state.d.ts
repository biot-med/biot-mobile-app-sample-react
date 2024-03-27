import { BaseState } from "../../../common/interfaces/base";

/**
 * Represents the state for user settings stored in state.
 *
 * @interface SettingsState
 * @extends BaseState - Inherits properties from the BaseState interface.
 * @property {string | undefined} apiUrl - The API URL configured in user settings, if available.
 * @property {string | undefined} deviceId - Predefined device id.
 * @property {string | undefined} email - The user's email address, if available in user settings.
 */
export interface SettingsState extends BaseState {
	apiUrl?: string;
	deviceId?: string;
	email?: string;
}