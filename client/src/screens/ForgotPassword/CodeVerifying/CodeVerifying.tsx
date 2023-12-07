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
  baloo2Fonts,
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
import { sendOTPService } from "../../../services/forgotService";
const CodeVerifying = ({ route, navigation }: RouterProps) => {
  const { email } = route.params;
  const { isDarkMode } = useContext(ThemeContext);
  const [otp, setOTP] = useState("");
  const [isErrorOTP, setIsErrorOTP] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const width = screenWidth();
  const onChangePassword = async () => {
    if (isOTP(otp)) {
      setIsLoading(true);
      const response = await sendOTPService.sendOTP(
        sendOTPService.sendOTPPath,
        {
          email: email,
          otp: otp,
        }
      );
      if (response.message !== 200) {
        setIsErrorOTP(true);
        setIsModal(true);
        setIsLoading(false);
      } else {
        navigation.navigate("ResetPassword", {
          email: email,
        });
        setIsLoading(false);
      }
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
                fontSize: width < 400 ? 48 : 52,
                color: isDarkMode ? "#fff" : "black",
              },
            ]}
          >
            Nhập mã
          </Text>
          <View style={{ marginTop: 14, width: 260, marginBottom: 24 }}>
            <Text
              style={{
                fontSize: 16,
                fontFamily: fontFamilies.bold,
                color: isDarkMode ? "#fff" : "black",
              }}
            >
              Vui lòng nhập{" "}
              <Text
                style={{
                  color: colors.primary,
                  fontFamily: fontFamilies.bold,
                  lineHeight: 24,
                }}
              >
                mã xác thực
              </Text>{" "}
              Chúng tôi vừa gửi bạn
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
              placeholder="Mã xác thực"
              style={[styles.input, { color: isDarkMode ? "#fff" : "black" }]}
              spellCheck={false}
              underlineColorAndroid={"transparent"}
              selectionColor={colors.primary}
              onChangeText={handleOTP}
              placeholderTextColor={isDarkMode ? colors.placeHolder : undefined}
              keyboardType="number-pad"
            ></TextInput>
          </Button>
          <TouchableOpacity
            disabled={isLoading}
            activeOpacity={0.7}
            onPress={onChangePassword}
            style={{
              alignSelf: "flex-end",
              marginRight: width < 400 ? 26 : 34,
              marginTop: 20,
              opacity: isLoading ? 0.5 : 1,
            }}
          >
            <NavButton isLoading={isLoading}>
              {isLoading ? "Đang xác thực" : "Xác nhận"}
            </NavButton>
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
              fontSize: width < 400 ? 20 : 22,
              fontFamily: baloo2Fonts.semi,
              color: isDarkMode ? "#fff" : "black",
            }}
          >
            Bạn chưa nhận được?{" "}
          </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={reSend}>
            <Text
              style={{
                fontSize: width < 400 ? 20 : 22,
                color: colors.primary,
                fontFamily: baloo2Fonts.semi,
              }}
            >
              Gửi lại
            </Text>
          </TouchableOpacity>
        </View>
        {isModal && (
          <Modal
            title="OTP Code"
            content={isErrorOTP ? "Nhập sai mã" : "OTP code must be 6 digits"}
            onPress={() => {
              setIsModal(false);
              setIsErrorOTP(false);
            }}
            isDarkMode={isDarkMode}
          ></Modal>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CodeVerifying;
