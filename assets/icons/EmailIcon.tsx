import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
interface Props {
  fill?: boolean;
  color?: string;
  size?: number;
}

const EmailIcon = ({ fill, color = "black", size = 24 }: Props) => {
  return <Feather name={"mail"} color={color} size={size}></Feather>;
};

export default EmailIcon;
