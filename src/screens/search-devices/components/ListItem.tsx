import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import { ListItemProps } from "../interfaces/component-data-model"

import BluetoothIcon from '../../../assets/images/bluetooth.svg'
import CaretRightIcon from '../../../assets/images/caret-right.svg'
import styles from "./styles"

const ListItem: React.FC<ListItemProps> = ({ item, onPress, loading }) => {
	
	const handleOnPress = () => {
		if (onPress) {
			onPress(item);
		}
	}

	return <TouchableOpacity key={item.id} onPress={handleOnPress}
		activeOpacity={0.8}
		style={styles.listItemContainer}>
		<View style={styles.listItemDetails}>
			<BluetoothIcon style={styles.listItemIcon} />
			<Text style={styles.listItemTitle}>{item.name}</Text>
		</View>
		{loading ? <ActivityIndicator style={styles.activityIndicator} /> : null} 
		<CaretRightIcon />
	</TouchableOpacity>
}

export default ListItem;

