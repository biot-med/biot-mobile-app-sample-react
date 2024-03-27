import { KeyboardTypeOptions, StyleProp, TextInputProps, ViewStyle } from "react-native";

interface StyledTextInputProps extends TextInputProps {
	title: string;
	containerStyle?: StyleProp<ViewStyle>;
	titleStyle?: StyleProp<TextStyle>;
	inputStyle?: StyleProp<TextStyle>;
	onFocus?: Function;
	hasInfoButton?: boolean; 
	onInfoButtonPressed?: Function;
}

export default StyledTextInputProps;