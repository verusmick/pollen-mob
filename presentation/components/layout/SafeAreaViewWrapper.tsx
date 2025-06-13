import { View, Text, ViewProps } from "react-native";
import React, { ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
type SafeAreaViewWrapperProps = ViewProps & {
  children: ReactNode;
  className?: string;
  customPaddingBottom?: number;
};
const SafeAreaViewWrapper = ({
  children,
  className,
  customPaddingBottom,
  style,
  ...rest
}: SafeAreaViewWrapperProps) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      className={className}
      style={[
        {
          paddingTop: insets.top,
          paddingBottom: customPaddingBottom ?? insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          flex: 1,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
};

export default SafeAreaViewWrapper;
