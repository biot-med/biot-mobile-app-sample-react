import { StyleSheet } from "react-native";
import { Dimensions } from 'react-native';
import Theme from "../../../theme/theme";

const styles = StyleSheet.create({
	backgroundImage: {
		position: 'absolute',
		left: '50%',
		top: Dimensions.get('screen').height/4
	},
	titleContainer: {
		display: 'flex', 
		flexDirection: 'row', 
		alignItems: 'center'
	},
	activityIndicator: {
		paddingHorizontal: 10
	},
	title: {
		...Theme.textStyle.header,
		lineHeight: 24
	},
	subtitle: {
		...Theme.textStyle.body,
		lineHeight: 24
	},
	deviceList: {
		height: '87%',
		marginVertical: 25
	},
	listItemSeparator: {
		height: 2,
		backgroundColor: Theme.colors.secondary,
		paddingHorizontal: 10
	},
	listItemContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 15,
		paddingHorizontal: 12,
		backgroundColor: Theme.colors.buttonFocus,
		borderRadius: 4,
		borderColor: Theme.colors.secondary,
	},
	listItemDetails: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center'
	},
	listItemIcon: {
		paddingHorizontal: 12
	},
	listItemTitle: {
		...Theme.textStyle.title,
		paddingHorizontal: 20,
		maxWidth: '90%'
	}
});

export default styles;