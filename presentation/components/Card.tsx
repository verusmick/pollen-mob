import { View, Text } from "react-native";
import React, { ReactNode } from "react";
interface CardProps {
  children: ReactNode;
  className?: string;
}
const Card = ({ children, className = "" }: CardProps) => {
  return (
    <View className={`rounded-2xl shadow-md p-4 ${className}`}>{children}</View>
  );
};

export default Card;
