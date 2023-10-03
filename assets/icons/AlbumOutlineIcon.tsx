import React from "react";
import { Image } from "react-native";
import { albumOutline, albumWhiteOutline } from "../img/icons";
import { NavBarProps } from "./NavBarIcon";

const AlbumOutlineIcon = ({
  width = 36,
  height = 36,
  darkMode = false,
}: NavBarProps) => {
  return (
    <Image
      source={darkMode ? albumWhiteOutline : albumOutline}
      resizeMode="cover"
      style={{ width: width, height: height }}
    ></Image>
  );
};

export default AlbumOutlineIcon;
