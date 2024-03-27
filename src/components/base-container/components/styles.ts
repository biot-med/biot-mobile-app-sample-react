import { StyleSheet } from "react-native";
import Theme from "../../../theme/theme";

const styles = StyleSheet.create({
	container: {
		height: '100%',
		backgroundColor: Theme.colors.secondary
	},
	childrenContainer: {
		paddingHorizontal: 30
	}
});

export default styles;