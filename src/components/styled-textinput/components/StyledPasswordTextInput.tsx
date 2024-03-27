import React, { useRef, useState } from "react";
import { NativeSyntheticEvent, Text, TextInput, TextInputFocusEventData, View } from "react-native";

import StyledTextInputProps from "../interfaces/component-data-model";
import styles from "./styles";
import ShowPassIcon from '../../../assets/images/show-pass.svg';
import HidePassIcon from '../../../assets/images/hide-pass.svg';

const StyledPasswordTextInput: React.FC<StyledTextInputProps> = ({ title, containerStyle, titleStyle, inputStyle, ...textInputProps }) => {
	const [inputFocused, setInputFocus] = useState(false);
	const [isSecure, setSecure] = useState(true);
	const fieldRef = useRef<TextInput | null>();

	const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
		setInputFocus(true);
		if (textInputProps.onFocus) {
			textInputProps.onFocus(e, fieldRef.current);
		}
	}

	const handleBlur = () => setInputFocus(false);

	return (
		<View style={[styles.container, containerStyle]}>
			<Text style={[styles.title, titleStyle]}>{title}</Text>
			<TextInput
				ref={(r) => fieldRef.current = r}
				{...textInputProps}
				style={[
					styles.input,
					styles.passwordInput,
					(inputFocused ? styles.inputFocused : {}),
					inputStyle
				]}
				secureTextEntry={isSecure}
				onBlur={handleBlur}
				onFocus={handleFocus}></TextInput>
			{isSecure ?
				<HidePassIcon style={styles.reviewPasswordButton} onPress={() => setSecure(false)} /> :
				<ShowPassIcon style={styles.reviewPasswordButton} onPress={() => setSecure(true)} />}
		</View>
	)
}

export default StyledPasswordTextInput;