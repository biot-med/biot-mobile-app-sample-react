import { AxiosError } from "axios";

export const handleAxiosError = (error: AxiosError) => {
	const { response } = error;
	console.log(response?.data);
	
	return {
		status: response?.status,
		data: response?.data as BiotError,
	};
};

export interface BiotError {
	code?: string;
	message?: string;
	serviceName?: string;
	traceId?: string;
	environment?: string;
	details?: any;
}