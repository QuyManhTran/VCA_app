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
  customeStyle,
}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        {
          backgroundColor: "#fff",
          borderRadius: 20,
          transform: [{ rotate: rotate }],
        },
        customeStyle,
      ]}
    >
      <Ionicons
        name={fill ? "arrow-back" : "arrow-back-outline"}
        color={color}
        size={size}
        style={{ padding: 12 }}
      ></Ionicons>
    </TouchableOpacity>
  );
};

export default BackButton;
