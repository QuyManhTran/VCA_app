import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import styles from "./style";
import { colors } from "../../../../constants";
import { montserratFonts } from "../../../../constants/fontFamiles";
import LockIcon from "../../../../assets/icons/LockIcon";
import Button from "../../../components/Button";
import { RouterProps } from "../../Splash/Splash";
import { FontAwesome } from "@expo/vector-icons";
import { isOTP } from "../../../utilies/validation";
const CodeVerifying = ({ route, navigation }: RouterProps) => {
  const [otp, setOTP] = useState("");
  const onChangePassword = () => {
    if (isOTP(otp)) {
      navigation.navigate("ResetPassword");
    } else {
      alert("OTP code must be 6 digits");
    }
  };
  const reSend = () => {
    Alert.alert("resending...");
  };
  const handleOTP = (text: string) => {
    setOTP(text);
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.lockIcon}>
          <LockIcon fill color={colors.lock} size={40}></LockIcon>
        </View>
        <View style={{ marginTop: 256, width: "100%" }}>
          <Text style={styles.heading}>Enter code</Text>
        </View>
        <View style={{ marginTop: 14, width: 260, marginBottom: 24 }}>
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              fontFamily: montserratFonts.regular,
            }}
          >
            Enter the OTP code we've sent to your email address
          </Text>
        </View>
        <Button loginStyle>
          <View style={[styles.icon, { marginTop: 4 }]}>
            <FontAwesome name="pencil-square-o" size={24} color="black" />
          </View>
          <TextInput
            value={otp}
            placeholder="Enter here"
            style={styles.input}
            spellCheck={false}
            underlineColorAndroid={"transparent"}
            selectionColor={colors.primary}
            onChangeText={handleOTP}
          ></TextInput>
        </Button>
        <TouchableOpacity activeOpacity={0.7} onPress={onChangePassword}>
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
        <TouchableOpacity activeOpacity={0.7} onPress={reSend}>
          <View style={{ marginTop: 16 }}>
            <Text style={{ fontSize: 16 }}>
              Do you want us to resend code?{" "}
              <Text
                style={{
                  color: colors.primary,
                  textDecorationLine: "underline",
                }}
              >
                Resend{" "}
              </Text>
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CodeVerifying;
