import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { useContext, useState } from "react";
import ThemeContext from "../../../utilies/theme";
import AuthenBackGround from "../../../components/AuthenBackGround";
import { RouterProps } from "../../Splash/Splash";
import AuthButton from "../../../components/AuthButton";
import { colors } from "../../../../constants";
import {
  baloo2Fonts,
  montserratFonts,
} from "../../../../constants/fontFamiles";
import { onGoogleButtonPress } from "../../../utilies/firebaseConfig";
import {
  googleRegister,
  googleRegisterPath,
} from "../../../services/signupService";
import * as loginService from "../../../services/loginService";
const AskRegister = ({ navigation, route }: RouterProps) => {
  const { width } = useWindowDimensions();
  const { isDarkMode, onUserId, onUserInfor, onLogin } =
    useContext(ThemeContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const googleServiceHandler = async () => {
    const googleService = await onGoogleButtonPress();
    if (googleService.message === 200) {
      setIsLoading(true);
      if (googleService.isNewUser) {
        const response = await googleRegister(googleRegisterPath, {
          ...googleService.data,
        });
        if (response.message === 200) {
          const { _id, username, email, avatar, cover, birthday, phoneNumber } =
            response.data.user;
          onUserId(_id);
          onUserInfor({
            username,
            email,
            avatar: avatar?.url || "",
            cover: cover?.url || "",
            birthday: birthday || "",
            phoneNumber: phoneNumber || "",
          });
          onLogin();
          navigation.navigate("Navbar");
        } else {
          setIsLoading(false);
        }
      } else {
        const response = await loginService.login(loginService.loginPath, {
          email: googleService.data.email,
          password: googleService.data.password,
        });
        if (response.message === 200) {
          const { _id, username, email, avatar, cover, birthday, phoneNumber } =
            response.data.user;
          onUserId(_id);
          onUserInfor({
            username,
            email,
            avatar: avatar?.url || "",
            cover: cover?.url || "",
            birthday: birthday || "",
            phoneNumber: phoneNumber || "",
          });
          onLogin();
          navigation.navigate("Navbar");
        } else {
          setIsLoading(false);
        }
      }
    }
  };

  const onNavigateEmail = () => {
    navigation.navigate("Register");
  };
  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "black" : "#fff" }}>
      <AuthenBackGround
        onPress={() => navigation.goBack()}
        isBack
      ></AuthenBackGround>
      <View style={{ position: "absolute", top: 140, left: 38 }}>
        <Text
          style={[
            styles.heading,
            {
              fontSize: width < 400 ? 42 : 46,
              color: isDarkMode ? colors.whiteText : "black",
            },
          ]}
        >
          Đăng ký
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.buttonWrapper}>
          <AuthButton
            content="Tiếp tục với Google"
            icon="google"
            onAccess={googleServiceHandler}
            isDarkMode={isDarkMode}
            width={width}
          ></AuthButton>
        </View>
        <View
          style={{
            marginVertical: 12,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.whiteLine}></View>
          <Text
            style={{
              fontFamily: baloo2Fonts.medium,
              fontSize: 24,
              marginHorizontal: 24,
              color: isDarkMode ? colors.whiteText : "black",
            }}
          >
            hoặc
          </Text>
          <View style={styles.whiteLine}></View>
        </View>
        <AuthButton
          content="Đăng ký bằng email"
          icon="email"
          onAccess={onNavigateEmail}
          isDarkMode={isDarkMode}
          width={width}
        ></AuthButton>
      </View>
    </View>
  );
};

export default AskRegister;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  heading: {
    fontFamily: montserratFonts.extra,
    fontSize: 46,
    lineHeight: 78,
  },
  buttonWrapper: {
    gap: 12,
  },
  whiteLine: {
    width: 100,
    borderWidth: 0.25,
    borderColor: colors.placeHolder,
    marginTop: 6,
  },
});
