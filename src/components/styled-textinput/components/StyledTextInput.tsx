import React, { useRef, useState } from "react";
import { NativeSyntheticEvent, Text, TextInput, TextInputFocusEventData, TouchableOpacity, View } from "react-native";
import StyledTextInputProps from "../interfaces/component-data-model";
import styles from "./styles";

import InfoIcon from '../../../assets/images/info.svg';

const StyledTextInput: React.FC<StyledTextInputProps> = ({ title, containerStyle, titleStyle, inputStyle, hasInfoButton, onInfoButtonPressed, ...textInputProps }) => {
	const [inputFocused, setInputFocus] = useState(false);
	const fieldRef = useRef<TextInput | null>();

	const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setInputFocus(true)
		if (textInputProps.onFocus) {
			textInputProps.onFocus(e, fieldRef.current);
		}
	};

	const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setInputFocus(false);
		if (textInputProps.onBlur) {
			textInputProps.onBlur(e);
		}
	};

	const handleOnInfoPressed = () => {
		if (onInfoButtonPressed) {
			onInfoButtonPressed();
		}
	}

	return (
		<View style={[styles.container, containerStyle]}>
			<View style={styles.titleContainer}>
				<Text style={[styles.title, titleStyle]}>{title}</Text>
				{hasInfoButton ? <TouchableOpacity
					style={styles.infoIcon}
					onPress={handleOnInfoPressed}>
					<InfoIcon  height={20}/>
				</TouchableOpacity> : null}
			</View>
			<TextInput ref={(r) => fieldRef.current = r}
				{...textInputProps}
				style={[
					styles.input,
					(inputFocused ? styles.inputFocused : {}),
					inputStyle
				]}
				onBlur={handleBlur}
				onFocus={handleFocus}></TextInput>
		</View>
	)
}

export default StyledTextInput;