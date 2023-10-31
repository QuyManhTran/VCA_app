import React from "react";
import { Ionicons } from "@expo/vector-icons";
import IconProps from ".";

const UserIcon = ({ fill, color = "black", size = 24 }: IconProps) => {
  return (
    <Ionicons
      name={fill ? "person" : "person-outline"}
      color={color}
      size={size}
    ></Ionicons>
  );
};

export default UserIcon;
