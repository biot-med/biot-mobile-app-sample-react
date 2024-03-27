import { combineReducers } from "redux";

import { reducer as authReducer, stateKey as authStateKey } from '../data/auth'
import { reducer as sessionReducer, stateKey as sessionStateKey } from '../../screens/monitoring/store/data/session'
import { reducer as settingReducer, stateKey as settingsStateKey } from "../data/settings";
import { reducer as deviceReducer, stateKey as deviceStateKey } from "../../screens/monitoring/store/data/device";
import { reducer as devicesReducer, stateKey as devicesStateKey } from '../../screens/search-devices/store/data/devices';

const rootReducer = combineReducers({
	[authStateKey]: authReducer,
	[devicesStateKey]: devicesReducer,
	[sessionStateKey]: sessionReducer,
	[settingsStateKey]: settingReducer,
	[deviceStateKey]: deviceReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;