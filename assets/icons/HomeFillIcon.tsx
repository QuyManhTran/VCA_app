import React from "react";
import { Image } from "react-native";
import { homeFill, homeWhiteFill } from "../img/icons";
import { NavBarProps } from "./NavBarIcon";

const HomeFillIcon = ({
  width = 36,
  height = 36,
  darkMode = false,
}: NavBarProps) => {
  return (
    <Image
      source={darkMode ? homeWhiteFill : homeFill}
      resizeMode="cover"
      style={{ width: width, height: height }}
    ></Image>
  );
};

export default HomeFillIcon;
