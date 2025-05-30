import { allergyRangeColors } from "@/constants/Colors";
import { AlertCircle } from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";
interface AllergyIndicatorProps {
  level: string;
}
export const AllergyIndicatorLabel = ({ level }: AllergyIndicatorProps) => {
  const { t } = useTranslation();
  if (!level) return null;
  return (
    <View className="flex-row items-center mt-2">
      <AlertCircle size={18} color={allergyRangeColors[level || "NONE"]} />
      <Text
        className="text-base ml-2"
        style={{
          color: allergyRangeColors[level || "NONE"],
        }}
      >
        {t(`home_screen.allergyRanges.${level}`)} allergy risk
      </Text>
    </View>
  );
};
