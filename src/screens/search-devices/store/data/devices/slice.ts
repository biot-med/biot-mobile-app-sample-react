import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { Device, DevicesState } from "../../../interfaces/devices-state";
import { RootState } from "../../../../../store/reducer";
import { getBaseStateSelector } from "../../../../../store/common/store-common";
import { BiotError } from "../../../../../@biotmed/common/api-common";

export const STATE_NAME = 'devices';

const initialState: DevicesState = {
	devices: [],
	selectedDevice: null,
	loading: false,
	assingLoading: false,
	error: null,
	requestState: 'prepare',
	operation: null,
};

const _loadDevices = (state: DevicesState) => {
	state.loading = true;
}

const _selectDevice = (state: DevicesState, { payload }: PayloadAction<Device>) => {
	state.selectedDevice = payload;
}

const _devicesLoaded = (state: DevicesState, { payload }: PayloadAction<Device[]>) => {
	state.loading = false;
	state.devices = payload;
}

const _assignDevice = (state: DevicesState, {payload}: PayloadAction<string>) => {
	state.assingLoading = true;
	state.requestState = 'start';
}

const _assignDeviceFailed = (state: DevicesState, { payload }: PayloadAction<BiotError>) => {
	state.assingLoading = false;
	state.requestState = 'error';
	state.selectedDevice = null;
	state.error = payload;
}

const _assignDeviceSuccess = (state: DevicesState) => {
	state.assingLoading = false;
	state.requestState = 'finish';
}

const _cleanDevices = (state: DevicesState) => {
	state.devices = [];
}

const devices = createSlice({
	name: STATE_NAME,
	initialState: initialState,
	reducers: {
		loadDevices: _loadDevices,
		devicesLoaded: _devicesLoaded,
		assignDevice: _assignDevice,
		assignDeviceFailed: _assignDeviceFailed,
		assignDeviceSuccess: _assignDeviceSuccess,
		selectDevice: _selectDevice,
		cleanDevices: _cleanDevices
	},
});

export const { actions } = devices;

const getState = (state: RootState): DevicesState => state[STATE_NAME] || initialState;

export const selectors = {
  ...getBaseStateSelector<DevicesState>(getState),
  getDevices: createSelector(getState, state => state.devices),
  getSelectedDevice: createSelector(getState, state => state.selectedDevice),
  isAssigningDevice: createSelector(getState, state => state.assingLoading)
}

export const sagaDevicesActionConstants = {
	FETCH_DEVICES: actions.loadDevices.type,
	ASSIGN_DEVICE: actions.assignDevice.type,
};

const { reducer } = devices;
export default reducer;