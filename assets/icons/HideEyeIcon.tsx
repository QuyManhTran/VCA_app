import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  fill?: boolean;
  color?: string;
  size?: number;
}

const HideEyeIcon = ({ fill, color = "black", size = 24 }: Props) => {
  return (
    <Ionicons
      name={fill ? "eye-off" : "eye-off-outline"}
      color={color}
      size={size}
    ></Ionicons>
  );
};

export default HideEyeIcon;
