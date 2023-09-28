import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
interface Props {
  fill?: boolean;
  color?: string;
  size?: number;
  onPress: any;
}
const BackButton = ({ fill, color = "black", size = 24, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
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
