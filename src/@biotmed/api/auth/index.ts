import ServerRoutes from "../../common/ServerRoutes";
import axiosInstance from "../../common/Axios";
import APP_CONFIG from "../../../config/AppConfig";

export const loginApi = async (username: string, password: string) => {
	const body = {
		username: username,
		password: password
	}
	
	return await axiosInstance.post(`${APP_CONFIG.API_URL}${ServerRoutes.UMS.login}`, body);
};

export const signUpApi = async (username: string, password:string, registrationCode: string ) => {
	const body = {
		_username: username,
		_password: password,
		_deviceRegistrationCode: registrationCode
	}
	
	return await axiosInstance.post(`${APP_CONFIG.API_URL}${ServerRoutes.UMS.signupAnonymous}`, body);
}

export const updatePatientApi = async (userId: string, firstName?: string, lastName?: string) => {
	const body = {
		_name: {
			firstName,
			lastName
		}
	}
	
	return await axiosInstance.patch(`${APP_CONFIG.API_URL}${ServerRoutes.UMS.patientUpdate.replace('{id}', userId)}`, body);
}

export const refreshTokenApi = async (refreshToken: string) => {
	const body = {
		refreshToken
	}
	return await axiosInstance.post(`${APP_CONFIG.API_URL}${ServerRoutes.UMS.refreshToken}`, body);
};

export const getUserApi = async () => {
	return await axiosInstance.get(`${APP_CONFIG.API_URL}${ServerRoutes.UMS.selfUser}`);
}

export const logoutApi = async (refreshToken: string) => {
	const body = {
		refreshToken
	}
	return await axiosInstance.post(`${APP_CONFIG.API_URL}${ServerRoutes.UMS.logout}`, body);
};

