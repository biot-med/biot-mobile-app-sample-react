import { mqtt, iot } from 'aws-iot-device-sdk-v2';
import { MQTTConnectionConfig } from "./interfaces/mqtt-data-model";

const DEFAULT_MEASUREMENT_TOPIC = '/from-device/measurement';

class MQTTManager {

	private config: MQTTConnectionConfig | null;
	private mqttClient: mqtt.MqttClient | null;
	private mqttConnection: mqtt.MqttClientConnection | null;

	private onMessageSentSuccess: Function | null;
	private onMessageSentFailed: Function | null;

	constructor() {
		this.config = null;
		this.mqttClient = null;
		this.mqttConnection = null;
		this.onMessageSentSuccess = null;
		this.onMessageSentFailed = null;
	}

	public setup(config: MQTTConnectionConfig) {
		this.config = config;
		const builder = iot.AwsIotMqttConnectionConfigBuilder.new_websocket_builder();
		const region = config.endpoint.split('.')[2];
		builder.with_credentials(region,
			this.config.credentials.accessKeyId,
			this.config.credentials.secretAccessKey,
			this.config.credentials.sessionToken);
		builder.with_keep_alive_seconds(30);
		builder.with_clean_session(false);
		builder.with_client_id(this.config.connectionClientId);
		builder.with_endpoint(this.config.endpoint);
		const mqttConfigs = builder.build();
		this.mqttClient = new mqtt.MqttClient();
		this.mqttConnection = this.mqttClient.new_connection(mqttConfigs);
		return this.mqttConnection;
	}

	public async connect() {
		await this.mqttConnection?.connect();
	}

	public publishToMqtt(data: any) {
		this.mqttConnection?.publish(this.config?.connectionClientId + DEFAULT_MEASUREMENT_TOPIC,
			JSON.stringify(data),
			mqtt.QoS.AtLeastOnce).then((resp) => {
				console.log(resp);
				if (this.onMessageSentSuccess) {
					this.onMessageSentSuccess();
				}
			}).catch((error) => {
				if (this.onMessageSentFailed) {
					this.onMessageSentFailed(error);
				}
			});
	}

	public async disconnect() {
		await this.mqttConnection?.disconnect();
	}

	public setOnConnectListener(onConnect: Function) {
		this.mqttConnection?.on('connect', () => onConnect());
	}

	public setOnDisconnectListener(onDisconnect: Function) {
		this.mqttConnection?.on('disconnect', () => onDisconnect());
	}

	public setOnErrorListener(onError: Function) {
		this.mqttConnection?.on('error', (e) => onError(e));
	}

	public setOnMessageSentSuccessListener(onMessageSent: Function) {
		this.onMessageSentSuccess = onMessageSent;
	}

	public setOnMessageSentFailedListener(onMessageSentFailed: Function) {
		this.onMessageSentFailed = onMessageSentFailed;
	}
}

const mqttManager = new MQTTManager();

export default mqttManager;