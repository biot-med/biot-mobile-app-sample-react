import { BaseState } from "../../../store/common/interfaces/base";

export interface DevicesState extends BaseState {
	devices: Device[];
	selectedDevice: Device | null;
	assingLoading: boolean;
}

export interface Device {
	id: string;
	name: string;
}