import React from "react";
import { Image } from "react-native";
import { userOutline, userWhiteOutline } from "../img/icons";
import { NavBarProps } from "./NavBarIcon";

const UserOutlineIcon = ({
  width = 36,
  height = 36,
  darkMode = false,
}: NavBarProps) => {
  return (
    <Image
      source={darkMode ? userWhiteOutline : userOutline}
      resizeMode="cover"
      style={{ width: width, height: height, marginLeft: darkMode ? 6 : 0 }}
    ></Image>
  );
};

export default UserOutlineIcon;
