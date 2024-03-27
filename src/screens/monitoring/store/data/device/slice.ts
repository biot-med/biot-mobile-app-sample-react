import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { DeviceState, DeviceTemporalCredentials } from "../../../interfaces/device-state";
import { MQTTConnect } from "../../../interfaces/device-data-model";
import { _success, getBaseStateSelector } from "../../../../../store/common/store-common";
import { BiotError } from "../../../../../@biotmed/common/api-common";
import { ECGData } from "../../../interfaces/session-data.model";
import { RootState } from "../../../../../store/reducer";

export const STATE_NAME = 'device';

const initialState: DeviceState = {
	deviceId: null,
	mqttConnection: false,
	sessionContext: null,
	creds: null,
	loading: false,
	error: null,
	requestState: 'prepare',
	operation: null,
};

const _connectToMqtt = (state: DeviceState, { payload }: PayloadAction<MQTTConnect>) => {
	state.deviceId = payload.deviceId;
	state.sessionContext = payload.sessionContext;
	state.loading = true;
	state.mqttConnection = false;
	state.error = null;
	state.requestState = 'start';
	state.operation = 'create';
}

const _connectSuccess = (state: DeviceState) => {
	state.requestState = 'finish';
	state.mqttConnection = true;
	state.operation = 'create';
}

const _onError = (state: DeviceState, { payload }: PayloadAction<BiotError>) => {
	state.loading = false;
	state.error = payload;
	state.mqttConnection = false;
	state.requestState = 'error';
	state.operation = null;
}

const _disconnect = (state: DeviceState) => {
	state.loading = true;
	state.error = null;
	state.requestState = 'start';
	state.operation = null;
}

const _disconnectSuccess = (state: DeviceState) => {
	state.deviceId = null;
	state.sessionContext = null;
	state.mqttConnection = false;
	state.loading = false;
	state.error = null;
	state.requestState = 'finish';
	state.operation = null;
}

const _storeTemporalCredentials = (state: DeviceState, { payload }: PayloadAction<DeviceTemporalCredentials>) => {
	state.creds = payload;
}

const _sendData = (state: DeviceState, { payload }: PayloadAction<any>) => {
	state.loading = true;
	state.error = null;
	state.requestState = 'start';
	state.operation = 'update';
}

const _dataSent = (state: DeviceState) => {
	state.loading = false;
	state.error = null;
	state.requestState = 'finish';
	state.operation = 'update';
}

const _sendEcg = (state: DeviceState, { payload }: PayloadAction<ECGData>) => {
	state.loading = true;
	state.error = null;
	state.requestState = 'start';
	state.operation = 'update';
}

const device = createSlice({
	name: STATE_NAME,
	initialState: initialState,
	reducers: {
		connectToMqtt: _connectToMqtt,
		connectSuccess: _success(_connectSuccess),
		onError: _onError,
		storeTemporalCredentials: _storeTemporalCredentials,
		disconnect: _disconnect,
		disconnectSuccess: _disconnectSuccess,
		sendData: _sendData,
		sendEcg: _sendEcg,
		dataSent: _dataSent
	},
});

export const { actions } = device;

const getState = (state: RootState): DeviceState => state[STATE_NAME] || initialState;

export const selectors = {
  ...getBaseStateSelector<DeviceState>(getState),
  getDeviceId: createSelector(getState, state => state.deviceId),
  isMqttConnected: createSelector(getState, state => state.mqttConnection),
  getSessionContext: createSelector(getState, state => state.sessionContext),
  getCreds: createSelector(getState, state => state.creds),
}

export const sagaDeviceActionConstants = {
	CONNECT_TO_MQTT: actions.connectToMqtt.type,
	DISCONNECT_FROM_MQTT: actions.disconnect.type,
	SEND_DATA_TO_MQTT: actions.sendData.type,
	SEND_ECG_TO_MQTT: actions.sendEcg.type
};

const { reducer } = device;
export default reducer;