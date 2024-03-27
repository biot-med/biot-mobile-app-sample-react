import ProdConfig from './ProdConfig';
import DevConfig from './DevConfig';
import { AppConfig } from './dataModels';

let APP_CONFIG: AppConfig = __DEV__ ? DevConfig : ProdConfig;

export const updateApiUrl = (apiUrl?: string) => {
	if (apiUrl) {
		APP_CONFIG.API_URL = apiUrl;
	}
}

export default APP_CONFIG;
