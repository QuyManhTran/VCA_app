import React from "react";
import { Image } from "react-native";
import { forward } from "../img/icons";

const ForWardIcon = () => {
  return (
    <Image
      source={forward}
      resizeMode="cover"
      style={{ width: 40, height: 40 }}
    ></Image>
  );
};

export default ForWardIcon;
