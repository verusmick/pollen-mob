import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { I18nManager } from "react-native";
import translationEn from "./locales/en-US/translations.json";
import translationKo from "./locales/ko-KR/translations.json";
import translationAr from "./locales/ar-SA/translations.json";
import translationDe from "./locales/de-DE/translations.json";
import translationFr from "./locales/fr-FR/translations.json";
import translationEs from "./locales/es-ES/translations.json";
const resources = {
  "en-US": { translation: translationEn },
  en: { translation: translationEn },
  "ko-KR": { translation: translationKo },
  ko: { translation: translationKo },
  "ar-SA": { translation: translationAr },
  ar: { translation: translationAr },
  "de-DE": { translation: translationDe },
  de: { translation: translationDe },
  "fr-FR": { translation: translationFr },
  fr: { translation: translationFr },
  "es-ES": { translation: translationEs },
  es: { translation: translationEs },
};

const RTL_LANGUAGES = ["ar", "ar-SA"];

const LANGUAGE_KEY = "@app_language";

const initI18n = async () => {
  try {
    // Try to get saved language preference
    const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);

    // Determine which language to use
    let selectedLanguage = savedLanguage;

    if (!selectedLanguage) {
      // If no saved language, use device locale or fallback
      const deviceLocales = Localization.getLocales();
      const deviceLocale = deviceLocales[0]?.languageTag || "en-US";
      const languageCode = deviceLocale.split("-")[0];

      // Try exact locale match first
      if (deviceLocale in resources) {
        selectedLanguage = deviceLocale;
      }

      // Then try language code match
      else if (languageCode in resources) {
        selectedLanguage = languageCode;
      } else {
        selectedLanguage = "en-US";
      }
    }

    // Handle RTL layout
    const isRTL = RTL_LANGUAGES.includes(selectedLanguage);

    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
    }

    await i18n.use(initReactI18next).init({
      resources,
      lng: selectedLanguage,
      fallbackLng: {
        "en-*": ["en-US", "en"],
        "ko-*": ["ko-KR", "ko", "en-US"],
        "ar-*": ["ar-SA", "ar", "en-US"],
        "de-*": ["de-DE", "de", "en-US"],
        default: ["en-US"],
      },
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });

    // Save the selected language
    if (!savedLanguage) {
      await AsyncStorage.setItem(LANGUAGE_KEY, selectedLanguage);
    }
  } catch (error) {
    console.error("Error initializing i18n:", error);

    // Initialize with defaults if there's an error
    await i18n.use(initReactI18next).init({
      resources,
      lng: "en-US",
      fallbackLng: "en-US",
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
  }
};

initI18n();

export default i18n;
