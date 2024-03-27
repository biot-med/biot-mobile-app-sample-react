import React, { useEffect, useRef, useState } from 'react';
import { NativeSyntheticEvent, Text, TextInput, TextInputFocusEventData, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import { LoginProps } from '../interfaces/component-data-model';
import StyledTextInput, { StyledPasswordTextInput } from '../../../components/styled-textinput';
import StyledButton, { LinkButton } from '../../../components/styled-button';
import BaseContainer, { KeyboardAvoidScrollView } from '../../../components/base-container';
import { routes } from '../../../navigation/routes';
import Theme from '../../../theme/theme';
import styles, { LOGO_HEIGHT } from './styles';
import PredefineddModal, { InfoPopupData } from '../../../components/styled-modal';
import { useAppDispatch, useAppSelector } from '../../../store';
import { actions as SettingsActions, selectors as SettingsSelectors } from '../../../store/data/settings';
import { actions as AuthActions, selectors as AuthSelectors } from '../../../store/data/auth';

import BiotLogo from '../../../assets/logos/biot-logo.svg'

const LoginScreen: React.FC<LoginProps> = ({ }) => {

  const apiUrl = useAppSelector(SettingsSelectors.getApiUrl);
  const authRequestState = useAppSelector(AuthSelectors.getRequestState);
  const authError = useAppSelector(AuthSelectors.getError);
  const authLoading = useAppSelector(AuthSelectors.isLoading);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const viewRef = useRef<View | null>();
  const focusedFieldRef = useRef<any>();

  const [topOffset, setTopOffset] = useState(0);
  const [loginForm, setLoginForm] = useState({ apiUrl: '', email: '', password: '' });
  const [infoPopupData, setInfoPopupData] = useState<InfoPopupData>({ show: false, title: '', body: '', modalType: 'info' });

  useEffect(() => {
    if (apiUrl) {
      setLoginForm({ ...loginForm, apiUrl: apiUrl });
    }
  }, [apiUrl]);

  useEffect(()=> {
    if (authError && authRequestState === 'error') {
      if(authError.code === 'app') {
        setInfoPopupData({ show: true, title: t('error'), body: t(authError.message!), modalType: 'error' })
      }
      else {
        setInfoPopupData({ show: true, title: t('error'), body: JSON.stringify(authError), modalType: 'error' })
      }
    } 
  }, [authError]);

  const goToSignup = () => {
    navigation.navigate(routes.Signup as never);
  }

  const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>, inputRef: TextInput) => {
    focusedFieldRef.current = inputRef;
  }

  const apiUrlOnBlur = () => {
    dispatch(SettingsActions.saveSettings({ apiUrl: loginForm.apiUrl }));
  }

  const textInputInfoButtonPress = (title: string, body: string) => {
    setInfoPopupData({ show: true, title: title, body: body, modalType: 'info' });
  }

  const onValueChanged = (value: string, key: string) => {
    setLoginForm({ ...loginForm, [key]: value });
  }

  const onLoginPressed = () => {
    dispatch(AuthActions.login({...loginForm, isAfterSignup: false}));
  }

  return (
    <BaseContainer>
      <BiotLogo height={LOGO_HEIGHT} style={styles.logo} />
      <KeyboardAvoidScrollView focusedFieldRef={focusedFieldRef} topInset={topOffset} style={{ backgroundColor: Theme.colors.secondary }}>
        <View ref={(r) => viewRef.current = r}
          style={styles.formContainer}
          onLayout={() => {
            if (viewRef.current) {
              viewRef.current.measure((x: number, y: number, w: number, h: number, px: number, py: number) => {
                setTopOffset(py);
              })
            }
          }}>
          <Text style={styles.title}>{t("login")}</Text>
          <StyledTextInput
            value={loginForm.apiUrl}
            onChangeText={(text) => onValueChanged(text, 'apiUrl')}
            onFocus={onFocus}
            onBlur={apiUrlOnBlur}
            editable={!authLoading}
            title={t("api-url")}
            placeholder={t("api-url")}
            keyboardType={"url"}
            hasInfoButton={true}
            autoCapitalize={'none'}
            onInfoButtonPressed={() => textInputInfoButtonPress(t('info'), t('api-url-info'))} />
          <StyledTextInput
            value={loginForm.email}
            onChangeText={(text) => onValueChanged(text, 'email')}
            onFocus={onFocus}
            editable={!authLoading}
            title={t("email")}
            placeholder={t("email")}
            autoCapitalize={'none'}
            keyboardType={"email-address"} />
          <StyledPasswordTextInput
            value={loginForm.password}
            onChangeText={(text) => onValueChanged(text, 'password')}
            onFocus={onFocus}
            editable={!authLoading}
            title={t("password")}
            autoCapitalize={'none'}
            placeholder={t("password")} />
          <LinkButton title={t("forgot-password")} />
        </View>
        <View style={styles.footerContainer}>
          <View style={styles.signupContainer}>
            <Text style={Theme.textStyle.title}>{t("dont-have-account")}</Text>
            <LinkButton title={t("signup")}
              onPress={goToSignup}
              style={{ ...Theme.textStyle.caption, color: Theme.colors.primary }}
              containerStyle={{ paddingHorizontal: 5 }} 
              disabled={authLoading}/>
          </View>
          <StyledButton
            title={t("login")}
            onPress={onLoginPressed}
            loading={authLoading}
            disabled={authLoading} />
        </View>
      </KeyboardAvoidScrollView>
      <PredefineddModal
        isVisible={infoPopupData.show}
        title={infoPopupData.title} body={infoPopupData.body}
        modalType={infoPopupData.modalType}
        actionButtonTitle={t('ok')}
        actionButtonPressed={() => setInfoPopupData({ show: false, title: '', body: '', modalType: 'info' })} />
    </BaseContainer>
  );
};

export default LoginScreen;
