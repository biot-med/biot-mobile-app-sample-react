import { StyleSheet } from "react-native";
import Theme from "../../../theme/theme";

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-around',
		backgroundColor: Theme.colors.secondary
	},
	formContainer: {
		justifyContent: 'space-around', 
	},
	title: {
		...Theme.textStyle.header,
		paddingVertical: 10
	},
	subtitle: {
		...Theme.textStyle.body,
		fontSize: 14
	},
	footerContainer: {
		marginVertical: '10%', 
	}
});

export default styles;