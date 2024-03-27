import { StyleSheet } from "react-native";
import Theme from "../../../theme/theme";

const styles = StyleSheet.create({
	button: {
		backgroundColor: Theme.colors.primary, 
		paddingVertical: 14,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		minHeight: 52
	},
	buttonDisabled: {
		backgroundColor: Theme.colors.disable, 
	},
	buttonTitle: {
		...Theme.textStyle.caption,
		color: Theme.colors.secondary
	},
	linkButton: {
		...Theme.textStyle.title,
		fontSize: 12,
		color: Theme.colors.placeholder, 
		lineHeight: 16,
	},
	iconButton: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	iconButtonTitle: {
		...Theme.textStyle.caption,
		paddingHorizontal: 5
	},
	activityIndicator: {
		paddingHorizontal: 10,
	},
});

export default styles;