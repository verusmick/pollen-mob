// components/GradientProgressBar.tsx

import React from 'react';
import { View } from 'react-native';
import Svg, { Rect, Defs, LinearGradient, Stop, ClipPath } from 'react-native-svg';

type GradientProgressBarProps = {
  width?: number;
  height?: number;
  progress: number; // value between 0 and 1
  borderRadius?: number;
};

const GradientProgressBar = ({
  width = 220,
  height = 18,
  progress,
  borderRadius = 10,
}: GradientProgressBarProps) => {
  const progressWidth = width * Math.min(Math.max(progress /100, 0), 1);

  return (
    <View >
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
             <Stop offset="20%" stopColor="#00e838" />
            {(progress > 20) &&<Stop offset="40%" stopColor="#a5eb02" />}
            {(progress > 40) &&<Stop offset="60%" stopColor="#ebbb02" />}
            {(progress > 60) && <Stop offset="80%" stopColor="#f27200" />}
            {(progress > 80) && <Stop offset="100%" stopColor="#ff0000" />}
          </LinearGradient>
          <ClipPath id="clip">
            <Rect rx={borderRadius} ry={borderRadius} width={width} height={height} />
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
            fill="url(#grad)"

        />
      </Svg>
    </View>
  );
};

export default GradientProgressBar;
