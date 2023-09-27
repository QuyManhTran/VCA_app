import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  fill?: boolean;
  color?: string;
  size?: number;
}

const RightArrow = ({ fill, color = "black", size = 24 }: Props) => {
  return (
    <Ionicons
      name={fill ? "arrow-forward" : "arrow-forward-outline"}
      color={color}
      size={size}
    ></Ionicons>
  );
};

export default RightArrow;
