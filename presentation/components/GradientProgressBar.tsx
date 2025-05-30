// components/GradientProgressBar.tsx

import React, { useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import Svg, {
  Rect,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg";

type GradientProgressBarProps = {
  progress: number; // From 0 to 100
  height?: number;
  borderRadius?: number;
  id?: number;
};

const GradientProgressBar = ({
  progress,
  height = 18,
  borderRadius = 10,
  id = 0,
}: GradientProgressBarProps) => {
  const [width, setWidth] = useState(0);
  const onLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };
  const progressWidth = width * Math.min(Math.max(progress / 100, 0), 1);
  return (
    <View onLayout={onLayout} className="flex-1">
      {width > 0 && (
        <Svg width={width} height={height}>
          <Defs>
            <LinearGradient id={`grad-${id}`} x1="0" y1="0" x2="1" y2="0">
              {[
                <Stop key={`20-${id}`} offset="20%" stopColor="#00e838" />,
                progress > 20 && (
                  <Stop key={`40-${id}`} offset="40%" stopColor="#a5eb02" />
                ),
                progress > 40 && (
                  <Stop key={`60-${id}`} offset="60%" stopColor="#ebbb02" />
                ),
                progress > 60 && (
                  <Stop key={`80-${id}`} offset="80%" stopColor="#f27200" />
                ),
                progress > 80 && (
                  <Stop key={`100-${id}`} offset="100%" stopColor="#ff0000" />
                ),
              ].filter((child): child is React.ReactElement => Boolean(child))}
            </LinearGradient>
            <ClipPath id="clip">
              <Rect
                rx={borderRadius}
                ry={borderRadius}
                width={width}
                height={height}
              />
            </ClipPath>
          </Defs>

          {/* Background bar */}
          <Rect
            width={width}
            height={height}
            rx={borderRadius}
            ry={borderRadius}
            fill="white"
          />

          {/* Progress bar with gradient */}
          <Rect
            width={progressWidth}
            height={height}
            clipPath="url(#clip)"
            rx={10}
            // fill="url(#grad)"
            fill={`url(#grad-${id})`}
          />
        </Svg>
      )}
    </View>
  );
};

export default GradientProgressBar;
