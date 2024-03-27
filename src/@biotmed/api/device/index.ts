import APP_CONFIG from "../../../config/AppConfig";
import axiosInstance from "../../common/Axios";
import ServerRoutes from "../../common/ServerRoutes";

export const getDeviceTemporalCredentials = async (deviceId: string) => {
	const url = `${APP_CONFIG.API_URL}${ServerRoutes.Device.getDeviceCredentials}`.replace('{id}', deviceId);
	return await axiosInstance.get(url);
}

export const assignDeviceToPatientApi = async (registrationCode: string) => {
	const body = {
		deviceRegistrationCode: registrationCode
	}
	return await axiosInstance.post(`${APP_CONFIG.API_URL}${ServerRoutes.Device.assignDeviceToPatient}`, body);
}

export const searchDeviceTemplate = async (deviceTemplateName: string) => {
	const searchQuery = {
		filter: {
			name: {
				eq: deviceTemplateName.replace(/[ ]+/g, '_').toLowerCase()
			},
			entityTypeName: {
				eq: "device"
			}
		},
		limit: 1,
		page: 0
	}
	return await axiosInstance.get(`${APP_CONFIG.API_URL}${ServerRoutes.Device.deviceTemplate}${encodeURIComponent(JSON.stringify(searchQuery))}`);
}

export const searchAttachedDevice = async (patientId: string) => {
	const searchQuery = {
		filter: {
			"_patient.id": {
				in: [patientId]
			}
		},
		limit: 1,
		page: 0
	}
	return await axiosInstance.get(`${APP_CONFIG.API_URL}${ServerRoutes.Device.searchDevice}${encodeURIComponent(JSON.stringify(searchQuery))}`);
}