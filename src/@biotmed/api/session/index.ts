import APP_CONFIG from "../../../config/AppConfig";
import axiosInstance from "../../common/Axios";
import ServerRoutes from "../../common/ServerRoutes";

export interface CreateSessionRequest {
	_startTime: string;
	_state: string;
	_patient: {
		id: string;
	}
}

export interface UpdateSessionRequest {
	_endTime?: string;
	_state?: string;
	_summary: {
		_stopReason?: string,
		_stopReasonCode?: string;
		avgHR?: number
	}
}

export const createSessionApi = async (deviceId: string, usageType: string, sessionData: CreateSessionRequest) => {
	const url = `${APP_CONFIG.API_URL}${ServerRoutes.Device.createSession}`
		.replace('{deviceId}', deviceId).replace('{usageType}', usageType);
	return await axiosInstance.post(url, sessionData);
}

export const updateSessionApi = async (deviceId: string, sessionId: string, sessionData: UpdateSessionRequest) => {
	const url = `${APP_CONFIG.API_URL}${ServerRoutes.Device.updateSession}`
		.replace('{deviceId}', deviceId).replace('{id}', sessionId);
	return await axiosInstance.patch(url, sessionData);
}

export const fetchCurrentSessionApi = async (searchQuery: string) => {
	let url = `${APP_CONFIG.API_URL}${ServerRoutes.Device.currentSession}?searchRequest=${searchQuery}`;
	return await axiosInstance.get(url);
}

