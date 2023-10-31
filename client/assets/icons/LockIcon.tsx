import React from "react";
import { Ionicons } from "@expo/vector-icons";
import IconProps from ".";

const LockIcon = ({ fill, color = "black", size = 24 }: IconProps) => {
  return (
    <Ionicons
      name={fill ? "lock-closed" : "lock-closed-outline"}
      color={color}
      size={size}
    ></Ionicons>
  );
};

export default LockIcon;
