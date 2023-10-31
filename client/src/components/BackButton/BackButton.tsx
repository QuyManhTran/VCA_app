import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
interface Props {
  fill?: boolean;
  color?: string;
  size?: number;
  onPress: any;
  rotate?: string;
  customeStyle?: object;
}
const BackButton = ({
  fill,
  color = "black",
  size = 24,
  onPress,
  rotate = "0deg",
  customeStyle = {},
}: Props) => {
  return (
    <TouchableOpacity
      onPress={(e) => {
        onPress();
      }}
      activeOpacity={0.7}
      style={[
        {
          borderRadius: 20,
          transform: [{ rotate: rotate }],
          padding: 12,
        },
        customeStyle,
      ]}
    >
      <Ionicons
        name={fill ? "arrow-back" : "arrow-back-outline"}
        color={color}
        size={size}
      ></Ionicons>
    </TouchableOpacity>
  );
};

export default BackButton;
