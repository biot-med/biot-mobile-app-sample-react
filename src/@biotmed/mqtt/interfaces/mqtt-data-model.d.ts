export interface MQTTConnectionConfig {
	endpoint: string;
	credentials: {
		accessKeyId: string;
		secretAccessKey: string;
		sessionToken: string;
		expiration: string;
	}
	connectionClientId: string;
}