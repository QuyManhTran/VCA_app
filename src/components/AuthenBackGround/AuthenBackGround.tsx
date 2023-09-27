import { Image, useWindowDimensions } from "react-native";
import React from "react";
import { authenBackGround } from "../../../assets/img/splash";

const AuthenBackGround = () => {
  const { width, height } = useWindowDimensions();
  return (
    <Image
      source={authenBackGround}
      resizeMode="contain"
      style={{
        position: "absolute",
        top: width < 400 ? -48 : -18,
        width: width,
      }}
    ></Image>
  );
};

export default AuthenBackGround;
