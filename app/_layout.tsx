import { useEffect } from "react";
import { Host } from "react-native-portalize";
import { useTranslation } from "react-i18next";
import { Slot, SplashScreen } from "expo-router";
import * as Localization from "expo-localization";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./global.css";
import "@/src/i18n";
import type { i18n as I18nType } from "i18next";

import SplashScreenView from "@/presentation/components/layout/SplashScreenView";

// Create a client
const queryClient = new QueryClient();
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const { i18n } = useTranslation();
  const i18nReady = i18n.isInitialized;
  const [fontsLoaded, error] = useFonts({
    "Rubik-Black": require("../assets/fonts/Rubik-Black.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded && i18nReady) SplashScreen.hideAsync();
  }, [fontsLoaded, i18nReady, error]);

  const setInitialLanguage = async (i18nInstance: I18nType) => {
    if (!i18nInstance.isInitialized) return;

    const systemLang = Localization.locale || "en-US";
    const langBase = systemLang.split("-")[0].toLowerCase();

    const supportedLangs = ["en", "fr", "de", "es"];
    const fallbackLang = "en";

    const matchedLang = supportedLangs.includes(langBase)
      ? langBase
      : fallbackLang;

    if (i18nInstance.language !== matchedLang) {
      await i18nInstance.changeLanguage(matchedLang);
    }
  };

  useEffect(() => {
    setInitialLanguage(i18n);
  }, [i18n]);

  return (
    <QueryClientProvider client={queryClient}>
      <Host>
        {!fontsLoaded || !i18nReady || error ? <SplashScreenView /> : <Slot />}
      </Host>
    </QueryClientProvider>
  );
};

export default RootLayout;
