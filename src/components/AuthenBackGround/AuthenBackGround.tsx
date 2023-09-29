import { Image, useWindowDimensions, Animated } from "react-native";
import React from "react";
import { authenBackGround } from "../../../assets/img/splash";
import BackButton from "../BackButton";
interface AuthenBackGroundProps {
  onPress: any;
  isBack?: boolean;
  customStyle?: object;
}
const AuthenBackGround = ({
  onPress,
  isBack = true,
  customStyle = {},
}: AuthenBackGroundProps) => {
  const { width } = useWindowDimensions();
  return (
    <>
      <Image
        source={authenBackGround}
        resizeMode="contain"
        style={{
          position: "absolute",
          top: width < 400 ? -48 : -18,
          width: width,
        }}
      ></Image>
      {isBack && (
        <Animated.View
          style={[{ position: "absolute", top: 72, left: 16 }, customStyle]}
        >
          <BackButton onPress={onPress} size={38}></BackButton>
        </Animated.View>
      )}
    </>
  );
};

export default AuthenBackGround;
