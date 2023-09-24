import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Alert,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./style";
import Button from "../../components/Button";
import UserIcon from "../../../assets/icons/UserIcon";
import EyeIcon from "../../../assets/icons/EyeIcon";
import HideEyeIcon from "../../../assets/icons/HideEyeIcon";
import GoogleIcon from "../../../assets/icons/GoogleIcon";
import { colors } from "../../../constants";
import LockIcon from "../../../assets/icons/LockIcon";
import { RouterProps } from "../Splash/Splash";
import {
  isEmail as isRealEmail,
  isLoginPassword,
  isSpace,
} from "../../utilies/validation";
import useDebounce from "../../../hooks/useDebounce";
import EmailIcon from "../../../assets/icons/EmailIcon";
import { montserratFonts } from "../../../constants/fontFamiles";

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
        <View style={styles.lockIcon}>
          <LockIcon fill color={colors.lock} size={40}></LockIcon>
        </View>
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
        {/* <Text style={styles.selection}>or login with</Text> */}
        {/* <Button customeStyles={{ marginVertical: 20 }}>
          <View style={styles.icon}>
            <GoogleIcon width="36px" height="36px"></GoogleIcon>
          </View>
          <Text style={{ fontSize: 20 }}>Continue with Google</Text>
        </Button> */}

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onRegister}
          style={{ marginTop: 40 }}
        >
          <View style={[styles.create]}>
            <Text
              style={[
                {
                  fontSize: 24,
                  color: "#fff",
                  fontFamily: montserratFonts.bold,
                },
              ]}
            >
              Creat account
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.forgotPassword}>Already have an account? </Text>
          <TouchableOpacity activeOpacity={0.6} onPress={onLogin}>
            <Text style={{ ...styles.forgotPassword, color: colors.primary }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;
