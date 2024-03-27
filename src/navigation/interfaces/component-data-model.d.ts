export interface NavigationProps {}

export interface AppRoutes {
	Loading: string,
	Login: string,
	Signup: string,
	Profile: string,
	SearchDevices: string,
	Monitoring: string,
	StopSession: string
}

export interface TopBarNavigationProps {
	hasBackButton?: boolean;
	hasRightBarButton?: boolean;
	rightBarButtonAction?: Function;
	rightBarButtonIcon?: ReactNode
}
