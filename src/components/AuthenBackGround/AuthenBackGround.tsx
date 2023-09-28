import { Image, useWindowDimensions } from "react-native";
import React from "react";
import { authenBackGround } from "../../../assets/img/splash";
import { View } from "react-native-animatable";
import BackButton from "../BackButton";
interface AuthenBackGroundProps {
  onPress: any;
  isBack?: boolean;
}
const AuthenBackGround = ({
  onPress,
  isBack = true,
}: AuthenBackGroundProps) => {
  const { width, height } = useWindowDimensions();
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
        <View style={{ position: "absolute", top: 72, left: 16 }}>
          <BackButton onPress={onPress} size={38}></BackButton>
        </View>
      )}
    </>
  );
};

export default AuthenBackGround;
