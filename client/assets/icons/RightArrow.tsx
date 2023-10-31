import React from "react";
import { Ionicons } from "@expo/vector-icons";
import IconProps from ".";

const RightArrow = ({ fill, color = "black", size = 24 }: IconProps) => {
  return (
    <Ionicons
      name={fill ? "arrow-forward" : "arrow-forward-outline"}
      color={color}
      size={size}
    ></Ionicons>
  );
};

export default RightArrow;
