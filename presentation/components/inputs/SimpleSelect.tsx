import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SelectOption {
  label: string;
  value: string;
}
interface SimpleSelectProps {
  list: SelectOption[];
  selected: string | undefined;
  handleChange: (value: string) => void;
}

const SimpleSelect = ({ list, selected, handleChange }: SimpleSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedItem = list.find((item) => item.value === selected);

  const onSelect = (value: string) => {
    handleChange(value);
    setIsOpen(false);
  };
  return (
    <View className="mx-4 my-2">
      <TouchableOpacity
        onPress={() => setIsOpen((prev) => !prev)}
        className="flex-row justify-between items-center bg-neutral-800 px-4 py-3 rounded-lg"
      >
        <Text className="text-white text-base">{selectedItem?.label}</Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color="#fff"
        />
      </TouchableOpacity>

      {isOpen && (
        <View className="bg-neutral-800 mt-2 rounded-lg overflow-hidden">
          {list.map((item) => (
            <TouchableOpacity
              key={item.value}
              onPress={() => onSelect(item.value)}
              className={`px-4 py-3 ${
                selected === item.value ? "bg-neutral-600" : ""
              }`}
            >
              <Text
                className={`text-white ${
                  selected === item.value ? "font-bold" : ""
                }`}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default SimpleSelect;
