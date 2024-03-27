import { all, call, delay, put, select, takeLatest } from "redux-saga/effects";
import { actions, sagaDevicesActionConstants } from "./slice";
import { PREDEFINED_DEVICE_ID } from "../../../../../store/common/constants";
import { handleAxiosError } from "../../../../../@biotmed/common/api-common";
import { assignDeviceToPatientApi } from "../../../../../@biotmed/api/device";
import {actions as SettingsActions, selectors as SettingsSelectors} from '../../../../../store/data/settings';

function* loadDevicesSaga() {
	try {
		yield delay(5000);
		yield put(actions.devicesLoaded([{
			id: PREDEFINED_DEVICE_ID,
			name: PREDEFINED_DEVICE_ID,
		}]));
	} catch (error) {
	}
}

function* assignDevicesSaga(action: ReturnType<typeof actions.assignDevice>) {
	try {
		const { data } = yield call(assignDeviceToPatientApi, action.payload);
		yield put(actions.assignDeviceSuccess());
		const apiUrl:string = yield select(SettingsSelectors.getApiUrl);
		yield put(SettingsActions.saveSettings({apiUrl: apiUrl}));
	}
	catch(error: any) {
		const { data } = handleAxiosError(error);
		yield put(actions.assignDeviceFailed(data));
	}
}

export default function* devicesSaga() {
	yield all([
		takeLatest(sagaDevicesActionConstants.FETCH_DEVICES, loadDevicesSaga),
		takeLatest(sagaDevicesActionConstants.ASSIGN_DEVICE, assignDevicesSaga),
	]);
}
