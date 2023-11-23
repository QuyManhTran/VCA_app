import React, { memo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableWithoutFeedback,
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

const Password = ({ navigation, ...props }) => {
  const [isPressEyeOld, setIsPressEyeOld] = useState(true);
  const [isPressEyeNew, setIsPressEyeNew] = useState(true);
  const [isPressEyeConfirm, setIsPressEyeConfirm] = useState(true);

  const onBack = () => {
    navigation.goBack();
  };

  const saveDate = async () => {
    const isComfirmed = await showConfirmationDialog();
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
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
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <Pressable onPress={Keyboard.dismiss}>
          <LinearBackGround
            height={110}
            back={true}
            avatar={false}
            onPress={onBack}
            // isDarkMode={isDarkMode}
          ></LinearBackGround>

          <Text style={styles.title}>Thay đổi mật khẩu </Text>
          <Text style={styles.textLable}>Nhập mật khẩu cũ </Text>
          <View style={styles.wapperEdit}>
            <TextInput
              style={styles.textEdit}
              placeholder="old password"
              spellCheck={false}
              selectionColor={colors.primary}
            ></TextInput>
            <TouchableOpacity
              onPress={() => setIsPressEyeOld(!isPressEyeOld)}
              style={styles.eyeIcon}
              activeOpacity={0.5}
            >
              {!isPressEyeOld && (
                <AntDesign name="eyeo" size={24} color="black" />
              )}
              {isPressEyeOld && (
                <Feather name="eye-off" size={24} color="black" />
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.textLable}>Nhập mật khẩu mới </Text>
          <Text
            style={{
              fontFamily: baloo2Fonts.medium,
              marginHorizontal: 10,
              paddingBottom: 10,
            }}
          >
            Mật khẩu phải bao gồm cả chữ cái (a-z, A-Z) và số (0-9)
          </Text>
          <View style={styles.wapperEdit}>
            <TextInput
              style={styles.textEdit}
              placeholder="new password"
              spellCheck={false}
              selectionColor={colors.primary}
            ></TextInput>
            <TouchableOpacity
              onPress={() => setIsPressEyeNew(!isPressEyeNew)}
              style={styles.eyeIcon}
              activeOpacity={0.5}
            >
              {!isPressEyeNew && (
                <AntDesign name="eyeo" size={24} color="black" />
              )}
              {isPressEyeNew && (
                <Feather name="eye-off" size={24} color="black" />
              )}
            </TouchableOpacity>
          </View>

          <Text style={styles.textLable}>Xác nhận mật khẩu mới </Text>
          <View style={styles.wapperEdit}>
            <TextInput
              style={styles.textEdit}
              placeholder="confirm password"
              spellCheck={false}
              selectionColor={colors.primary}
            ></TextInput>
            <TouchableOpacity
              onPress={() => setIsPressEyeConfirm(!isPressEyeConfirm)}
              style={styles.eyeIcon}
              activeOpacity={0.5}
            >
              {!isPressEyeConfirm && (
                <AntDesign name="eyeo" size={24} color="black" />
              )}
              {isPressEyeConfirm && (
                <Feather name="eye-off" size={24} color="black" />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.summitWapper}>
            <TouchableOpacity onPress={saveDate}>
              <Text style={styles.summitText}>Lưu thay đổi</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
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

  summitWapper: {
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  summitText: {
    paddingHorizontal: 10,
    backgroundColor: "#FF9900",
    borderRadius: 15,
    fontFamily: baloo2Fonts.bold,
    fontSize: 25,
    color: colors.whiteText,
  },
});

export default memo(Password);
