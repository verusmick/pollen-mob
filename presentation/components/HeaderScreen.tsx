import { View, Text } from "react-native";
import HeaderUbication from "./HeaderLocations";

interface HeaderProps {
  title: string;
  subTitle: string;
  className?: string;
}

const Header = ({ title, subTitle, className = "" }: HeaderProps) => {
  return (
    <View className={`p-4 ${className}`}>
      <Text className="text-white text-2xl font-bold text-center">{title}</Text>
      <HeaderUbication subTitle={subTitle} />
    </View>
  );
};

export default Header;
