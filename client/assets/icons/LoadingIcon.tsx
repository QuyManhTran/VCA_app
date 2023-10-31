import React from "react";
import { AntDesign } from "@expo/vector-icons";
import IconProps from ".";

const LoadingIcon = ({ fill, color = "black", size = 24 }: IconProps) => {
  return <AntDesign name="loading1" size={size} color={color} />;
};

export default LoadingIcon;
