import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import styles from "./style";
import { RouterProps } from "../Splash/Splash";
import AuthenBackGround from "../../components/AuthenBackGround";
import { colors } from "../../../constants";
import NavButton from "../../components/NavButton";
import { baloo2Fonts } from "../../../constants/fontFamiles";
import ThemeContext from "../../utilies/theme";

const AskAccount = ({ route, navigation }: RouterProps) => {
  const { isDarkMode } = useContext(ThemeContext);
  const onMoveLogin = () => {
    navigation.navigate("AskLogin");
  };
  const onMoveRegister = () => {
    navigation.navigate("AskRegister");
  };
  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "black" : "#fff" }}>
      <AuthenBackGround
        onPress={() => navigation.goBack()}
        isBack={false}
      ></AuthenBackGround>
      <View style={styles.container}>
        <Text style={[styles.heading, isDarkMode && { color: "#fff" }]}>
          Bạn đã có tài khoản
        </Text>
        <TouchableOpacity onPress={onMoveLogin} activeOpacity={0.7}>
          <NavButton
            width={340}
            height={72}
            customeText={{
              fontSize: 36,
              lineHeight: undefined,
              fontFamily: baloo2Fonts.extra,
            }}
          >
            Đăng nhập
          </NavButton>
        </TouchableOpacity>
        <View
          style={{
            marginVertical: 12,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.whiteLine}></View>
          <Text
            style={{
              fontFamily: baloo2Fonts.medium,
              fontSize: 24,
              color: colors.primary,
              marginHorizontal: 8,
            }}
          >
            hoặc
          </Text>
          <View style={styles.whiteLine}></View>
        </View>
        <Text style={[styles.heading, isDarkMode && { color: "#fff" }]}>
          Bạn chưa có{" "}
        </Text>
        <TouchableOpacity onPress={onMoveRegister} activeOpacity={0.7}>
          <NavButton
            width={340}
            height={72}
            customeText={{
              fontSize: 36,
              lineHeight: undefined,
              fontFamily: baloo2Fonts.extra,
            }}
          >
            Đăng ký
          </NavButton>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AskAccount;
