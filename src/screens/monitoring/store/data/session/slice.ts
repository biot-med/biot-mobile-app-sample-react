import { _success, _loadingFailed, _startLoading, getBaseStateSelector } from '../../../../../store/common/store-common';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SessionState } from '../../../interfaces/session-state';
import { CreateSessionResponse, SessionStart, SessionStop } from '../../../interfaces/session-data.model';
import { BiotError } from '../../../../../@biotmed/common/api-common';
import { RootState } from '../../../../../store/reducer';

export const STATE_NAME = 'session';

const initialState: SessionState = {
	sessionStarted: false,
	deviceId: null,
	patientId: null,
	sessionId: null,
	sessionContext: null,
	loading: false,
	error: null,
	requestState: 'prepare',
	operation: null,
};

const _startSession = (state: SessionState, { payload }: PayloadAction<SessionStart>) => {
	state.deviceId = payload.deviceId;
	state.patientId = payload.patientId;
	state.loading = true;
	state.error = null;
	state.requestState = 'start';
	state.operation = 'create';
}

const _sessionStartSuccess = (state: SessionState, { payload }: PayloadAction<CreateSessionResponse>) => {
	state.sessionId = payload._id;
	state.sessionContext = payload._sessionContext;
	state.sessionStarted = true;
	state.requestState = 'finish';
	state.operation = null;
}

const _sessionFailed = (state: SessionState, { payload }: PayloadAction<BiotError>) => {
	state.loading = false;
	state.error = payload;
	state.requestState = 'error';
	state.operation = null;
}

const _stopSession = (state: SessionState, { payload }: PayloadAction<SessionStop>) => {
	state.loading = true;
	state.error = null;
	state.requestState = 'start';
	state.operation = 'update';
}

const _sessionStopSuccess = (state: SessionState, { payload }: PayloadAction<any>) => {
	state.sessionStarted = false;
	state.sessionId = null;
	state.sessionContext = null;
	state.requestState = 'finish';
	state.operation = null;
}

const _sessionNotFound = (state: SessionState) => {
	state.loading = false;
	state.error = null;
	state.requestState = 'finish';
	state.operation = null;
}

const _cleanState = (state: SessionState) => {
	state = { ...initialState };
	return state;
};

const _cleanError = (state: SessionState) => {
	state.error = null;
	state.requestState = 'prepare';
	state.operation = null;
}

const session = createSlice({
	name: STATE_NAME,
	initialState: initialState,
	reducers: {
		startSession: _startSession,
		sessionStartSuccess: _success(_sessionStartSuccess),
		sessionStartFailed: _sessionFailed,
		fetchCurrentSession: _startSession,
		fetchCurrentSessionSuccess: _success(_sessionStartSuccess),
		fetchCurrentSessionFailed: _loadingFailed,
		sessionNotFound: _sessionNotFound,
		stopSession: _stopSession,
		sessionStopSuccess: _success(_sessionStopSuccess),
		sessionStopFailed: _sessionFailed,
		cleanState: _cleanState,
		cleanError: _cleanError
	},
});

export const { actions } = session;

const getState = (state: RootState): SessionState => state[STATE_NAME] || initialState;

export const selectors = {
	...getBaseStateSelector<SessionState>(getState),
	isSessionStarted: createSelector(getState, state => state.sessionStarted),
	getDeviceId: createSelector(getState, state => state.deviceId),
	getPatientId: createSelector(getState, state => state.patientId),
	getSessionId: createSelector(getState, state => state.sessionId),
	getSessionContext: createSelector(getState, state => state.sessionContext),
}

export const sagaSessionActionConstants = {
	SESSION_START: actions.startSession.type,
	SESSION_STOP: actions.stopSession.type,
	FETCH_CURRENT_SESSION: actions.fetchCurrentSession.type
};

const { reducer } = session;
export default reducer;