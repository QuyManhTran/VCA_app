import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import styles from "./style";
import { colors } from "../../../../constants";
import Button from "../../../components/Button";
import { montserratFonts } from "../../../../constants/fontFamiles";
import { RouterProps } from "../../Splash/Splash";
import EmailIcon from "../../../../assets/icons/EmailIcon";
import { isSpace } from "../../../utilies/validation";
import useDebounce from "../../../../hooks/useDebounce";
import { isEmail as emailValidation } from "../../../utilies/validation";
import AuthenBackGround from "../../../components/AuthenBackGround";
import NavButton from "../../../components/NavButton";
import screenWidth from "../../../../constants/screenWidth";

const EmailRequirement = ({ route, navigation }: RouterProps) => {
  const width = screenWidth();
  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState(false);
  const emailDebounce = useDebounce(email, 500);
  const onSendCode = () => {
    // if otp is sent, will be navigated
    if (isEmail && email.length > 0) {
      navigation.navigate("CodeVerifying");
    } else {
      alert("Your email is not in the correct format");
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
      <View style={styles.container}>
        <AuthenBackGround></AuthenBackGround>
        <View style={styles.wrapper}>
          <Text style={[styles.heading, { fontSize: width < 400 ? 48 : 50 }]}>
            Forgot Password
          </Text>
          <View style={{ marginTop: 16, marginBottom: 32 }}>
            <Text style={{ fontSize: width < 400 ? 18 : 20 }}>
              Enter your email and we'll send you a{" "}
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: montserratFonts.semi,
                }}
              >
                Verification Code{" "}
              </Text>
            </Text>
          </View>
          <Button loginStyle>
            <View style={[styles.icon, { marginTop: 1 }]}>
              <EmailIcon fill></EmailIcon>
            </View>
            <TextInput
              value={email}
              placeholder="Email"
              style={[styles.input, { color: !isEmail ? "red" : undefined }]}
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
            <NavButton>Continue</NavButton>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EmailRequirement;
