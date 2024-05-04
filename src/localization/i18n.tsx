/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next';
import translationEN from './en/translation.json';
import translationFR from './fr/translation.json';


export const resources = {
  en: {
    translation: translationEN,
  },

  fr: {
    translation: translationFR,
  },
}

i18n.use(initReactI18next).init({
  resources,
  compatibilityJSON: 'v3', 
  lng: 'fr', // language to use
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  react: { useSuspense: false },//this line
})


export default i18n;