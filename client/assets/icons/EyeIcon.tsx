import React from "react";
import { Ionicons } from "@expo/vector-icons";
import IconProps from ".";
const EyeIcon = ({ fill, color = "black", size = 24 }: IconProps) => {
  return (
    <Ionicons
      name={fill ? "eye" : "eye-outline"}
      color={color}
      size={size}
    ></Ionicons>
  );
};

export default EyeIcon;
