import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import styles from "./style";
import LockIcon from "../../../../assets/icons/LockIcon";
import { colors } from "../../../../constants";
import Button from "../../../components/Button";
import { montserratFonts } from "../../../../constants/fontFamiles";
import { RouterProps } from "../../Splash/Splash";
import EmailIcon from "../../../../assets/icons/EmailIcon";
import { isSpace } from "../../../utilies/validation";
import useDebounce from "../../../../hooks/useDebounce";
import { isEmail as emailValidation } from "../../../utilies/validation";

const EmailRequirement = ({ route, navigation }: RouterProps) => {
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
        <View style={styles.lockIcon}>
          <LockIcon fill color={colors.lock} size={40}></LockIcon>
        </View>
        <View style={{ marginTop: 256, width: 256 }}>
          <Text style={styles.heading}>Forgot Password</Text>
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
        <TouchableOpacity activeOpacity={0.7} onPress={onSendCode}>
          <View
            style={{
              width: 320,
              height: 66,
              borderRadius: 36,
              backgroundColor: colors.primary,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 4,
            }}
          >
            <Text
              style={{
                fontSize: 26,
                fontFamily: montserratFonts.medium,
                color: "#fff",
              }}
            >
              Continue
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{ marginTop: 16 }}>
          <Text style={{ fontSize: 16 }}>
            We'll send you a{" "}
            <Text
              style={{ color: colors.primary, textDecorationLine: "underline" }}
            >
              Verification Code{" "}
            </Text>
            to your email
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default EmailRequirement;
