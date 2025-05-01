import { useLocations } from "@/presentation/hooks/useLocations";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import "@/src/i18n";
import { useTranslation } from 'react-i18next';
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { I18nManager } from "react-native";
export default function LocationsScreen() {
  // const { locationsQuery } = useLocations();
  const { t, i18n } = useTranslation();

  const handleLanguageChange = async (language: string) => {
    try {
      const RTL_LANGUAGES = ["ar", "ar-SA"];
      const LANGUAGE_KEY = "@app_language";

      // Handle RTL layout
      const isRTL = RTL_LANGUAGES.includes(language);
      if (I18nManager.isRTL !== isRTL) {
        I18nManager.allowRTL(isRTL);
        I18nManager.forceRTL(isRTL);
      }

      // Change language
      await i18n.changeLanguage(language);

      // Save preference
      await AsyncStorage.setItem(LANGUAGE_KEY, language);
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };


  return (
    <SafeAreaView>
      <View className="bg-gray-900 mx-2 font-work-light">
        <Text className="text-3xl font-work-regular color-white">
          Locations
        </Text>
        <Text className="text-3xl font-work-regular color-white">{t('home_screen.welcome')}</Text>


        {/* <FlatList
          data={locationsQuery.data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="mt-10 border border-gray-800 bg-gray-800">
              <Text className="text-2xl text-slate-200">{item.name}</Text>
              <Text className="text-slate-200">{item.id}</Text>
            </View>
          )}
        /> */}
        <Text className="text-3xl font-work-regular color-white" onPress={() => handleLanguageChange("ko-KR")}>
Korean
        </Text>
        <Text className="text-3xl font-work-regular color-white" onPress={() => handleLanguageChange("en-US")}>
Korean
        </Text>
        <Text className="text-3xl font-work-regular color-white" onPress={() => handleLanguageChange("ar-SA")}>
Korean
        </Text>
        
      </View>
    </SafeAreaView>
  );
}
