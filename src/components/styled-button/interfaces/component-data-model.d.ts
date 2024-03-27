import { ReactNode } from "react";
import { DimensionValue, StyleProp, TouchableOpacityProps, ViewStyle } from "react-native";

interface StyledButtonProps extends TouchableOpacityProps {
	title: string;
	containerStyle?: ViewStyle;
	loading?: boolean;
}

export interface LinkButtonProps extends StyledButtonProps {
	style?: {
		fontFamily?: string
		fontSize?: number,
		color?: string
	}
}

export interface IconButtonProps extends StyledButtonProps {
	title?: string;
	icon: ReactNode,
}

export default StyledButtonProps;