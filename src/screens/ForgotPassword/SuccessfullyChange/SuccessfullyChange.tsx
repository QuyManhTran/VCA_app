import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./style";
import { congratulation } from "../../../../assets/img/splash";
import { colors } from "../../../../constants";
import { montserratFonts } from "../../../../constants/fontFamiles";
import { RouterProps } from "../../Splash/Splash";
import AuthenBackGround from "../../../components/AuthenBackGround";
import NavButton from "../../../components/NavButton";
import screenWidth from "../../../../constants/screenWidth";

const SuccessfullyChange = ({ route, navigation }: RouterProps) => {
  // console.log(route);
  const width = screenWidth();
  const onMoveLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <AuthenBackGround></AuthenBackGround>
      <View style={styles.wrapper}>
        <View>
          <Image source={congratulation}></Image>
        </View>
        <View style={{ marginTop: 40, width: 400 }}>
          <Text
            style={[
              styles.heading,
              {
                fontSize: width < 400 ? 44 : 50,
                lineHeight: width < 400 ? 50 : 60,
              },
            ]}
          >
            {route.params ? `Sign up successfully!` : `Change successfully!`}
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={styles.remind}>
            {route.params
              ? `Now, You can use this account to login`
              : `Now, You can use your new password to login`}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onMoveLogin}
          style={{
            alignSelf: "flex-end",
            marginRight: 34,
            marginTop: 20,
          }}
        >
          <NavButton>Login</NavButton>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SuccessfullyChange;
