import React from "react";
import { View } from "react-native";
import { Svg, Circle, Text as SVGText } from "react-native-svg";

const CircularProgress = (props: any) => {
  const {
    size,
    strokeWidth,
    text,
    pollenName = " ",
    pollenRangeLevel = " ",
  } = props;
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  const svgProgress = 100 - props.progressPercent;

  return (
    <View style={{ margin: 10 }}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          stroke={props.bgColor ? props.bgColor : "#f2f2f2"}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          {...{ strokeWidth }}
        />

        {/* Progress Circle */}
        <Circle
          stroke={props.pgColor ? props.pgColor : "#3b5998"}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={`${circum} ${circum}`}
          strokeDashoffset={radius * Math.PI * 2 * (svgProgress / 100)}
          strokeLinecap="round"
          transform={`rotate(90, ${size / 2}, ${size / 2})`}
          {...{ strokeWidth }}
        />

        {/* Text */}
        <SVGText
          fontSize={props.textSize ? props.textSize : "10"}
          x={size / 2}
          y={size / 2 + (props.textSize ? props.textSize / 2 - 1 : 5)}
          textAnchor="middle"
          fill={props.textColor ? props.textColor : "#333333"}
        >
          {`${text}`}
        </SVGText>
        <SVGText
          fontSize={props.textSize ? props.textSize : "10"}
          x={size / 2}
          // y={160}
          y={size / 2 + (props.textSize ? props.textSize / 1.5 - 1 : 25)}
          textAnchor="middle"
          fill={props.textColor ? props.textColor : "#333333"}
        >
          {`${pollenName}`}
        </SVGText>
        <SVGText
          fontSize={props.textSize ? props.textSize : "10"}
          x={size / 2}
          y={size / 2 + (props.textSize ? props.textSize / 1.5 - 1 : 45)}
          textAnchor="middle"
          fill={props.textColor ? props.textColor : "#333333"}
        >
          {`${pollenRangeLevel}`}
        </SVGText>
      </Svg>
    </View>
  );
};

export default CircularProgress;
