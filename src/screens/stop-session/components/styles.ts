import { StyleSheet } from "react-native";
import Theme from "../../../theme/theme";

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		height: '100%',
		backgroundColor: Theme.colors.secondary
	},
	activityIndicator: {
		paddingHorizontal: 10
	},
	deviceName: {
		...Theme.textStyle.caption,
		textAlign: 'center',
		paddingVertical: 20
	},
	title: {
		...Theme.textStyle.header,
		lineHeight: 24
	},
	subtitle: {
		...Theme.textStyle.body,
		lineHeight: 24
	},
	textInputContainer: {
		display: 'flex', 
		flexDirection: 'row', 
		justifyContent: 'space-between', 
	},
	footerContainer: {
		flex: 1, 
		justifyContent: 'flex-end', 
		paddingBottom: "15%"
	}
});

export default styles;