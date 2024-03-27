import { all, call, put, select, take, takeLatest } from "redux-saga/effects";
import { EventChannel, eventChannel, END } from "redux-saga";
import { actions, sagaDeviceActionConstants, selectors } from './slice';

import mqttManager from "../../../../../@biotmed/mqtt/MQTTManager";
import { MQTTListenerMessage } from "../../../interfaces/device-data-model";
import { getDeviceTemporalCredentials } from "../../../../../@biotmed/api/device";
import { handleAxiosError } from "../../../../../@biotmed/common/api-common";

const onMQTTManagerEvent = (connectionConfig: any) => eventChannel((emitter) => {
	mqttManager.setup(connectionConfig);
	mqttManager.setOnConnectListener(() => {
		const data: MQTTListenerMessage = { event: 'connected' };
		emitter(data);
	});
	mqttManager.setOnDisconnectListener(() => {
		const data: MQTTListenerMessage = { event: 'disconnected' };
		emitter(data);
		emitter(END);
	});
	mqttManager.setOnErrorListener((error: any) => {
		console.log(error);

		const data: MQTTListenerMessage = { event: 'error', payload: error };
		emitter(data);
	});
	mqttManager.setOnMessageSentSuccessListener(() => {
		const data: MQTTListenerMessage = { event: 'message_sent' };
		emitter(data);
	});
	mqttManager.setOnMessageSentFailedListener((error: any) => {
		const data: MQTTListenerMessage = { event: 'message_failed', payload: error };
		emitter(data);
	});
	mqttManager.connect();
	return () => { };
});

function* onMessage(message: MQTTListenerMessage) {
	switch (message.event) {
		case 'connected':
			yield put(actions.connectSuccess(message));
			break;
		case 'disconnected':
			yield put(actions.disconnectSuccess());
			break;
		case 'error':
			yield put(actions.onError({
				message: 'error-mqtt-connect'
			}));
			break;
		case 'message_sent':
			yield put(actions.dataSent());
			break;
		case 'message_failed':
			yield put(actions.onError({
				message: 'error-mqtt-message-publish'
			}));
			break;
		default:
			break;
	}
}

function* connectToMqtt(action: ReturnType<typeof actions.connectToMqtt>) {
	try {
		const { data } = yield call(getDeviceTemporalCredentials, action.payload.deviceId);
		yield put(actions.storeTemporalCredentials(data));
		const channel: EventChannel<MQTTListenerMessage> = yield call(onMQTTManagerEvent, data);
		try {
			while (true) {
				const message: MQTTListenerMessage = yield take(channel);
				yield onMessage(message);
			}
		}
		finally {
			channel.close();
		}
	}
	catch (error: any) {
		const { data } = handleAxiosError(error);
		yield put(actions.onError(data));
	}
}

function* disconnectFromMqtt() {
	yield call([mqttManager, mqttManager.disconnect]);
}

function* sendDataToMqtt(action: ReturnType<typeof actions.sendData>) {
	const sessionContext: string = yield select(selectors.getSessionContext);
	const data: any = {
		metadata: {
			timestamp: new Date().getTime(),
			context: sessionContext
		},
		data: {
			hr: action.payload.hr
		}
	}
	if (action.payload.spo2) {
		data.data['spo2'] = action.payload.spo2;
	}
	yield call([mqttManager, mqttManager.publishToMqtt], data);
}

function* sendECGToMqtt(action: ReturnType<typeof actions.sendEcg>) {
	const sessionContext: string = yield select(selectors.getSessionContext);
	const data: any = {
		metadata: {
			timestamp: new Date().getTime(),
			context: sessionContext
		},
		data: {
			ecg: {
				metadata: {
					frequency: action.payload.frequency,
					size: action.payload.size
				},
				data: action.payload.ecg
			}
		}
	}
	yield call([mqttManager, mqttManager.publishToMqtt], data);
}



export default function* deviceSaga() {
	yield all([
		takeLatest(sagaDeviceActionConstants.CONNECT_TO_MQTT, connectToMqtt),
		takeLatest(sagaDeviceActionConstants.DISCONNECT_FROM_MQTT, disconnectFromMqtt),
		takeLatest(sagaDeviceActionConstants.SEND_DATA_TO_MQTT, sendDataToMqtt),
		takeLatest(sagaDeviceActionConstants.SEND_ECG_TO_MQTT, sendECGToMqtt)
	]);
}
