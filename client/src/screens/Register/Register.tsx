import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Animated,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
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
import Modal from "../../components/Modal";
import ThemeContext from "../../utilies/theme";
import * as registerService from "../../services/signupService";

const Register = ({ route, navigation }: RouterProps) => {
  const { isDarkMode } = useContext(ThemeContext);
  const keyBoardUp = useRef(new Animated.Value(141)).current;
  const arrowUp = useRef(new Animated.Value(72)).current;
  const opacity = useRef(new Animated.Value(0.5)).current;
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [isHidePassword, setIsHidePassWord] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [isPending, setIsPending] = useState(false);
  const debounce = useDebounce(password, 500);
  const emailDebounce = useDebounce(email, 500);
  const width = screenWidth();
  const onRegister = async () => {
    if (!isValidated) {
      if (!userName.length) {
        const title = "UserName";
        const content = "Username can not be blank!";
        if (title !== modalTitle) {
          setModalTitle(title);
          setModalContent(content);
        }
        setIsModal(true);
      } else if (!isEmail || email.length === 0) {
        const title = "Email";
        const content =
          email.length === 0
            ? `Email can't be empty!`
            : `Email isn't in correct format!`;
        setModalTitle(title);
        setModalContent(content);
        setIsModal(true);
      } else {
        const title = "Password";
        const content =
          password.length === 0
            ? `Password can't be empty!`
            : `Password must contain at least 8 characters`;
        setModalTitle(title);
        setModalContent(content);
        setIsModal(true);
      }
    } else {
      try {
        setIsPending(true);
        const response = await registerService.register(
          registerService.pathRegister,
          {
            username: userName,
            email: email,
            password: password,
          }
        );
        if (response) {
          setIsPending(false);
          if (response.message !== 200) {
            setModalTitle("Lỗi đăng ký");
            setModalContent("Có lỗi xảy ra trong quá trình đăng ký");
            setIsModal(true);
          } else {
            navigation.navigate("SuccessfullyChange", {
              from: "Register",
            });
          }
        }
      } catch (error) {
        console.log("memeya", error);
      }
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
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, []);

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
      <Animated.View
        style={[
          styles.container,
          { backgroundColor: isDarkMode ? "black" : "#fff", opacity: opacity },
        ]}
      >
        <AuthenBackGround
          onPress={() => navigation.goBack()}
          customStyle={{ top: arrowUp }}
        ></AuthenBackGround>
        <Animated.View style={[styles.wrapper, { marginTop: keyBoardUp }]}>
          <Text
            style={[styles.heading, { color: isDarkMode ? "#fff" : "black" }]}
          >
            Sign up
          </Text>
          <Button loginStyle={true}>
            <View style={styles.icon}>
              <UserIcon color={isDarkMode ? "#fff" : "black"}></UserIcon>
            </View>
            <TextInput
              placeholder="User Name"
              style={[styles.input, { color: isDarkMode ? "#fff" : "black" }]}
              placeholderTextColor={isDarkMode ? colors.placeHolder : undefined}
              value={userName}
              onChangeText={handleUserName}
              spellCheck={false}
              underlineColorAndroid={"transparent"}
              selectionColor={colors.primary}
            ></TextInput>
          </Button>
          <Button loginStyle={true}>
            <View style={[styles.icon, , { marginTop: 1 }]}>
              <EmailIcon
                size={24}
                color={isDarkMode ? "#fff" : "black"}
              ></EmailIcon>
            </View>
            <TextInput
              placeholder="Email"
              style={[
                styles.input,
                {
                  color: !isEmail ? "red" : isDarkMode ? "#fff" : "black",
                },
              ]}
              placeholderTextColor={isDarkMode ? colors.placeHolder : undefined}
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
              secureTextEntry={isHidePassword}
              placeholder="Password"
              style={[
                styles.input,
                {
                  color: !isEmail ? "red" : isDarkMode ? "#fff" : "black",
                },
              ]}
              placeholderTextColor={isDarkMode ? colors.placeHolder : undefined}
              selectionColor={colors.primary}
              value={password}
              onChangeText={handlePassword}
              spellCheck={false}
            ></TextInput>
          </Button>
          <TouchableOpacity
            disabled={isPending}
            activeOpacity={0.7}
            onPress={onRegister}
            style={{
              alignSelf: "flex-end",
              marginRight: width < 400 ? 26 : 34,
              marginTop: 34,
              opacity: isPending ? 0.6 : 1,
            }}
          >
            <NavButton
              customeStyle={isPending && { width: "auto" }}
              customeText={
                isPending && {
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: 12,
                }
              }
            >
              {isPending && (
                <ActivityIndicator
                  color={"white"}
                  style={{ marginRight: 24 }}
                ></ActivityIndicator>
              )}
              {isPending ? "Sending" : "Create"}
            </NavButton>
          </TouchableOpacity>
        </Animated.View>
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
              color: isDarkMode ? "#fff" : "black",
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
        {isModal && (
          <Modal
            title={modalTitle}
            content={modalContent}
            onPress={() => setIsModal(false)}
            isDarkMode={isDarkMode}
          ></Modal>
        )}
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Register;
