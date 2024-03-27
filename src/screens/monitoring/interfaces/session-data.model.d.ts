export interface SessionStart {
	deviceId: string;
	patientId: string;
}

export interface SessionData {
	hr?: number;
	spo2?: number;
}

export interface ECGData {
	ecg: string;
	frequency: number;
	size: number;
}

export interface SessionStop {
	avgHR?: number;
}
export interface CreateSessionResponse {
	_id: string;
	_sessionContext: string;
}
