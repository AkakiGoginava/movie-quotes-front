import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: require('@/public/locales/en/translation.json'),
    },
    ka: {
      translation: require('@/public/locales/ka/translation.json'),
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
