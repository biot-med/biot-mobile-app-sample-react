import { Dimensions, Platform, StyleSheet } from "react-native";
import Theme from "../../../theme/theme";

export const LOGO_HEIGHT = 72;
const isAndroid = Platform.OS === 'android';

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
	logo: {
		alignSelf: 'center', 
		marginTop: '15%'
	},
	title: {
		...Theme.textStyle.header,
		paddingVertical: '4%'
	},
	footerContainer: {
	},
	signupContainer: {
		justifyContent: 'center', 
		display: 'flex', 
		alignItems: 'center', 
		flexDirection: 'row', 
		paddingVertical: 20
	}
});

export default styles;