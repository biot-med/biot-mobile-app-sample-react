import React from "react";
import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";

import { LinkButtonProps } from "../interfaces/component-data-model";
import styles from "./styles";

const LinkButton: React.FC<LinkButtonProps> = ({ title, style, containerStyle, ...touchableProps }) => {

	const onPressHandle = (event: GestureResponderEvent) => {
		if (touchableProps.onPress) {
			touchableProps.onPress(event);
		}
	}

	return (
		<TouchableOpacity {...touchableProps}
			onPress={onPressHandle}
			style={containerStyle}>
			<Text style={[styles.linkButton, style]}>{title}</Text>
		</TouchableOpacity>
	)
}

export default LinkButton;