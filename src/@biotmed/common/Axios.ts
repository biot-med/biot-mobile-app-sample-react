import axios from 'axios';
import APP_CONFIG from '../../config/AppConfig';

const axiosInstance = axios.create({
  headers: {},
});

export default axiosInstance;

export const updateToken = (token: string) => {
  axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeToken = () => {
  axiosInstance.defaults.headers.common = {};
};
