import { Platform, StyleSheet } from "react-native";
import Theme from "../../theme/theme";

const isAndroid = Platform.OS === 'android';

const styles = StyleSheet.create({
	container: {
		display: "flex",
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: Theme.colors.secondary,
		paddingHorizontal: 30,
		paddingVertical: isAndroid ? 25 : 10
	},
	contentContainer: {
		flex: 2,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
});

export default styles;