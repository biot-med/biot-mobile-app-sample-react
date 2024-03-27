import { StyleSheet } from "react-native";
import Theme from "../../../theme/theme";

const styles = StyleSheet.create({
	container: {
		backgroundColor: Theme.colors.secondary,
		borderRadius: 25,
	},
	header: {
		flexDirection: 'row',
		alignItems: "center",
		justifyContent: "center",
	},
	icon: {
		paddingTop: 10,
		paddingHorizontal: 5
	},
	text: {
		...Theme.textStyle.header,
		paddingTop: 10,
		paddingRight: 15,
		textAlign: "center",
		fontSize: 24,
	},
	body: {
		...Theme.textStyle.caption,
		justifyContent: "center",
		paddingHorizontal: 15,
		minHeight: 100,
	},
	actionButtonStyle: {
		color: Theme.colors.primary
	},
	footer: {
		justifyContent: "center",
		alignItems: "center",
		padding: 10,
		flexDirection: "row",
	},
});

export default styles;