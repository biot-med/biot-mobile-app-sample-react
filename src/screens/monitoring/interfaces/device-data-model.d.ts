export interface MQTTConnect {
	deviceId: string;
	sessionContext: string;
}

export type MQTTEvents = 'connected' | 'disconnected' | 'error' | 'message_sent' | 'message_failed';

export interface MQTTListenerMessage {
	event: MQTTEvents;
	payload?: any;
}