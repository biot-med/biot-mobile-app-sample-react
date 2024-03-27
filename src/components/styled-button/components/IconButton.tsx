import React from "react";
import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";

import { IconButtonProps } from "../interfaces/component-data-model";
import styles from "./styles";

const IconButton: React.FC<IconButtonProps> = ({ icon, title, containerStyle, ...touchableProps }) => {

	const onPressHandle = (event: GestureResponderEvent) => {
		if (touchableProps.onPress) {
			touchableProps.onPress(event);
		}
	}

	return (
		<TouchableOpacity {...touchableProps}
			onPress={onPressHandle}
			style={[containerStyle, styles.iconButton]}>
			{icon}
			{title ? <Text style={styles.iconButtonTitle}>{title}</Text> : null}
		</TouchableOpacity>
	)
}

export default IconButton;