import { AppConfig } from './dataModels';
import DEV_CONFIG from './DevConfig';

const PROD_CONFIG: AppConfig = {
  ...DEV_CONFIG,
};

export default PROD_CONFIG;
