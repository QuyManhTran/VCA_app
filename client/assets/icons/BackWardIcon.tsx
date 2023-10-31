import React from "react";
import { Image } from "react-native";
import { backward } from "../img/icons";

const BackWardIcon = () => {
  return (
    <Image
      source={backward}
      resizeMode="cover"
      style={{ width: 40, height: 40 }}
    ></Image>
  );
};

export default BackWardIcon;
