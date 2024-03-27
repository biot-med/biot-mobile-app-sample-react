import {AppRegistry} from 'react-native';
import App from './src/app/App';
import {name as appName} from './app.json';
import './shim';
import { setupURLPolyfill } from 'react-native-url-polyfill';
setupURLPolyfill();

AppRegistry.registerComponent(appName, () => App);
