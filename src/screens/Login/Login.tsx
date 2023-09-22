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
import { isEmail, isLoginPassword, isSpace } from "../../utilies/validation";
import { userLength } from "../../../constants/length";
import useDebounce from "../../../hooks/useDebounce";

const Login = ({ route, navigation }: RouterProps) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [isUserName, setIsUserName] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [isHidePassword, setIsHidePassWord] = useState(true);
  const debounce = useDebounce(password, 500);
  const userDebounce = useDebounce(userName, 500);
  const onLogin = () => {
    Alert.alert(JSON.stringify({ userName, password }));
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

  const onForgotPassword = () => {
    navigation.navigate("EmailRequirement");
  };

  useEffect(() => {
    const isUserName = isEmail(userDebounce);
    const isPass = isLoginPassword(debounce);
    setIsPassword(isPass);
    setIsUserName(isUserName);
    if (isValidated !== (isPass && isUserName && userDebounce.length > 0)) {
      setIsValidated(isPass && isUserName);
    }
  }, [userDebounce, debounce]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.lockIcon}>
          <LockIcon fill color={colors.lock} size={40}></LockIcon>
        </View>
        <Text style={styles.heading}>Login</Text>
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
        <Text style={styles.selection}>or login with</Text>
        <Button customeStyles={{ marginVertical: 20 }}>
          <View style={styles.icon}>
            <GoogleIcon width="36px" height="36px"></GoogleIcon>
          </View>
          <Text style={{ fontSize: 20 }}>Continue with Google</Text>
        </Button>
        <TouchableOpacity activeOpacity={0.6} onPress={onForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.6}
          disabled={!isValidated}
          onPress={onLogin}
        >
          <View
            style={[styles.continue, isValidated ? undefined : styles.disabled]}
          >
            <Text
              style={[
                { fontSize: 24 },
                isValidated ? undefined : styles.textDisabled,
              ]}
            >
              Continue
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
