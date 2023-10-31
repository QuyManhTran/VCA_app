import React from "react";
import { Ionicons } from "@expo/vector-icons";
import IconProps from ".";

const PauseIcon = ({ fill, color = "black", size = 24 }: IconProps) => {
  return (
    <Ionicons
      name={fill ? "pause" : "pause-outline"}
      color={color}
      size={size}
    ></Ionicons>
  );
};

export default PauseIcon;
