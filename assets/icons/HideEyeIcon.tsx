import React from "react";
import { Ionicons } from "@expo/vector-icons";
import IconProps from ".";

const HideEyeIcon = ({ fill, color = "black", size = 24 }: IconProps) => {
  return (
    <Ionicons
      name={fill ? "eye-off" : "eye-off-outline"}
      color={color}
      size={size}
    ></Ionicons>
  );
};

export default HideEyeIcon;
