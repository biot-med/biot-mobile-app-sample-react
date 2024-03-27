import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { TopBarNavigationProps } from "../interfaces/component-data-model"
import { IconButton } from "../../components/styled-button";
import styles from "./styles";

import CaretLeftIcon from '../../assets/images/caret-left.svg';
import BiotLogo from '../../assets/logos/biot-logo.svg';

const TopBarNavigation: React.FC<TopBarNavigationProps> = ({ hasBackButton, hasRightBarButton, rightBarButtonAction, rightBarButtonIcon }) => {
	const navigation = useNavigation();

	const goBack = () => {
		if (navigation.canGoBack()) {
			navigation.goBack();
		}
	}

	const rightBarButtonActionHandler = () => {
		if (rightBarButtonAction) {
			rightBarButtonAction();
		}
	}

	return (
		<SafeAreaView style={styles.container} edges={{ top: 'additive' }}>
			{navigation.canGoBack() && hasBackButton ?
				<IconButton icon={<CaretLeftIcon />} onPress={goBack} containerStyle={{ flex: 1 }} />
				: null}
			<View style={styles.contentContainer}>
				<BiotLogo height={40} width={95} />
				{hasRightBarButton ?
					<IconButton icon={rightBarButtonIcon} onPress={rightBarButtonActionHandler} />
					: null}
			</View>
		</SafeAreaView>
	);
}
export default TopBarNavigation;