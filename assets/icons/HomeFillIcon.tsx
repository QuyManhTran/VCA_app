import React from "react";
import { Image } from "react-native";
import { homeFill } from "../img/icons";
import { NavBarProps } from "./NavBarIcon";

const HomeFillIcon = ({ width = 36, height = 36 }: NavBarProps) => {
  return (
    <Image
      source={homeFill}
      resizeMode="cover"
      style={{ width: width, height: height }}
    ></Image>
  );
};

export default HomeFillIcon;
