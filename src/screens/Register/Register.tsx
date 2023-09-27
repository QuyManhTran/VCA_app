import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./style";
import Button from "../../components/Button";
import UserIcon from "../../../assets/icons/UserIcon";
import EyeIcon from "../../../assets/icons/EyeIcon";
import HideEyeIcon from "../../../assets/icons/HideEyeIcon";
import { colors } from "../../../constants";
import { RouterProps } from "../Splash/Splash";
import {
  isEmail as isRealEmail,
  isLoginPassword,
  isSpace,
} from "../../utilies/validation";
import useDebounce from "../../../hooks/useDebounce";
import EmailIcon from "../../../assets/icons/EmailIcon";
import fontFamilies, { montserratFonts } from "../../../constants/fontFamiles";
import AuthenBackGround from "../../components/AuthenBackGround";
import NavButton from "../../components/NavButton";
import screenWidth from "../../../constants/screenWidth";

const Register = ({ route, navigation }: RouterProps) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [isHidePassword, setIsHidePassWord] = useState(true);
  const debounce = useDebounce(password, 500);
  const emailDebounce = useDebounce(email, 500);
  const width = screenWidth();
  const onRegister = () => {
    if (!isValidated) {
      if (!userName.length) {
        alert("Username can not be blank!");
      } else if (!isEmail) {
        alert("Email is not in correct format or being empty!");
      } else {
        alert("Password is not in correct format or being empty!");
      }
    } else {
      // Alert.alert(JSON.stringify({ userName, email, password }));
      navigation.navigate("SuccessfullyChange", {
        from: "Register",
      });
    }
  };

  const handleUserName = (text: string) => {
    setUserName(text);
  };

  const handleEmail = (text: string) => {
    setIsEmail(true);
    if (!isSpace(text)) {
      setEmail(text);
    }
  };

  const handlePassword = (text: string) => {
    setIsPassword(true);
    if (!isSpace(text)) {
      setPassword(text);
    }
  };

  const onLogin = () => {
    navigation.navigate("Login");
  };

  useEffect(() => {
    const isMail = isRealEmail(emailDebounce);
    const isPass = isLoginPassword(debounce);
    const isRealValidate =
      isPass &&
      password.length > 0 &&
      isMail &&
      emailDebounce.length > 0 &&
      userName.length > 0;
    setIsPassword(isPass);
    setIsEmail(isMail);
    if (isValidated !== isRealValidate) {
      setIsValidated(isRealValidate);
    }
  }, [userName, emailDebounce, debounce]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <AuthenBackGround></AuthenBackGround>
        <View style={styles.wrapper}>
          <Text style={styles.heading}>Sign up</Text>
          <Button loginStyle={true}>
            <View style={styles.icon}>
              <UserIcon></UserIcon>
            </View>
            <TextInput
              placeholder="User Name"
              style={[styles.input]}
              value={userName}
              onChangeText={handleUserName}
              spellCheck={false}
              underlineColorAndroid={"transparent"}
              selectionColor={colors.primary}
            ></TextInput>
          </Button>
          <Button loginStyle={true}>
            <View style={[styles.icon, , { marginTop: 1 }]}>
              <EmailIcon size={24}></EmailIcon>
            </View>
            <TextInput
              placeholder="Email"
              style={[
                styles.input,
                {
                  color: !isEmail ? "red" : undefined,
                },
              ]}
              value={email}
              onChangeText={handleEmail}
              spellCheck={false}
              underlineColorAndroid={"transparent"}
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
          </Button>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onRegister}
            style={{
              alignSelf: "flex-end",
              marginRight: width < 400 ? 26 : 34,
              marginTop: 34,
            }}
          >
            <NavButton>Create</NavButton>
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
            Already have an account?{" "}
          </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={onLogin}>
            <Text
              style={{
                color: colors.primary,
                fontSize: 18,
                fontFamily: montserratFonts.semi,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;
