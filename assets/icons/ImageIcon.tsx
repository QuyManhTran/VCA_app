import { Image } from "react-native";
import React from "react";
import { noodles } from "../img/foods";

const ImageIcon = ({ img }: { img: any }) => {
  return (
    <Image
      source={img}
      style={{ width: 30, height: 30 }}
      resizeMode="cover"
    ></Image>
  );
};

export default React.memo(ImageIcon);
