import React from "react";
import { Image } from "react-native";
import { userFill, userWhiteFill } from "../img/icons";
import { NavBarProps } from "./NavBarIcon";

const UserFillIcon = ({
  width = 36,
  height = 36,
  darkMode = false,
}: NavBarProps) => {
  return (
    <Image
      source={darkMode ? userWhiteFill : userFill}
      resizeMode="cover"
      style={{ width: width, height: height, marginLeft: darkMode ? 6 : 0 }}
    ></Image>
  );
};

export default UserFillIcon;
