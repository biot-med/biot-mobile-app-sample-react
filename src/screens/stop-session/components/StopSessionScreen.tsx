import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { StopSessionProps } from '../interfaces/component-data-model';
import BaseContainer from '../../../components/base-container';
import styles from './styles';
import StyledTextInput from '../../../components/styled-textinput';
import StyledButton from '../../../components/styled-button';
import { useAppDispatch, useAppSelector } from '../../../store';
import { actions as SessionActions, selectors as SessionSelectors } from '../../monitoring/store/data/session';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import PredefineddModal, { InfoPopupData } from '../../../components/styled-modal';

const StopSessionScreen: React.FC<StopSessionProps> = ({ route }) => {
  const device = route.params.device;

  const navigation = useNavigation();
  const { t } = useTranslation();
  const [avgHR, setAvgHr] = useState('');
  const dispatch = useAppDispatch();
  const sessionStarted = useAppSelector(SessionSelectors.isSessionStarted);
  const sessionLoading = useAppSelector(SessionSelectors.isLoading);
  const sessionError = useAppSelector(SessionSelectors.getError);

  const [infoPopupData, setInfoPopupData] = useState<InfoPopupData>({ show: false, title: '', body: '', modalType: 'error' });

  useEffect(() => {
    if (!sessionStarted) {
      navigation.goBack();
    }
  }, [sessionStarted]);

  useEffect(() => {
    if (sessionError) {
      setInfoPopupData({ show: true, title: t('error'), body: JSON.stringify(sessionError), modalType: 'error' })
    }
  }, [sessionError]);

  const onStopPressed = () => {
    if (!avgHR) {
      Toast.show({
        type: 'error',
        text1: t('input-error'),
        text2: t('avg-hr-input-error-message')
      });
      return;
    }
    dispatch(SessionActions.stopSession({ avgHR: parseInt(avgHR) }));
  }

  return (
    <BaseContainer edges={{ top: 'off' }}>
      <View style={styles.container}>
        <Text style={styles.deviceName}>Device: {device?.name}</Text>
        <Text style={styles.title}>{t('end-session')}</Text>
        <View style={styles.textInputContainer}>
          <StyledTextInput
            value={avgHR}
            onChangeText={(text) => setAvgHr(text)}
            containerStyle={{ flex: 1 }}
            inputStyle={{ width: '50%' }}
            title={t("session-summary")}
            placeholder={'0'}
            keyboardType={"number-pad"} />
        </View>
        <View style={styles.footerContainer}>
          <StyledButton title={t('stop')}
            loading={sessionLoading}
            onPress={onStopPressed} />
        </View>
      </View>
      <PredefineddModal
        isVisible={infoPopupData.show}
        title={infoPopupData.title} body={infoPopupData.body}
        modalType={infoPopupData.modalType}
        actionButtonTitle={t('ok')}
        actionButtonPressed={() => {
          setInfoPopupData({ show: false, title: '', body: '', modalType: 'error' })
          dispatch(SessionActions.cleanError());
        }} />
    </BaseContainer>
  );
};

export default StopSessionScreen;
