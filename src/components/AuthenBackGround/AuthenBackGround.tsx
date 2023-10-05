import { Image, useWindowDimensions, Animated } from "react-native";
import React, { useContext } from "react";
import {
  authenBackGround,
  authenDarkBackGround,
} from "../../../assets/img/splash";
import BackButton from "../BackButton";
import ThemeContext from "../../utilies/theme";
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
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <>
      <Image
        source={isDarkMode ? authenDarkBackGround : authenBackGround}
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
          <BackButton
            onPress={onPress}
            size={38}
            color={isDarkMode ? "#fff" : "black"}
          ></BackButton>
        </Animated.View>
      )}
    </>
  );
};

export default AuthenBackGround;
