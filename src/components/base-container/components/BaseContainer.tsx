import React from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BaseContainerProps from "../interfaces/component-data-model";
import styles from "./styles";

const BaseContainer: React.FC<BaseContainerProps> = ({ children, ...viewProps }) => {

	const onPress = () => {
		Keyboard.dismiss()
	}

	return (
		<SafeAreaView style={styles.container} {...viewProps}>
			<TouchableWithoutFeedback onPress={onPress} accessible={false}>
				<View style={styles.childrenContainer}>
					{children}
				</View>
			</TouchableWithoutFeedback>
		</SafeAreaView>
	)
}

export default BaseContainer;