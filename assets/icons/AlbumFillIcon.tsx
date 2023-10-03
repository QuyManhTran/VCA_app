import React from "react";
import { Image } from "react-native";
import { albumFill, albumWhiteFill } from "../img/icons";
import { NavBarProps } from "./NavBarIcon";

const AlbumFillIcon = ({
  width = 36,
  height = 36,
  darkMode = false,
}: NavBarProps) => {
  return (
    <Image
      source={darkMode ? albumWhiteFill : albumFill}
      resizeMode="cover"
      style={{ width: width, height: height }}
    ></Image>
  );
};

export default AlbumFillIcon;
