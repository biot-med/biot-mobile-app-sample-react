import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { SettingsState } from "../interfaces/settings-state";
import { Settings } from "../../../local-storage/interfaces/local-storage-data-model";
import { RootState } from "../../../reducer";
import { getBaseStateSelector } from "../../../common/store-common";

export const STATE_NAME = 'settings';

const initialState: SettingsState = {
	apiUrl: '',
	email: '',
	loading: false,
	error: null,
	requestState: 'prepare',
	operation: null
};

const _loadSettings = (state: SettingsState) => {
	state.loading = true;
	state.error = null;
	state.operation = 'read';
	state.requestState = 'start';
}

const _loadSettingsSuccess = (state: SettingsState, {payload}: PayloadAction<Settings>) => {
	state.loading = false;
	state.error = null;
	state.operation = null;
	state.requestState = 'finish';
	state.apiUrl = payload.apiUrl;
}

const _saveSettings = (state: Settings, {payload}: PayloadAction<Settings>) => {
	state.apiUrl = payload.apiUrl;
}

const settings = createSlice({
	name: STATE_NAME,
	initialState: initialState,
	reducers: {
		loadSettings: _loadSettings,
		loadSettingsSuccess: _loadSettingsSuccess,
		saveSettings: _saveSettings
	},
  });
  
  export const { actions } = settings;

  const getState = (state: RootState): SettingsState => state[STATE_NAME] || initialState;

  export const selectors = {
	...getBaseStateSelector<SettingsState>(getState),
	getApiUrl: createSelector(getState, state => state.apiUrl),
	getEmail: createSelector(getState, state => state.email),
  }
  
  export const sagaSettingsActionConstants = {
	LOAD_SETTINGS: actions.loadSettings.type,
	SAVE_SETTINGS: actions.saveSettings.type
  };
  
  const { reducer } = settings;
  export default reducer;