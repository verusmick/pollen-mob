import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Location } from "@/infrastructure/interfaces/location.interface";
import { useTranslation } from "react-i18next";
const i18nKey = "components.locationSearchInput";
interface LocationSearchProps {
  locations: Location[];
  onSelectLocation: (location: Location) => void;
}
const LocationSearchInput = ({
  locations,
  onSelectLocation,
}: LocationSearchProps) => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredLocations = locations.filter((loc) =>
    loc.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View className="relative z-10 mb-5 mt-5">
      <View className="flex-row items-center space-x-2 bg-neutral-800 rounded-lg">
        <View className="flex-row items-center px-3 py-2 flex-1">
          <Ionicons name="search" size={16} color="#aaa" className="mr-2" />
          <TextInput
            placeholder={t(`${i18nKey}.inputLabel`)}
            placeholderTextColor="#aaa"
            value={searchText}
            onFocus={() => setShowSuggestions(true)}
            onChangeText={(text) => {
              setSearchText(text);
              setShowSuggestions(true);
            }}
            className="text-white flex-1 focus:outline-none"
          />
        </View>
        {showSuggestions && (
          <TouchableOpacity
            onPress={() => {
              setSearchText("");
              setShowSuggestions(false);
            }}
            className="px-6 py-2"
          >
            <Text className="text-white">{t(`${i18nKey}.cancel`)}</Text>
          </TouchableOpacity>
        )}
      </View>

      {showSuggestions && filteredLocations.length > 0 && (
        <ScrollView className="absolute top-8 left-0 right-0 bg-neutral-800/90 z-20 max-h-60 overflow-x-auto">
          {filteredLocations.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                setSearchText("");
                setShowSuggestions(false);
                onSelectLocation(item);
              }}
              className="p-3"
            >
              <Text className="text-white">{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default LocationSearchInput;
