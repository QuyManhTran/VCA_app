import React from "react";
import { Ionicons } from "@expo/vector-icons";
import IconProps from ".";

const PlayIcon = ({ fill, color = "black", size = 24 }: IconProps) => {
  return (
    <Ionicons
      name={fill ? "play" : "play-outline"}
      color={color}
      size={size}
    ></Ionicons>
  );
};

export default PlayIcon;
