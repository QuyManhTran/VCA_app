import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import IconProps from ".";

const EmailIcon = ({ fill, color = "black", size = 24 }: IconProps) => {
  return <Feather name={"mail"} color={color} size={size}></Feather>;
};

export default EmailIcon;
