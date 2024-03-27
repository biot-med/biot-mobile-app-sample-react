import { all, call, put, select, takeLatest } from "redux-saga/effects";

import { actions, sagaSessionActionConstants, selectors } from './slice';
import { CreateSessionRequest, UpdateSessionRequest, createSessionApi, fetchCurrentSessionApi, updateSessionApi } from "../../../../../@biotmed/api/session";
import { actions as DeviceActions } from '../device';
import { handleAxiosError } from "../../../../../@biotmed/common/api-common";


function* startSession(action: ReturnType<typeof actions.startSession>) {
	try {
		const requestBody: CreateSessionRequest = {
			_startTime: new Date().toISOString(),
			_state: 'ACTIVE',
			_patient: {
				id: action.payload.patientId
			}
		}
		const { data } = yield call(createSessionApi, action.payload.deviceId, 'simulation', requestBody);
		yield put(actions.sessionStartSuccess(data));
		yield put(DeviceActions.connectToMqtt({ deviceId: action.payload.deviceId, sessionContext: data._sessionContext }));
	}
	catch (error: any) {
		const { data } = handleAxiosError(error);
		yield put(actions.sessionStartFailed(data));
	}
}

function* stopSession(action: ReturnType<typeof actions.stopSession>) {
	try {
		const requestBody: UpdateSessionRequest = {
			_endTime: new Date().toISOString(),
			_state: 'DONE',
			_summary: {
				_stopReason: 'Stopped by user',
				_stopReasonCode: 'COMPLETION',
				avgHR: action.payload.avgHR
			}
		}
		const deviceId: string = yield select(selectors.getDeviceId);
		const sessionId: string = yield select(selectors.getSessionId);
		const { data } = yield call(updateSessionApi, deviceId, sessionId, requestBody);
		yield put(DeviceActions.disconnect());
		yield put(actions.sessionStopSuccess(data._id));
	}
	catch (error: any) {
		const { data } = handleAxiosError(error);
		yield put(actions.sessionStopFailed(data));
	}
}

function* fetchCurrentSession(action: ReturnType<typeof actions.startSession>) {
	try {
		const searchQuery = {
			filter: {
				"_patient.id": {
					in: [action.payload.patientId]
				}
			}
		}
		const { data } = yield call(fetchCurrentSessionApi, encodeURIComponent(JSON.stringify(searchQuery)));
		const sessions = data.data.length > 0 ? data.data[0]._sessions : [];
		if (sessions.length === 0) {
			yield put(actions.sessionNotFound());
		}
		else {
			yield put(actions.fetchCurrentSessionSuccess(sessions[0]))
			yield put(DeviceActions.connectToMqtt({ deviceId: action.payload.deviceId, sessionContext: sessions[0]._sessionContext }));
		}

	}
	catch (error: any) {
		const { data } = handleAxiosError(error);
		yield put(actions.sessionStartFailed(data));
	}
}

export default function* sessionSaga() {
	yield all([
		takeLatest(sagaSessionActionConstants.SESSION_START, startSession),
		takeLatest(sagaSessionActionConstants.SESSION_STOP, stopSession),
		takeLatest(sagaSessionActionConstants.FETCH_CURRENT_SESSION, fetchCurrentSession)
	]);
}
