import React from "react";
import StyledButtonProps from "../interfaces/component-data-model";
import { ActivityIndicator, GestureResponderEvent, Text, TouchableOpacity } from "react-native";
import styles from "./styles";

const StyledButton: React.FC<StyledButtonProps> = ({ title, containerStyle, loading, ...touchableProps }) => {

	const onPressHandle = (event: GestureResponderEvent) => {
		if (touchableProps.onPress) {
			touchableProps.onPress(event);
		}
	}

	return (
		<TouchableOpacity {...touchableProps}
			onPress={onPressHandle}
			style={[
				styles.button,
				containerStyle,
				touchableProps.disabled ? styles.buttonDisabled : null
			]}
			disabled={touchableProps.disabled}>
			<Text style={styles.buttonTitle}>{title}</Text>
			{loading ? <ActivityIndicator style={styles.activityIndicator} color={'white'} /> : null}
		</TouchableOpacity>
	)
}

export default StyledButton;