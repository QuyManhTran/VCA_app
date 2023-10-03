import React from "react";
import { Image } from "react-native";
import { albumOutline } from "../img/icons";
import { NavBarProps } from "./NavBarIcon";

const AlbumOutlineIcon = ({ width = 36, height = 36 }: NavBarProps) => {
  return (
    <Image
      source={albumOutline}
      resizeMode="cover"
      style={{ width: width, height: height }}
    ></Image>
  );
};

export default AlbumOutlineIcon;
