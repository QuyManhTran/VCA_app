import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import styles from "./style";
import Button from "../../components/Button";
import UserIcon from "../../../assets/icons/UserIcon";
import EyeIcon from "../../../assets/icons/EyeIcon";
import HideEyeIcon from "../../../assets/icons/HideEyeIcon";
import { colors } from "../../../constants";
import { RouterProps } from "../Splash/Splash";
import { isEmail, isLoginPassword, isSpace } from "../../utilies/validation";

import useDebounce from "../../../hooks/useDebounce";
import AuthenBackGround from "../../components/AuthenBackGround";
import NavButton from "../../components/NavButton";
import { baloo2Fonts, montserratFonts } from "../../../constants/fontFamiles";
import screenWidth from "../../../constants/screenWidth";
import ThemeContext from "../../utilies/theme";
import * as loginService from "../../services/loginService";
const Login = ({ route, navigation }: RouterProps) => {
  const {
    isDarkMode,
    onUserId,
    onUserInfor,
    onLogin: onStoreStatus,
  } = useContext(ThemeContext);
  const width = screenWidth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [isUserName, setIsUserName] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [isHidePassword, setIsHidePassWord] = useState(true);
  const debounce = useDebounce(password, 500);
  const userDebounce = useDebounce(userName, 500);
  const onLogin = async () => {
    const response = await loginService.login(loginService.loginPath, {
      email: userName,
      password: password,
    });
    console.log(response.message);

    if (response.message !== 200) {
      alert("Tài khoản không tồn tại");
    } else {
      console.log(response.data?.user?._id);
      if (response.data?.user) {
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
        onStoreStatus();
      }
      navigation.navigate("Navbar");
    }
  };

  const onForgotPassword = () => {
    navigation.navigate("EmailRequirement");
  };

  const onMoveRegister = () => {
    navigation.navigate("AskRegister");
  };

  const handleUserName = (text: string) => {
    setIsUserName(true);
    if (!isSpace(text)) {
      setUserName(text);
    }
  };

  const handlePassword = (text: string) => {
    setIsPassword(true);
    if (!isSpace(text)) {
      setPassword(text);
    }
  };

  useEffect(() => {
    const isUserName = isEmail(userDebounce);
    const isPass = isLoginPassword(debounce);
    setIsPassword(isPass);
    setIsUserName(isUserName);
    const isRealValidated =
      isPass && debounce.length > 0 && isUserName && userDebounce.length > 0;
    if (isValidated !== isRealValidated) {
      setIsValidated(isRealValidated);
    }
  }, [userDebounce, debounce]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? colors.darkTheme : "#fff" },
        ]}
      >
        <AuthenBackGround
          onPress={() => navigation.goBack()}
        ></AuthenBackGround>
        <View style={styles.wrapper}>
          <Text
            style={[
              styles.heading,
              { color: isDarkMode ? colors.whiteText : "black" },
            ]}
          >
            Đăng nhập
          </Text>
          <Text
            style={[
              styles.requirement,
              {
                fontSize: width < 400 ? 15 : 16,
                color: isDarkMode ? colors.whiteText : "black",
              },
            ]}
          >
            Vui lòng đăng nhập để tiếp tục
          </Text>
          <Button loginStyle={true}>
            <View style={styles.icon}>
              <UserIcon
                color={isDarkMode ? colors.whiteText : "black"}
              ></UserIcon>
            </View>
            <TextInput
              placeholder="Email"
              style={[
                styles.input,
                {
                  color: !isUserName
                    ? "red"
                    : isDarkMode
                    ? colors.whiteText
                    : "black",
                },
              ]}
              placeholderTextColor={isDarkMode ? colors.placeHolder : undefined}
              value={userName}
              onChangeText={handleUserName}
              spellCheck={false}
              // underlineColorAndroid={"transparent"}
              selectionColor={colors.primary}
            ></TextInput>
          </Button>
          <Button loginStyle={true}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsHidePassWord(!isHidePassword)}
            >
              <View style={styles.icon}>
                {!isHidePassword && (
                  <EyeIcon
                    color={isDarkMode ? colors.whiteText : "black"}
                  ></EyeIcon>
                )}
                {isHidePassword && (
                  <HideEyeIcon
                    color={isDarkMode ? colors.whiteText : "black"}
                  ></HideEyeIcon>
                )}
              </View>
            </TouchableOpacity>
            <TextInput
              secureTextEntry={isHidePassword}
              placeholder="Mật khẩu"
              style={[
                styles.input,
                {
                  color: !isPassword
                    ? "red"
                    : isDarkMode
                    ? colors.whiteText
                    : "black",
                },
              ]}
              placeholderTextColor={isDarkMode ? colors.placeHolder : undefined}
              selectionColor={colors.primary}
              value={password}
              onChangeText={handlePassword}
              spellCheck={false}
            ></TextInput>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={onForgotPassword}
              style={{ justifyContent: "center", paddingRight: 12 }}
            >
              <Text style={styles.forgotPassword}>Quên</Text>
            </TouchableOpacity>
          </Button>
          <TouchableOpacity
            activeOpacity={0.7}
            disabled={!isValidated}
            onPress={onLogin}
            style={{
              alignSelf: "flex-end",
              marginRight: width < 400 ? 26 : 34,
              marginTop: 34,
              opacity: !isValidated ? 0.5 : 1,
            }}
          >
            <NavButton>Đăng nhập</NavButton>
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: "absolute",
            top: width < 400 ? 740 : 798,
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: width < 400 ? 20 : 22,
              fontFamily: baloo2Fonts.semi,
              color: isDarkMode ? colors.whiteText : "black",
            }}
          >
            Chưa có mật khẩu?{" "}
          </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={onMoveRegister}>
            <Text
              style={{
                color: colors.primary,
                fontSize: width < 400 ? 20 : 22,
                fontFamily: baloo2Fonts.semi,
              }}
            >
              Đăng ký
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
