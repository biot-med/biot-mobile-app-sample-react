import { BaseState } from "../../../store/common/interfaces/base";

export interface SessionState extends BaseState {
	sessionId?: string | null;
	sessionContext?: string | null; 
	sessionStarted: boolean;
	deviceId?: string | null;
	patientId?: string | null;
}