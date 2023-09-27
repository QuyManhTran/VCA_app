import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Alert,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import { montserratFonts } from "../../../constants/fontFamiles";
import screenWidth from "../../../constants/screenWidth";

const Login = ({ route, navigation }: RouterProps) => {
  const width = screenWidth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [isUserName, setIsUserName] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [isHidePassword, setIsHidePassWord] = useState(true);
  const debounce = useDebounce(password, 500);
  const userDebounce = useDebounce(userName, 500);
  const onLogin = () => {
    // Alert.alert(JSON.stringify({ userName, password }));
    navigation.navigate("Navbar");
  };

  const onForgotPassword = () => {
    navigation.navigate("EmailRequirement");
  };

  const onMoveRegister = () => {
    navigation.navigate("Register");
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
      <View style={styles.container}>
        <AuthenBackGround></AuthenBackGround>
        <View style={styles.wrapper}>
          <Text style={styles.heading}>Login</Text>
          <Text style={styles.requirement}>Please sign in to continue</Text>
          <Button loginStyle={true}>
            <View style={styles.icon}>
              <UserIcon></UserIcon>
            </View>
            <TextInput
              placeholder="Email"
              style={[
                styles.input,
                {
                  color: !isUserName ? "red" : undefined,
                },
              ]}
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
                {!isHidePassword && <EyeIcon></EyeIcon>}
                {isHidePassword && <HideEyeIcon></HideEyeIcon>}
              </View>
            </TouchableOpacity>
            <TextInput
              secureTextEntry={isHidePassword}
              placeholder="Password"
              style={[
                styles.input,
                {
                  color: !isPassword ? "red" : undefined,
                },
              ]}
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
              <Text style={styles.forgotPassword}>Forgot</Text>
            </TouchableOpacity>
          </Button>
          {/* <Text style={styles.selection}>or login with</Text>
          <Button customeStyles={{ marginVertical: 20 }}>
            <View style={styles.icon}>
              <GoogleIcon width="36px" height="36px"></GoogleIcon>
            </View>
            <Text style={{ fontSize: 20 }}>Continue with Google</Text>
          </Button> */}

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
            <NavButton>Login</NavButton>
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
              fontSize: width < 400 ? 16 : 18,
              fontFamily: montserratFonts.semi,
            }}
          >
            You don't have an account?{" "}
          </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={onMoveRegister}>
            <Text
              style={{
                color: colors.primary,
                fontSize: width < 400 ? 16 : 18,
                fontFamily: montserratFonts.semi,
              }}
            >
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
