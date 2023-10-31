import React from "react";
import { Image } from "react-native";
import { homeOutline, homeWhiteOutline } from "../img/icons";
import { NavBarProps } from "./NavBarIcon";

const HomeOutlineIcon = ({
  width = 36,
  height = 36,
  darkMode = false,
}: NavBarProps) => {
  return (
    <Image
      source={darkMode ? homeWhiteOutline : homeOutline}
      resizeMode="cover"
      style={{ width: width, height: height }}
    ></Image>
  );
};

export default HomeOutlineIcon;
