import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
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

const Register = ({ route, navigation }: RouterProps) => {
  const keyBoardUp = useRef(new Animated.Value(141)).current;
  const arrowUp = useRef(new Animated.Value(72)).current;
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
  const debounce = useDebounce(password, 500);
  const emailDebounce = useDebounce(email, 500);
  const width = screenWidth();
  const onRegister = () => {
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
      <View style={styles.container}>
        <AuthenBackGround
          onPress={() => navigation.goBack()}
          customStyle={{ top: arrowUp }}
        ></AuthenBackGround>
        <Animated.View style={[styles.wrapper, { marginTop: keyBoardUp }]}>
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
          ></Modal>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;