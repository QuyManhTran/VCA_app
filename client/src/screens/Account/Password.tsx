import React, { memo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import LinearBackGround from "../../components/LinearBackGround";
import { colors } from "../../../constants";
import { baloo2Fonts } from "../../../constants/fontFamiles";
import { LinearGradient } from "expo-linear-gradient";
import {
  linearColors,
  navbarDarkLinearColors,
} from "../../../constants/colors";
import ToastNotify, { Status } from "../../components/ToastNotify/ToastNotify";
import { useHeaderHeight } from "@react-navigation/elements";
import { changePasswordService } from "../../services/profileService";

const Password = ({ route, navigation }) => {
  const { isDarkMode, email } = route.params;
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [status, setStatus] = useState<Status | null>(null);
  const [isPressEyeOld, setIsPressEyeOld] = useState(true);
  const [isPressEyeNew, setIsPressEyeNew] = useState(true);
  const [isPressEyeConfirm, setIsPressEyeConfirm] = useState(true);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const onBack = () => {
    navigation.goBack();
  };
  // call API
  const onSaveData = async () => {
    if (!newPassword.trim() || !confirmPassword.trim() || !oldPassword.trim()) {
      setIsLoading(false);
      setStatus("error");
      setMessage("Vui lòng nhập đủ thông tin");
    } else if (
      newPassword.trim() &&
      confirmPassword.trim() &&
      newPassword !== confirmPassword
    ) {
      setIsLoading(false);
      setStatus("error");
      setMessage("Mật khẩu không khớp");
    } else {
      setIsLoading(true);
      const response = await changePasswordService.changePassword(
        changePasswordService.changePasswordPath,
        {
          email: email,
          newPassword: newPassword,
          oldPassword: oldPassword,
        }
      );
      if (response.message !== 200) {
        setMessage(response.message);
        setIsLoading(false);
        setStatus("error");
      } else {
        setIsLoading(false);
        setStatus("success");
        setMessage("Đổi mật khẩu thành công");
      }
    }
  };

  const onToggleLoading = (result: boolean | null) => {
    setIsLoading(result);
  };

  const showConfirmationDialog = () => {
    return new Promise((resolve) => {
      Alert.alert(
        "Xác nhận",
        "Bạn có muốn thay đổi mật khẩu không?",
        [
          {
            text: "Hủy",
            onPress: () => resolve(false),
            style: "cancel",
          },
          {
            text: "Đồng ý",
            onPress: () => resolve(true),
          },
        ],
        { cancelable: false }
      );
    });
  };
  const height = useHeaderHeight();
  return (
    <>
      <View
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          backgroundColor: isDarkMode ? colors.darkTheme : "#fff",
        }}
      ></View>
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        <ScrollView>
          <Pressable
            onPress={Keyboard.dismiss}
            style={{
              flexGrow: 1,
              backgroundColor: isDarkMode ? colors.darkTheme : "#fff",
            }}
          >
            <LinearBackGround
              height={120}
              back={true}
              avatar={false}
              onPress={onBack}
              isDarkMode={isDarkMode}
            ></LinearBackGround>

            <Text
              style={[
                styles.title,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
            >
              Thay đổi mật khẩu{" "}
            </Text>
            <Text
              style={[
                styles.textLable,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
            >
              Nhập mật khẩu cũ{" "}
            </Text>
            <View
              style={[
                styles.wapperEdit,
                { backgroundColor: isDarkMode ? colors.darkBg : "#D9D9D9" },
              ]}
            >
              <TextInput
                style={[
                  styles.textEdit,
                  { color: isDarkMode ? colors.whiteText : "black" },
                ]}
                placeholderTextColor={
                  isDarkMode ? colors.placeHolder : undefined
                }
                placeholder="old password"
                spellCheck={false}
                selectionColor={colors.primary}
                secureTextEntry={isPressEyeOld}
                onChangeText={(text) => setOldPassword(text)}
              ></TextInput>
              <TouchableOpacity
                onPress={() => setIsPressEyeOld(!isPressEyeOld)}
                style={styles.eyeIcon}
                activeOpacity={0.5}
              >
                {!isPressEyeOld && (
                  <AntDesign
                    name="eyeo"
                    size={24}
                    color={isDarkMode ? colors.whiteText : "black"}
                  />
                )}
                {isPressEyeOld && (
                  <Feather
                    name="eye-off"
                    size={24}
                    color={isDarkMode ? colors.whiteText : "black"}
                  />
                )}
              </TouchableOpacity>
            </View>

            <Text
              style={[
                styles.textLable,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
            >
              Nhập mật khẩu mới{" "}
            </Text>
            <Text
              style={{
                fontFamily: baloo2Fonts.medium,
                marginHorizontal: 10,
                paddingBottom: 10,
              }}
            >
              Mật khẩu phải bao gồm cả chữ cái (a-z, A-Z) và số (0-9)
            </Text>
            <View
              style={[
                styles.wapperEdit,
                { backgroundColor: isDarkMode ? colors.darkBg : "#D9D9D9" },
              ]}
            >
              <TextInput
                style={[
                  styles.textEdit,
                  { color: isDarkMode ? colors.whiteText : "black" },
                ]}
                placeholderTextColor={
                  isDarkMode ? colors.placeHolder : undefined
                }
                placeholder="new password"
                spellCheck={false}
                selectionColor={colors.primary}
                secureTextEntry={isPressEyeNew}
                onChangeText={(text) => setNewPassword(text)}
              ></TextInput>
              <TouchableOpacity
                onPress={() => setIsPressEyeNew(!isPressEyeNew)}
                style={styles.eyeIcon}
                activeOpacity={0.5}
              >
                {!isPressEyeNew && (
                  <AntDesign
                    name="eyeo"
                    size={24}
                    color={isDarkMode ? colors.whiteText : "black"}
                  />
                )}
                {isPressEyeNew && (
                  <Feather
                    name="eye-off"
                    size={24}
                    color={isDarkMode ? colors.whiteText : "black"}
                  />
                )}
              </TouchableOpacity>
            </View>

            <Text
              style={[
                styles.textLable,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
            >
              Xác nhận mật khẩu mới{" "}
            </Text>
            <View
              style={[
                styles.wapperEdit,
                { backgroundColor: isDarkMode ? colors.darkBg : "#D9D9D9" },
              ]}
            >
              <TextInput
                style={[
                  styles.textEdit,
                  { color: isDarkMode ? colors.whiteText : "black" },
                ]}
                placeholderTextColor={
                  isDarkMode ? colors.placeHolder : undefined
                }
                placeholder="confirm password"
                spellCheck={false}
                selectionColor={colors.primary}
                secureTextEntry={isPressEyeConfirm}
                onChangeText={(text) => setConfirmPassword(text)}
              ></TextInput>
              <TouchableOpacity
                onPress={() => setIsPressEyeConfirm(!isPressEyeConfirm)}
                style={styles.eyeIcon}
                activeOpacity={0.5}
              >
                {!isPressEyeConfirm && (
                  <AntDesign
                    name="eyeo"
                    size={24}
                    color={isDarkMode ? colors.whiteText : "black"}
                  />
                )}
                {isPressEyeConfirm && (
                  <Feather
                    name="eye-off"
                    size={24}
                    color={isDarkMode ? colors.whiteText : "black"}
                  />
                )}
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LinearGradient
                colors={isDarkMode ? navbarDarkLinearColors : linearColors}
                style={[
                  styles.summitWrapper,
                  { gap: isLoading ? 12 : 0, opacity: isLoading ? 0.6 : 1 },
                ]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                {isLoading && (
                  <ActivityIndicator
                    size={"large"}
                    color={colors.whiteText}
                  ></ActivityIndicator>
                )}
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={onSaveData}
                  disabled={isLoading}
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.summitText}>
                    {isLoading ? "Đang lưu" : "Lưu thay đổi"}
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
            {isLoading === false && (
              <ToastNotify
                isLoading={isLoading}
                onToggleLoading={onToggleLoading}
                status={status}
                text={message}
                isDarkMode={isDarkMode}
              ></ToastNotify>
            )}
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: baloo2Fonts.bold,
    fontSize: 30,
    marginLeft: 10,
    marginTop: 10,
  },
  textLable: {
    marginTop: 10,
    fontFamily: baloo2Fonts.bold,
    marginLeft: 10,
    fontSize: 20,
  },
  wapperEdit: {
    flex: 1,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "#D9D9D9",
    alignItems: "center",
    borderRadius: 15,
    height: 60,
  },
  textEdit: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: colors.black,
    fontFamily: baloo2Fonts.regular,
    fontSize: 22,
  },

  eyeIcon: {
    paddingHorizontal: 12,
  },

  summitWrapper: {
    borderRadius: 15,
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 16,
  },

  summitText: {
    fontFamily: baloo2Fonts.bold,
    fontSize: 25,
    color: colors.whiteText,
  },
});

export default memo(Password);
