import React, { useEffect, useRef } from "react";
import SplashScreen from "react-native-splash-screen";
import { useDispatch } from "react-redux";
import { AppState } from "react-native";
import Toast from "react-native-toast-message";

import AppNavigation from "../navigation";
import { useAppSelector } from "../store";
import { actions as AuthActions, selectors as AuthSelectors } from '../store/data/auth';
import { actions as SettingsActions, selectors as SettingsSelectors } from '../store/data/settings'
import { actions as DeviceActions } from '../screens/monitoring/store/data/device';
import { selectors as SessionSelectors } from '../screens/monitoring/store/data/session';

const AppManager = () => {
	const authRequestState = useAppSelector(AuthSelectors.getRequestState);
	const settingsRequestState = useAppSelector(SettingsSelectors.getRequestState);
	const sessionContext = useAppSelector(SessionSelectors.getSessionContext);
	const deviceId = useAppSelector(SessionSelectors.getDeviceId);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(SettingsActions.loadSettings());
		const subscription = AppState.addEventListener('change', nextAppState => {
			if (nextAppState.match(/inactive|background/)) {
				dispatch(DeviceActions.disconnect());
			}
			else if (nextAppState == 'active') {
				if (sessionContext && deviceId) {
					dispatch(DeviceActions.connectToMqtt({
						sessionContext: sessionContext,
						deviceId: deviceId
					}));
				}
			}
		});
		return () => {
			subscription.remove();
		}
	}, []);

	useEffect(() => {
		if (settingsRequestState === 'finish') {
			dispatch(AuthActions.authCheck());
		}
	}, [settingsRequestState]);

	useEffect(() => {
		if (settingsRequestState === 'finish' || settingsRequestState === 'error') {
			SplashScreen.hide();
		}
	}, [authRequestState]);

	return (
		<>
			<AppNavigation />
			<Toast />
		</>
	);
}

export default AppManager;

