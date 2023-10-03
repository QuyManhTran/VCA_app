import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { singleLego } from "../../../assets/img/splash";
import styles from "./style";
import Button from "../../components/Button";
import { NavigationProp } from "@react-navigation/native";
import { RouterProps } from "../Splash/Splash";
import AuthenBackGround from "../../components/AuthenBackGround";
import { colors } from "../../../constants";
import NavButton from "../../components/NavButton";
import { baloo2Fonts } from "../../../constants/fontFamiles";

const AskAccount = ({ route, navigation }: RouterProps) => {
  const onMoveLogin = () => {
    navigation.navigate("Login");
  };
  const onMoveRegister = () => {
    navigation.navigate("Register");
  };
  return (
    <View style={{ flex: 1 }}>
      <AuthenBackGround
        onPress={() => navigation.goBack()}
        isBack={false}
      ></AuthenBackGround>
      <View style={styles.container}>
        <Text style={styles.heading}>You have an account</Text>
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
        <Text style={[styles.heading]}>You don't have </Text>
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
