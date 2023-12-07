import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import React, { useContext } from "react";
import styles from "./style";
import { colors } from "../../../../constants";
import Button from "../../../components/Button";
import fontFamilies, {
  montserratFonts,
} from "../../../../constants/fontFamiles";
import { RouterProps } from "../../Splash/Splash";
import EmailIcon from "../../../../assets/icons/EmailIcon";
import { isSpace } from "../../../utilies/validation";
import useDebounce from "../../../../hooks/useDebounce";
import { isEmail as emailValidation } from "../../../utilies/validation";
import AuthenBackGround from "../../../components/AuthenBackGround";
import NavButton from "../../../components/NavButton";
import screenWidth from "../../../../constants/screenWidth";
import Modal from "../../../components/Modal";
import ThemeContext from "../../../utilies/theme";
import { sendEmailService } from "../../../services/forgotService";
const EmailRequirement = ({ route, navigation }: RouterProps) => {
  const { isDarkMode } = useContext(ThemeContext);
  const width = screenWidth();
  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isExistEmail, setIsExistEmail] = useState(true);
  const emailDebounce = useDebounce(email, 500);
  const onSendCode = async () => {
    // if otp is sent, will be navigated
    if (isEmail && email.length > 0) {
      const response = await sendEmailService.sendEmail(
        sendEmailService.sendEmailPath,
        {
          email: email,
        }
      );
      if (response.message !== 200) {
        setIsExistEmail(false);
        setIsModal(true);
      } else {
        navigation.navigate("CodeVerifying", {
          email: email,
        });
      }
    } else {
      setIsModal(true);
    }
  };
  const handleEmail = (text: string) => {
    setIsEmail(true);
    if (!isSpace(text)) {
      setEmail(text);
    }
  };

  useEffect(() => {
    const isRealEmail = emailValidation(emailDebounce);
    setIsEmail(isRealEmail);
  }, [emailDebounce]);

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
        ></AuthenBackGround>
        <View style={styles.wrapper}>
          <Text
            style={[
              styles.heading,
              {
                fontSize: width < 400 ? 52 : 52,
                color: isDarkMode ? "#fff" : "black",
              },
            ]}
          >
            Quên
          </Text>
          <Text
            style={[
              styles.heading,
              {
                marginTop: -28,
                fontSize: width < 400 ? 52 : 52,
                color: isDarkMode ? "#fff" : "black",
              },
            ]}
          >
            mật khẩu
          </Text>
          <View style={{ marginTop: 16, marginBottom: 32 }}>
            <Text
              style={{
                fontSize: width < 400 ? 18 : 20,
                color: isDarkMode ? "#fff" : "black",
                fontFamily: fontFamilies.semi,
              }}
            >
              Nhập email của bạn, chúng tôi sẽ gửi cho bạn{" "}
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: montserratFonts.semi,
                }}
              >
                mã xác thực{" "}
              </Text>
            </Text>
          </View>
          <Button loginStyle>
            <View style={[styles.icon, { marginTop: 1 }]}>
              <EmailIcon fill color={isDarkMode ? "#fff" : "black"}></EmailIcon>
            </View>
            <TextInput
              value={email}
              placeholder="Email"
              style={[
                styles.input,
                { color: !isEmail ? "red" : isDarkMode ? "#fff" : "black" },
              ]}
              placeholderTextColor={isDarkMode ? colors.placeHolder : undefined}
              spellCheck={false}
              underlineColorAndroid={"transparent"}
              selectionColor={colors.primary}
              onChangeText={handleEmail}
            ></TextInput>
          </Button>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onSendCode}
            style={{
              alignSelf: "flex-end",
              marginRight: width < 400 ? 26 : 34,
              marginTop: 34,
            }}
          >
            <NavButton>Tiếp tục</NavButton>
          </TouchableOpacity>
        </View>
        {isModal && (
          <Modal
            title={"Email"}
            content={
              !isExistEmail
                ? "Email do not exist!"
                : email.length === 0
                ? `Email can't be empty!`
                : `Email isn't in correct format!`
            }
            isDarkMode={isDarkMode}
            onPress={() => {
              setIsModal(false), setIsExistEmail(true);
            }}
          ></Modal>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EmailRequirement;
