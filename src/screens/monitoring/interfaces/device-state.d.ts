import { BaseState } from "../../../store/common/interfaces/base";

export interface DeviceState extends BaseState {
	creds: DeviceTemporalCredentials | null;
	mqttConnection: boolean;
	deviceId: string | null;
	sessionContext: string | null;
}

export interface DeviceTemporalCredentials {
	endpoint: string;
	credentials: {
		accessKeyId: string;
		secretAccessKey: string;
		sessionToken: string;
		expiration: string;
	},
	connectionClientId: string;
}