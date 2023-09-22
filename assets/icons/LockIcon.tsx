import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  fill?: boolean;
  color?: string;
  size?: number;
}

const LockIcon = ({ fill, color = "black", size = 24 }: Props) => {
  return (
    <Ionicons
      name={fill ? "lock-closed" : "lock-closed-outline"}
      color={color}
      size={size}
    ></Ionicons>
  );
};

export default LockIcon;
