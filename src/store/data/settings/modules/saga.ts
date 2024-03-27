import { Settings } from './../../../local-storage/interfaces/local-storage-data-model.d';
import { actions, sagaSettingsActionConstants } from "./slice";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { getLocalSettings, saveSettingsLocally } from "../../../local-storage";
import { updateApiUrl } from "../../../../config/AppConfig";

function* saveSettings(action: ReturnType<typeof actions.saveSettings>) {
	yield call(saveSettingsLocally, action.payload);
	yield call(updateApiUrl, action.payload.apiUrl);
}

function* loadSettings(action: ReturnType<typeof actions.loadSettings>) {
	const settings: Settings = yield call(getLocalSettings);
	yield put(actions.loadSettingsSuccess(settings));
	yield call(updateApiUrl, settings.apiUrl);
}

export default function* settingsSaga() {
	yield all([
		takeLatest(sagaSettingsActionConstants.SAVE_SETTINGS, saveSettings),
		takeLatest(sagaSettingsActionConstants.LOAD_SETTINGS, loadSettings)
	]);
}
