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
    navigation.navigate("Login");
  };
  const onMoveRegister = () => {
    navigation.navigate("Register");
  };
  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "black" : "#fff" }}>
      <AuthenBackGround
        onPress={() => navigation.goBack()}
        isBack={false}
      ></AuthenBackGround>
      <View style={styles.container}>
        <Text style={[styles.heading, isDarkMode && { color: "#fff" }]}>
          You have an account
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
            Login
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
            style={{ fontSize: 28, color: colors.primary, marginHorizontal: 8 }}
          >
            or
          </Text>
          <View style={styles.whiteLine}></View>
        </View>
        <Text style={[styles.heading, isDarkMode && { color: "#fff" }]}>
          You don't have{" "}
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
            Sign up
          </NavButton>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AskAccount;
