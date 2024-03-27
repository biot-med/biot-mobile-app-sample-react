import { fork, all } from 'redux-saga/effects';

import createSagaMiddleware from 'redux-saga';

import {authSaga} from '../data/auth';
import { settingsSaga } from '../data/settings';
import { sessionSaga } from '../../screens/monitoring/store/data/session';
import { deviceSaga } from '../../screens/monitoring/store/data/device';
import { devicesSaga } from '../../screens/search-devices/store/data/devices';

export const sagaMiddleware = createSagaMiddleware({});

const RootSaga = function* rootSaga() {
	yield all([
		fork(authSaga),
		fork(devicesSaga),
		fork(sessionSaga),
		fork(settingsSaga),
		fork(deviceSaga)
	]);
};

export default RootSaga;