import React from "react";
import { Image } from "react-native";
import { userOutline } from "../img/icons";
import { NavBarProps } from "./NavBarIcon";

const UserFillIcon = ({ width = 36, height = 36 }: NavBarProps) => {
  return (
    <Image
      source={userOutline}
      resizeMode="cover"
      style={{ width: width, height: height }}
    ></Image>
  );
};

export default UserFillIcon;
