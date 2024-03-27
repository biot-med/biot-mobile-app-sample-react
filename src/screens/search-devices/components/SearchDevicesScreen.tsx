import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { SearchDevicesProps } from '../interfaces/component-data-model';
import BaseContainer from '../../../components/base-container';
import styles from './styles';

import ListItemSeperator from './ListItemSeperator';
import ListItem from './ListItem';
import { actions as DevicesActions, selectors as DevicesSelectors } from '../store/data/devices';
import { actions as AuthActions, selectors as AuthSelectors } from '../../../store/data/auth';
import { useAppDispatch, useAppSelector } from '../../../store';
import BluetoothBgIcon from '../../../assets/images/bluetooth-bg.svg';
import Toast from 'react-native-toast-message';
import PredefineddModal, { InfoPopupData } from '../../../components/styled-modal';

const SearchDevicesScreen: React.FC<SearchDevicesProps> = ({ route }) => {
  const signupForm = route.params.signupForm;
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const devices = useAppSelector(DevicesSelectors.getDevices);
  const devicesLoading = useAppSelector(DevicesSelectors.isLoading);
  const deviceAssigning = useAppSelector(DevicesSelectors.isAssigningDevice);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const authOperation = useAppSelector(AuthSelectors.getOperation);
  const authRequestState = useAppSelector(AuthSelectors.getRequestState);
  const authLoading = useAppSelector(AuthSelectors.isLoading);
  const authError = useAppSelector(AuthSelectors.getError);

  const [infoPopupData, setInfoPopupData] = useState<InfoPopupData>({ show: false, title: '', body: '', modalType: 'info' });

  useEffect(() => {
    dispatch(DevicesActions.loadDevices());
    return ()=> {
      dispatch(DevicesActions.cleanDevices());
      dispatch(AuthActions.cleanError());
    }
  }, []);

  useEffect(() => {
    if (authRequestState === 'finish' && signupForm) {
      dispatch(AuthActions.login({
        email: signupForm.username, 
        password: signupForm.password,
        isAfterSignup: true
      }));
    }
    else if (authRequestState === 'error') {
      setInfoPopupData({ show: true, title: t('signup-faild'), body: authError ? JSON.stringify(authError) : t('signup-faild-message'), modalType: 'error' });
    }
  }, [authOperation, authRequestState]);

  const onItemPress = (item: any, index: number) => {
    console.log(signupForm);
    
    if (!deviceAssigning && signupForm) {
      setSelectedIndex(index);
      dispatch(DevicesActions.selectDevice(item));
      dispatch(AuthActions.signup(signupForm));
      Toast.show({
        type: 'info',
        text1: t('signup-patient'),
        text2: t('assigning-device')
      });
    }
  }

  return (
    <BaseContainer>
      <BluetoothBgIcon style={[styles.backgroundImage]} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{devicesLoading ? t('searching-for-devices') : t('devices')}</Text>
        {devicesLoading ? <ActivityIndicator style={styles.activityIndicator} /> : null}
      </View>
      <Text style={styles.subtitle}>{t('searching-for-devices-subtitle')}</Text>
      <FlatList
        style={styles.deviceList}
        data={devices}
        ItemSeparatorComponent={ListItemSeperator}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => {
          return <ListItem item={item}
            onPress={() => onItemPress(item, index)}
            loading={index === selectedIndex && authLoading} />
        }}
      />
      <PredefineddModal
        isVisible={infoPopupData.show}
        title={infoPopupData.title} body={infoPopupData.body}
        modalType={infoPopupData.modalType}
        actionButtonTitle={t('ok')}
        actionButtonPressed={() => setInfoPopupData({ show: false, title: '', body: '', modalType: 'info' })} />
    </BaseContainer>
  );
};

export default SearchDevicesScreen;
