import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import styles from "./style";
import { colors } from "../../../../constants";
import fontFamilies, {
  montserratFonts,
} from "../../../../constants/fontFamiles";
import Button from "../../../components/Button";
import { RouterProps } from "../../Splash/Splash";
import { FontAwesome } from "@expo/vector-icons";
import { isOTP } from "../../../utilies/validation";
import AuthenBackGround from "../../../components/AuthenBackGround";
import NavButton from "../../../components/NavButton";
import screenWidth from "../../../../constants/screenWidth";
import Modal from "../../../components/Modal";
import ThemeContext from "../../../utilies/theme";
const CodeVerifying = ({ route, navigation }: RouterProps) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [otp, setOTP] = useState("");
  const [isModal, setIsModal] = useState(false);
  const width = screenWidth();
  const onChangePassword = () => {
    if (isOTP(otp)) {
      navigation.navigate("ResetPassword");
    } else {
      setIsModal(true);
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
                fontSize: width < 400 ? 40 : 46,
                color: isDarkMode ? "#fff" : "black",
              },
            ]}
          >
            Enter code
          </Text>
          <View style={{ marginTop: 14, width: 260, marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: fontFamilies.bold,
                color: isDarkMode ? "#fff" : "black",
              }}
            >
              Enter{" "}
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: fontFamilies.bold,
                }}
              >
                Verification Code
              </Text>{" "}
              we've sent you
            </Text>
          </View>
          <Button loginStyle>
            <View style={[styles.icon, { marginTop: 4 }]}>
              <FontAwesome
                name="pencil-square-o"
                size={24}
                color={isDarkMode ? "#fff" : "black"}
              />
            </View>
            <TextInput
              value={otp}
              placeholder="Enter here"
              style={[styles.input, { color: isDarkMode ? "#fff" : "black" }]}
              spellCheck={false}
              underlineColorAndroid={"transparent"}
              selectionColor={colors.primary}
              onChangeText={handleOTP}
              placeholderTextColor={isDarkMode ? colors.placeHolder : undefined}
            ></TextInput>
          </Button>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onChangePassword}
            style={{
              alignSelf: "flex-end",
              marginRight: width < 400 ? 26 : 34,
              marginTop: 20,
            }}
          >
            <NavButton>Confirm</NavButton>
          </TouchableOpacity>
        </View>
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
              fontSize: 18,
              fontFamily: montserratFonts.semi,
              color: isDarkMode ? "#fff" : "black",
            }}
          >
            Don't receive code?{" "}
          </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={reSend}>
            <Text
              style={{
                color: colors.primary,
                fontSize: 18,
                fontFamily: fontFamilies.semi,
              }}
            >
              Resend
            </Text>
          </TouchableOpacity>
        </View>
        {isModal && (
          <Modal
            title="OTP Code"
            content="OTP code must be 6 digits"
            onPress={() => setIsModal(false)}
          ></Modal>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CodeVerifying;
