import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import IconProps from ".";

const FullScreen = ({ fill, color = "black", size = 24 }: IconProps) => {
  return <MaterialIcons name="fullscreen" size={size} color={color} />;
};

export default FullScreen;
