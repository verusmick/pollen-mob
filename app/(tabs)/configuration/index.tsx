import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useTranslation } from "react-i18next";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import SafeAreaViewWrapper from "@/presentation/components/layout/SafeAreaViewWrapper";
import SimpleSelect from "@/presentation/components/inputs/SimpleSelect";

const languageOptions = [
  { label: "English", value: "en-US" },
  { label: "French", value: "fr-FR" },
  { label: "German", value: "de-DE" },
  { label: "Spanish", value: "es-ES" },
];

const languageMap: Record<string, string> = {
  en: "en-US",
  fr: "fr-FR",
  de: "de-DE",
  es: "es-ES",
};

const ConfigurationScreen = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const initialLang = languageMap[i18n.language] || "en-US";
  const [language, setLanguage] = useState<string>(initialLang);

  const handleLanguageChange = async (newLang: string) => {
    setLanguage(newLang);
    const shortLang = Object.keys(languageMap).find(
      (key) => languageMap[key] === newLang
    );
    if (shortLang) {
      await i18n.changeLanguage(shortLang);
    }
  };
  useEffect(() => {
    const mappedLang = languageMap[i18n.language] || "en-US";
    setLanguage(mappedLang);
  }, [i18n.language]);
  return (
    <SafeAreaViewWrapper className="bg-neutral-900 flex-1 px-4 py-6">
      <Pressable
        className="flex-row items-center mb-6 pl-4"
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text className="text-white text-2xl font-bold ml-4">
          {t("config_screen.title")}
        </Text>
      </Pressable>

      <View className="gap-2">
        <Text className="text-white text-lg font-semibold pl-4">
          {t("config_screen.languages")}
        </Text>
        {/* <SimpleSelect
          list={languageOptions}
          selected={language}
          handleChange={handleLanguageChange}
        /> */}
      </View>
      {/* <View className="h-px bg-neutral-700 my-4" /> */}
    </SafeAreaViewWrapper>
  );
};

export default ConfigurationScreen;
