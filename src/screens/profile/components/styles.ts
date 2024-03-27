import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import Theme from "../../../theme/theme";

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		height: '100%',
		backgroundColor: Theme.colors.secondary
	},
	formContainer: {
		justifyContent: 'space-around', 
	},
	title: {
		...Theme.textStyle.header,
		paddingVertical: 20
	},
	fieldContainer: {
		marginBottom: 15
	},
	fieldTitle: {
		...Theme.textStyle.caption,
		marginBottom: 7
	},
	saveButton: {
		paddingVertical: 10
	},
	footerContainer: {
		marginBottom: '15%', 
	}
});

export default styles;