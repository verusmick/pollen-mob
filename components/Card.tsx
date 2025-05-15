import React, { ReactNode } from "react";
import { View } from "react-native";

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <View className={`rounded-2xl shadow-md p-4 ${className}`}>{children}</View>
  );
};

export default Card;
