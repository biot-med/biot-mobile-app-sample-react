import { StyleSheet } from "react-native";
import Theme from "../../../theme/theme";

const styles = StyleSheet.create({
	container: {
		marginVertical: 6,
	},
	titleContainer: {
		display: 'flex', 
		flexDirection: 'row', 
		width: '100%', 
		justifyContent: 'flex-start', 
		alignItems: 'center'
	},
	title: {
		...Theme.textStyle.title,
		color: Theme.colors.title, 
		lineHeight: 24,
		marginVertical: 4
	},
	infoIcon: {
		paddingHorizontal: 5
	},
	input: {
		backgroundColor: Theme.colors.secondary,
		borderColor: Theme.colors.border,
		borderWidth: 1,
		borderRadius: 6,
		paddingHorizontal: 12,
		paddingVertical: 10
	},
	inputFocused: {
		borderColor: Theme.colors.fieldFocus,
	},
	passwordInput: {
		paddingVertical: 10,
		paddingHorizontal: 12,
		paddingEnd: 30
	},
	reviewPasswordButton: {
		position: 'absolute', 
		right: 12, 
		top: '60%'
	}
});

export default styles;