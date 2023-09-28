import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import styles from "./style";
import LockIcon from "../../../../assets/icons/LockIcon";
import { colors } from "../../../../constants";
import Button from "../../../components/Button";
import fontFamilies, {
  montserratFonts,
} from "../../../../constants/fontFamiles";
import { RouterProps } from "../../Splash/Splash";
import EyeIcon from "../../../../assets/icons/EyeIcon";
import HideEyeIcon from "../../../../assets/icons/HideEyeIcon";
import useDebounce from "../../../../hooks/useDebounce";
import { isLoginPassword, isSpace } from "../../../utilies/validation";
import AuthenBackGround from "../../../components/AuthenBackGround";
import NavButton from "../../../components/NavButton";
import screenWidth from "../../../../constants/screenWidth";

const ResetPassword = ({ route, navigation }: RouterProps) => {
  const [isHidePassword, setIsHidePassWord] = useState(true);
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordDebounce = useDebounce(password, 500);
  const width = screenWidth();
  const onSave = () => {
    if (password !== confirmPassword || !isPassword || password.length === 0) {
      alert("password do not match");
    } else {
      navigation.navigate("SuccessfullyChange");
    }
  };
  const handlePassword = (text: string) => {
    setIsPassword(true);
    if (!isSpace(text)) {
      setPassword(text);
    }
  };

  useEffect(() => {
    const isPass = isLoginPassword(passwordDebounce);
    setIsPassword(isPass);
  }, [passwordDebounce]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <AuthenBackGround
          onPress={() => navigation.goBack()}
        ></AuthenBackGround>
        <View style={styles.wrapper}>
          <Text style={[styles.heading, { fontSize: width < 400 ? 48 : 50 }]}>
            Change Password
          </Text>
          <View style={{ marginTop: 16, marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: fontFamilies.bold,
                lineHeight: 24,
              }}
            >
              Your password contains at least{" "}
              <Text style={{ color: colors.primary }}>8</Text> characters
            </Text>
          </View>
          <Button loginStyle>
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
              placeholder="New Password"
              style={[
                styles.input,
                {
                  color: !isPassword ? "red" : undefined,
                },
              ]}
              spellCheck={false}
              underlineColorAndroid={"transparent"}
              secureTextEntry={isHidePassword}
              selectionColor={colors.primary}
              value={password}
              onChangeText={handlePassword}
            ></TextInput>
          </Button>
          <Button loginStyle>
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
              placeholder="Confirm Password"
              style={styles.input}
              spellCheck={false}
              underlineColorAndroid={"transparent"}
              secureTextEntry={isHidePassword}
              selectionColor={colors.primary}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
            ></TextInput>
          </Button>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onSave}
            style={{
              alignSelf: "flex-end",
              marginRight: width < 400 ? 26 : 34,
              marginTop: 20,
            }}
          >
            <NavButton>Save</NavButton>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ResetPassword;
