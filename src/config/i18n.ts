import i18n, { LanguageDetectorAsyncModule } from 'i18next';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { I18nManager, NativeModules, Platform } from 'react-native';

import translations from '../assets/translations';

const defaultNS = 'translations';
const defaultLang = 'en';
const resources = {
	en: {
		[defaultNS]: translations.en,
	},
	  he: {
	    [defaultNS]: translations.he,
	  },
	  iw: {
	    [defaultNS]: translations.he,
	  },
} as const;

const detectDeviceLanguage = () => {
	if (Platform.OS ==='ios') {
		return NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]
	}
	else if (Platform.OS === 'android' ){
		return NativeModules.I18nManager.localeIdentifier || 'en';
	}
	return 'en';
}

const languageDetector: LanguageDetectorAsyncModule = {
	init: () => { },
	type: 'languageDetector',
	async: true,
	detect: async callback => {
		const deviceLang = detectDeviceLanguage()[0];
		const isLangRTL = deviceLang === 'he' || deviceLang === 'iw';
		if (isLangRTL !== I18nManager.isRTL) {
			I18nManager.allowRTL(isLangRTL);
			I18nManager.forceRTL(isLangRTL);
		}
		callback('en');
		return 'en';
	},
	cacheUserLanguage: () => { },
};

i18n.use(Backend)
	.use(initReactI18next)
	.use(languageDetector)
	.init({
		compatibilityJSON: 'v3',
		lng: defaultLang,
		ns: [defaultNS],
		defaultNS,
		resources,
		fallbackLng: defaultLang,
		interpolation: {
			escapeValue: false,
			formatSeparator: ',',
		},
	});

export default i18n;
