import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "./style";
import { colors } from "../../../../constants";
import Button from "../../../components/Button";
import fontFamilies from "../../../../constants/fontFamiles";
import { RouterProps } from "../../Splash/Splash";
import EyeIcon from "../../../../assets/icons/EyeIcon";
import HideEyeIcon from "../../../../assets/icons/HideEyeIcon";
import useDebounce from "../../../../hooks/useDebounce";
import { isLoginPassword, isSpace } from "../../../utilies/validation";
import AuthenBackGround from "../../../components/AuthenBackGround";
import NavButton from "../../../components/NavButton";
import screenWidth from "../../../../constants/screenWidth";
import Modal from "../../../components/Modal";
import ThemeContext from "../../../utilies/theme";

const ResetPassword = ({ route, navigation }: RouterProps) => {
  const { isDarkMode } = useContext(ThemeContext);
  const keyBoardUp = useRef(new Animated.Value(141)).current;
  const arrowUp = useRef(new Animated.Value(72)).current;
  const [isModal, setIsModal] = useState(false);
  const [isHidePassword, setIsHidePassWord] = useState(true);
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordDebounce = useDebounce(password, 500);
  const width = screenWidth();
  const onSave = () => {
    if (password !== confirmPassword || !isPassword || password.length === 0) {
      setIsModal(true);
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
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      if (width < 400) {
        Animated.timing(keyBoardUp, {
          toValue: 100,
          duration: 500,
          useNativeDriver: false,
        }).start();
        Animated.timing(arrowUp, {
          toValue: 32,
          duration: 500,
          useNativeDriver: false,
        }).start();
      }
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      if (width < 400) {
        Animated.timing(keyBoardUp, {
          toValue: 141,
          duration: 500,
          useNativeDriver: false,
        }).start();
        Animated.timing(arrowUp, {
          toValue: 72,
          duration: 500,
          useNativeDriver: false,
        }).start();
      }
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    const isPass = isLoginPassword(passwordDebounce);
    setIsPassword(isPass);
  }, [passwordDebounce]);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? "black" : "#fff" },
        ]}
      >
        <AuthenBackGround
          onPress={() => navigation.goBack()}
          customStyle={{ top: arrowUp }}
        ></AuthenBackGround>
        <Animated.View style={[styles.wrapper, { marginTop: keyBoardUp }]}>
          <Text
            style={[
              styles.heading,
              {
                fontSize: width < 400 ? 48 : 50,
                color: isDarkMode ? "#fff" : "black",
              },
            ]}
          >
            Change Password
          </Text>
          <View style={{ marginTop: 16, marginBottom: 16 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: fontFamilies.bold,
                lineHeight: 24,
                color: isDarkMode ? "#fff" : "black",
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
                {!isHidePassword && (
                  <EyeIcon color={isDarkMode ? "#fff" : "black"}></EyeIcon>
                )}
                {isHidePassword && (
                  <HideEyeIcon
                    color={isDarkMode ? "#fff" : "black"}
                  ></HideEyeIcon>
                )}
              </View>
            </TouchableOpacity>
            <TextInput
              placeholder="New Password"
              style={[
                styles.input,
                {
                  color: !isPassword ? "red" : isDarkMode ? "#fff" : "black",
                },
              ]}
              placeholderTextColor={isDarkMode ? colors.placeHolder : undefined}
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
                {!isHidePassword && (
                  <EyeIcon color={isDarkMode ? "#fff" : "black"}></EyeIcon>
                )}
                {isHidePassword && (
                  <HideEyeIcon
                    color={isDarkMode ? "#fff" : "black"}
                  ></HideEyeIcon>
                )}
              </View>
            </TouchableOpacity>
            <TextInput
              placeholder="Confirm Password"
              style={[styles.input, { color: isDarkMode ? "#fff" : "black" }]}
              placeholderTextColor={isDarkMode ? colors.placeHolder : undefined}
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
        </Animated.View>
        {isModal && (
          <Modal
            title="Password"
            content={`password don't match`}
            onPress={() => setIsModal(false)}
          ></Modal>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ResetPassword;
