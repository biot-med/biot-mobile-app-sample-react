import React from 'react';
import BaseContainer from '../../../components/base-container';
import BiotLogo from '../../../assets/logos/biot-logo.svg';
import { ActivityIndicator } from 'react-native';
import styles from './styles';

const LoadingScreen: React.FC<{}> = () => {
	return (
		<BaseContainer style={styles.container}>
			<BiotLogo height={78} width={146}/>
			<ActivityIndicator/>
		</BaseContainer>
	);
}

export default LoadingScreen;