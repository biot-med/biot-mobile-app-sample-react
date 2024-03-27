import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { MonitoringProps } from '../interfaces/component-data-model';
import BaseContainer from '../../../components/base-container';
import StyledTextInput from '../../../components/styled-textinput';
import StyledButton from '../../../components/styled-button';
import { routes } from '../../../navigation/routes';
import { useAppDispatch, useAppSelector } from '../../../store';
import { actions as SessionActions, selectors as SessionSelectors } from '../store/data/session'
import { actions as DeviceActions, selectors as DeviceSelectors } from '../store/data/device';
import { selectors as DevicesSelectors } from '../../search-devices/store/data/devices';
import styles from './styles';
import { ECGData } from '../interfaces/session-data.model';
import { generateDecimalTriangleWaveform } from '../../../utils/ecg-utils';
import PredefinedModal, { InfoPopupData } from '../../../components/styled-modal';

const MonitoringScreen: React.FC<MonitoringProps> = () => {

  const { t } = useTranslation();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const sessionRequestState = useAppSelector(SessionSelectors.getRequestState);
  const sessionStarted = useAppSelector(SessionSelectors.isSessionStarted);
  const sessionLoading = useAppSelector(SessionSelectors.isLoading);
  const sessionError = useAppSelector(SessionSelectors.getError);
  const deviceRequestState = useAppSelector(DeviceSelectors.getRequestState);
  const deviceOperation = useAppSelector(DeviceSelectors.getOperation);
  const auth = useAppSelector(state => state.auth);
  const device = useAppSelector(DevicesSelectors.getSelectedDevice);
  const [hr, setHr] = useState('');
  const [spo2, setSpo2] = useState('');
  const [infoPopupData, setInfoPopupData] = useState<InfoPopupData>({ show: false, title: '', body: '', modalType: 'info' });

  useEffect(() => {
    if (auth.userInfo && auth.userInfo.userId && device) {
      dispatch(SessionActions.fetchCurrentSession({
        deviceId: device.id,
        patientId: auth.userInfo.userId
      }))
    }
    return () => {
      dispatch(DeviceActions.disconnect());
      dispatch(SessionActions.cleanState());
    }
  }, []);

  useEffect(() => {
    if (deviceRequestState === 'finish' && deviceOperation === 'update') {
      Toast.show({
        type: 'success',
        text1: t('message-sent')
      });
    }
    else if (deviceRequestState === 'error') {
      Toast.show({
        type: 'error',
        text1: t('message-sent-error')
      });
    }
  }, [deviceRequestState, deviceOperation]);

  useEffect(() => {
    if (sessionRequestState === 'error') {
      setInfoPopupData({ show: true, title: t('error'), body: JSON.stringify(sessionError), modalType: 'error' })
    }
  }, [sessionRequestState]);

  const handleStartSession = () => {
    if (auth.userInfo && auth.userInfo.userId && device) {

      dispatch(SessionActions.startSession({
        deviceId: device.id,
        patientId: auth.userInfo.userId
      }));
    }
  }

  const sendHrData = () => {
    let payload: any = {}
    if (!hr) {
      Toast.show({
        type: 'error',
        text1: t('input-error'),
        text2: t('hr-input-error-message')
      });
      return;
    }
    payload['hr'] = parseInt(hr);
    dispatch(DeviceActions.sendData(payload));
  }

  const sendHrAndSpo2Data = () => {
    let payload: any = {}
    if (!hr || !spo2) {
      Toast.show({
        type: 'error',
        text1: t('input-error'),
        text2: t('hr-spo2-input-error-message')
      });
      return;
    }
    payload['hr'] = parseInt(hr);
    payload['spo2'] = parseFloat(spo2);
    dispatch(DeviceActions.sendData(payload));
  }

  const sendECGSample = () => {
    const waveformBase64 = generateDecimalTriangleWaveform(1, 100);
    const payload: ECGData = {
      frequency: 100,
      size: 100,
      ecg: waveformBase64
    }
    dispatch(DeviceActions.sendEcg(payload));
  }

  const handleStopSession = () => {
    navigation.navigate({ name: routes.StopSession, params: { device: device } } as never);
  }

  return (
    <BaseContainer edges={{ top: 'off' }}>
      <View style={styles.container}>
        <Text style={styles.deviceName}>Device: {device?.name}</Text>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{t('monitoring')}</Text>
        </View>
        <Text style={styles.subtitle}>{sessionStarted ?
          t('session-started') : t('start-your-session')}</Text>
        <View style={styles.textInputContainer}>
          <StyledTextInput
            value={hr}
            onChangeText={setHr}
            editable={sessionStarted}
            containerStyle={{ flex: 1 }}
            title={t("hr")}
            placeholder={'0'}
            keyboardType={"number-pad"} />
          <StyledTextInput
            value={spo2}
            onChangeText={setSpo2}
            editable={sessionStarted}
            containerStyle={{ flex: 1 }}
            title={t("spo2")}
            placeholder={'0.0'}
            keyboardType={"numeric"} />
        </View>
        <View style={styles.actionButtonsContainer}>
          <StyledButton
            onPress={sendHrData}
            disabled={!sessionStarted}
            title={t('send-hr')} />
          <StyledButton
            onPress={sendHrAndSpo2Data}
            disabled={!sessionStarted}
            title={t('send-hr-and-spo2')} />
          <StyledButton
            onPress={sendECGSample}
            disabled={!sessionStarted}
            title={t('send-ecg')} />
        </View>
        <View style={styles.footerContainer}>
          {sessionStarted ?
            <StyledButton title={t('stop-session')}
              onPress={handleStopSession} /> :
            <StyledButton title={t('start-session')}
              loading={sessionLoading}
              onPress={handleStartSession} />}
        </View>
      </View>
      <PredefinedModal
        isVisible={infoPopupData.show}
        title={infoPopupData.title} body={infoPopupData.body}
        modalType={infoPopupData.modalType}
        actionButtonTitle={t('ok')}
        actionButtonPressed={() => {
          setInfoPopupData({ show: false, title: '', body: '', modalType: 'info' });
          dispatch(SessionActions.cleanError());
        }} />
    </BaseContainer>
  );
};

export default MonitoringScreen;
