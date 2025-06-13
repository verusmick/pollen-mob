import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardEvent,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Portal } from "react-native-portalize";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useTranslation } from "react-i18next";

const i18nKey = "components.search_select_input";
interface SearchSelectInputProps<T> {
  data?: T[];
  labelKey: keyof T;
  selectedItems?: T[];
  onSelectItem: (item: T) => void;
  placeholder?: string;
}

const SearchSelectInput = <T extends object>({
  data = [],
  labelKey,
  selectedItems = [],
  onSelectItem,
  placeholder,
}: SearchSelectInputProps<T>) => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputLayout, setInputLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const inputRef = useRef<View>(null);
  const textInputRef = useRef<TextInput>(null);

  const measureInput = () => {
    inputRef.current?.measure((x, y, width, height, pageX, pageY) => {
      setInputLayout({ x: pageX, y: pageY, width, height });
    });
  };

  useEffect(() => {
    const showSub = Keyboard.addListener(
      "keyboardDidShow",
      (e: KeyboardEvent) => {
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const filteredData = (data ?? []).filter((item) =>
    String(item[labelKey]).toLowerCase().includes(searchText.toLowerCase())
  );

  const screenHeight = Dimensions.get("window").height;
  const remainingHeight = inputLayout
    ? screenHeight - (inputLayout.y + inputLayout.height + keyboardHeight)
    : 250;
  const getTextHightlite = (
    text: string,
    searchText: string,
    isSelected: boolean = false
  ) => {
    const index = text.toLowerCase().indexOf(searchText.toLowerCase());
    const baseColor = isSelected ? "text-white/80" : "text-neutral-500";
    if (index === -1 || searchText === "") {
      return <Text className={`text-lg ${baseColor}`}>{text}</Text>;
    }

    const before = text.slice(0, index);
    const match = text.slice(index, index + searchText.length);
    const after = text.slice(index + searchText.length);

    return (
      <Text className="text-lg">
        <Text className={baseColor}>{before}</Text>
        <Text className="text-white">{match}</Text>
        <Text className={baseColor}>{after}</Text>
      </Text>
    );
  };
  useFocusEffect(
    useCallback(() => {
      return () => {
        setShowSuggestions(false);
        setSearchText("");
        Keyboard.dismiss();
      };
    }, [])
  );

  return (
    <>
      <View
        ref={inputRef}
        className="mb-5 mt-5"
        onLayout={() => {
          if (Platform.OS !== "web") {
            setTimeout(measureInput, 50);
          }
        }}
      >
        <View className="flex-row items-center space-x-2 bg-neutral-800 rounded-lg">
          <View className="flex-row items-center px-3 py-3 flex-1">
            <TouchableOpacity
              onPress={() => {
                setShowSuggestions(true);
                measureInput();
              }}
            >
              <Ionicons name="search" size={16} color="#aaa" />
            </TouchableOpacity>
            <TextInput
              ref={textInputRef}
              autoCorrect={false}
              placeholder={placeholder}
              placeholderTextColor="#aaa"
              value={searchText}
              onFocus={() => {
                setShowSuggestions(true);
                measureInput();
              }}
              onChangeText={(text) => {
                setSearchText(text);
                setShowSuggestions(true);
                measureInput();
              }}
              className="text-white flex-1 ml-2 focus:outline-none"
            />
          </View>
          {showSuggestions && (
            <TouchableOpacity
              onPress={() => {
                setSearchText("");
                setShowSuggestions(false);
                textInputRef.current?.blur();
              }}
              className="px-6 py-2"
              hitSlop={20}
            >
              <Text className="text-white">{t(`${i18nKey}.cancel`)}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Suggestion Dropdown and Backdrop */}

      {showSuggestions && inputLayout && (
        <Portal>
          {/* Backdrop to close dropdown on outside press */}
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height,
              backgroundColor: "transparent",
              zIndex: 9998,
            }}
            activeOpacity={1}
            onPress={() => {
              setSearchText("");
              setShowSuggestions(false);
              Keyboard.dismiss();
            }}
          />
          {/* Suggestions List */}
          <View
            style={[
              styles.dropdown,
              {
                top: inputLayout.y + inputLayout.height + 5,
                left: inputLayout.x,
                width: inputLayout.width,
                height: remainingHeight,
              },
            ]}
          >
            <ScrollView keyboardShouldPersistTaps="handled">
              {filteredData.length > 0 ? (
                filteredData.map((item) => {
                  const label = String(item[labelKey]);
                  const isSelected = selectedItems?.some(
                    (sel) => sel[labelKey] === item[labelKey]
                  );
                  return (
                    <TouchableOpacity
                      key={item.id}
                      onPress={() => {
                        onSelectItem(item);
                        setSearchText("");
                        setShowSuggestions(false);
                      }}
                      className="p-3 flex-row justify-between items-center"
                    >
                      {getTextHightlite(label, searchText, isSelected)}
                      {isSelected && (
                        <Ionicons
                          name="checkmark"
                          size={14}
                          color="#ffffffcc"
                        />
                      )}
                    </TouchableOpacity>
                  );
                })
              ) : (
                <View style={{ maxHeight: remainingHeight, padding: 12 }}>
                  <Text className="text-neutral-500 text-xl">
                    {t(`${i18nKey}.no_results`)} "{searchText}"
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </Portal>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 0,
    backgroundColor: "#151718",
    height: 0,
    zIndex: 9999,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
export default SearchSelectInput;
