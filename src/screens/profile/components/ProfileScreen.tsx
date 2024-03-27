import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ProfileProps } from '../interfaces/component-data-model';
import BaseContainer from '../../../components/base-container';
import { IconButton } from '../../../components/styled-button';
import { actions as AuthActions, selectors as AuthSelectors } from '../../../store/data/auth'
import { selectors as SettingsSelectors } from '../../../store/data/settings';
import { selectors as SessionSelectors } from '../../monitoring/store/data/session';
import { useAppDispatch, useAppSelector } from '../../../store';
import styles from './styles';

import LogoutIcon from '../../../assets/images/logout.svg';
import Toast from 'react-native-toast-message';

const ProfileScreen: React.FC<ProfileProps> = () => {

  const userInfo = useAppSelector(AuthSelectors.getUserInfo);
  const profile = useAppSelector(AuthSelectors.getProfile);
  const apiUrl = useAppSelector(SettingsSelectors.getApiUrl);
  const sessionStarted = useAppSelector(SessionSelectors.isSessionStarted);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const onLogoutPressed = () => {
    if (sessionStarted) {
      Toast.show({
        type: 'error',
        text1: t('active-session-exists'),
        text2: t('active-session-exists-stop')
      });
      return;
    }
    if (userInfo) {
      dispatch(AuthActions.logout({ refreshToken: userInfo?.refreshJwt.token }));
    }
    else {
      dispatch(AuthActions.cleanAuth());
    }
  }

  return (
    <BaseContainer edges={{ top: 'off' }}>
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.formContainer} behavior={"position"}>
          <Text style={styles.title}>{t("profile")}</Text>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>{t("api-url")}</Text>
            <Text>{apiUrl}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>{t("email")}</Text>
            <Text>{profile?.username}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>{t("id")}</Text>
            <Text>{profile?.id}</Text>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.footerContainer}>
          <IconButton icon={<LogoutIcon />} title={t("logout")} onPress={onLogoutPressed} />
        </View>
      </View>
    </BaseContainer>
  );
};

export default ProfileScreen;
