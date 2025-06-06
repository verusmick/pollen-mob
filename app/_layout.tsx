import { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import "./global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import "@/src/i18n";
import { Host } from "react-native-portalize";
import { useTranslation } from "react-i18next";
import SplashScreenView from "@/presentation/components/SplashScreenView";
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

  if (!fontsLoaded || !i18nReady || error) return <SplashScreenView />;

  return (
    <QueryClientProvider client={queryClient}>
      <Host>
        <Stack screenOptions={{ headerShown: false }} />
      </Host>
    </QueryClientProvider>
  );
};

export default RootLayout;
