import { useEffect, useRef, useState } from "react";
import { NativeStackHeaderProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native";

import { NavigationProps } from "../interfaces/component-data-model";
import { routes } from "../routes";
import LoginScreen from '../../screens/login';
import MonitoringScreen from "../../screens/monitoring";
import SignupScreen from "../../screens/signup";
import SearchDevicesScreen from "../../screens/search-devices";
import StopSessionScreen from "../../screens/stop-session";
import ProfileScreen from "../../screens/profile";
import TopBarNavigation from "./TopBarNavigation";
import { useAppSelector } from "../../store";

import ProfileIcon from '../../assets/images/profile.svg';
import LoadingScreen from "../../screens/loading";

const Stack = createNativeStackNavigator();

const NavProfileIcon = (
	<ProfileIcon height={25} />
)

const navHeader = (navProps: NativeStackHeaderProps) => {
	return (
		<TopBarNavigation
			hasBackButton={true}
			rightBarButtonIcon={NavProfileIcon}
			rightBarButtonAction={() => navProps.navigation.navigate(routes.Profile)}
			hasRightBarButton={true} />
	);
}

const navHeaderNoBack = (navProps: NativeStackHeaderProps) => {
	return (
		<TopBarNavigation
			rightBarButtonIcon={NavProfileIcon}
			rightBarButtonAction={() => navProps.navigation.navigate(routes.Profile)}
			hasRightBarButton={true} />
	);
}

const navHeaderNoProfile = (navProps: NativeStackHeaderProps) => {
	return (
		<TopBarNavigation hasBackButton={true} />
	);
}

const OnBoardingStack = (
	<>
		<Stack.Screen
			name={routes.Login}
			component={LoginScreen}
			options={{ headerShown: false, presentation: 'card' }} />
		<Stack.Screen
			name={routes.Signup}
			component={SignupScreen}
			options={{
				headerShown: true,
				header: navHeaderNoProfile
			}} />
		<Stack.Screen
			name={routes.SearchDevices}
			component={SearchDevicesScreen}
			options={{
				headerShown: true,
				header: navHeaderNoProfile
			}} />
		<Stack.Screen
			name={routes.Loading}
			component={LoadingScreen}
			options={{ headerShown: false }} />
	</>
);

const AppMainStack = (
	<>
		<Stack.Screen
			name={routes.Monitoring}
			component={MonitoringScreen}
			options={{
				headerShown: true,
				header: navHeaderNoBack
			}} />
		<Stack.Screen
			name={routes.StopSession}
			component={StopSessionScreen}
			options={{
				headerShown: true,
				header: navHeader
			}} />
		<Stack.Screen
			name={routes.Profile}
			component={ProfileScreen}
			options={{
				headerShown: true,
				header: navHeaderNoProfile
			}} />
	</>
);

const AppNavigation: React.FC<NavigationProps> = () => {
	const auth = useAppSelector(state => state.auth);
	const navigation = useRef<NavigationContainerRef<{}> | null>();

	useEffect(() => {
		if (navigation.current) {
			navigation.current.navigate(auth.initRoute as never);
		}
	}, [auth.initRoute]);

	return (
		<NavigationContainer ref={(r) => navigation.current = r}>
			<Stack.Navigator >
				{!auth.authenticated ? OnBoardingStack : null}
				{auth.authenticated ? AppMainStack : null}
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default AppNavigation;