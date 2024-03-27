import React, { useEffect, useRef, useState } from 'react';
import { NativeSyntheticEvent, Text, TextInput, TextInputFocusEventData, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { SignupProps } from '../interfaces/component-data-model';
import BaseContainer, { KeyboardAvoidScrollView } from '../../../components/base-container';
import StyledTextInput, { StyledPasswordTextInput } from '../../../components/styled-textinput';
import StyledButton from '../../../components/styled-button';
import styles from './styles';
import Theme from '../../../theme/theme';
import PredefineddModal, { InfoPopupData } from '../../../components/styled-modal';
import { selectors as AuthSelectors } from '../../../store/data/auth';
import { actions as SettingsActions, selectors as SettingsSelectors } from '../../../store/data/settings';
import { useAppDispatch, useAppSelector } from '../../../store';
import { SignUpForm } from '../../../store/data/auth/interfaces/auth-data-model';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../../../navigation/routes';


const SignupScreen: React.FC<SignupProps> = () => {

  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const apiUrl = useAppSelector(SettingsSelectors.getApiUrl);
  const authLoading = useAppSelector(AuthSelectors.isLoading);

  const navigation = useNavigation();

  const viewRef = useRef<View | null>();
  const focusedFieldRef = useRef<any>();
  const [topOffset, setTopOffset] = useState(0);
  const [infoPopupData, setInfoPopupData] = useState<InfoPopupData>({ show: false, title: '', body: '', modalType: 'info' });

  const [url, setUrl] = useState<string>('');

  const [signupForm, setSignupForm] = useState<SignUpForm>({
    firstName: '',
    lastName: '',
    username: '',
    password: ''
  });

  useEffect(() => {
    if (apiUrl) {
      setUrl(apiUrl);
    }
  }, [apiUrl]);

  const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>, inputRef: TextInput) => {
    focusedFieldRef.current = inputRef;
  }

  const textInputInfoButtonPress = (title: string, body: string) => {
    setInfoPopupData({ show: true, title: title, body: body, modalType: 'info' });
  }

  const apiUrlOnBlur = () => {
    dispatch(SettingsActions.saveSettings({ apiUrl: url }));
  }

  const onTextChnage = (text: string, key: string) => {
    if (key === 'apiUrl') {
      setUrl(text);
    }
    else {
      setSignupForm({
        ...signupForm,
        [key]: text
      })
    }
  }

  const onSignupPressed = () => {
    navigation.navigate({name: routes.SearchDevices, params: {signupForm: signupForm}} as never);
  }

  const isSignupFormEmpty = () => {
    return signupForm.firstName === '' || 
    signupForm.lastName === '' ||
    signupForm.username === '' ||
    signupForm.password === '';
  }

  return (
    <BaseContainer edges={{ top: 'off' }}>
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
          <Text style={styles.title}>{t("welcome")}</Text>
          <Text style={styles.subtitle}>{t('welcome-subtitle')}</Text>
          <StyledTextInput
            onChangeText={(text: string) => onTextChnage(text, 'apiUrl')}
            value={url}
            onFocus={onFocus}
            onBlur={apiUrlOnBlur}
            title={t("api-url")}
            placeholder={t("api-url")}
            keyboardType={"url"}
            hasInfoButton={true}
            editable={!authLoading}
            onInfoButtonPressed={() => textInputInfoButtonPress(t('info'), t('api-url-info'))} />
          <StyledTextInput
            onChangeText={(text: string) => onTextChnage(text, 'firstName')}
            value={signupForm.firstName}
            onFocus={onFocus}
            title={t("first-name")}
            placeholder={t("first-name")}
            editable={!authLoading}
            keyboardType={"default"} />
          <StyledTextInput
            onChangeText={(text: string) => onTextChnage(text, 'lastName')}
            value={signupForm.lastName}
            onFocus={onFocus}
            title={t("last-name")}
            placeholder={t("last-name")}
            editable={!authLoading}
            keyboardType={"default"} />
          <StyledTextInput
            onChangeText={(text: string) => onTextChnage(text, 'username')}
            value={signupForm.username}
            onFocus={onFocus}
            title={t("email")}
            placeholder={t("email")}
            editable={!authLoading}
            keyboardType={"email-address"} />
          <StyledPasswordTextInput
            value={signupForm.password}
            onChangeText={(text: string) => onTextChnage(text, 'password')}
            onFocus={onFocus}
            title={t("password")}
            editable={!authLoading}
            placeholder={t("password")} />
        </View>
        <View style={styles.footerContainer}>
          <StyledButton 
            title={t("next")} 
            loading={authLoading} 
            disabled={isSignupFormEmpty()}
            onPress={onSignupPressed} />
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

export default SignupScreen;
