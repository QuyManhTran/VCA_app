import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./style";
import { congratulation } from "../../../../assets/img/splash";
import { colors } from "../../../../constants";
import { montserratFonts } from "../../../../constants/fontFamiles";
import { RouterProps } from "../../Splash/Splash";

const SuccessfullyChange = ({ route, navigation }: RouterProps) => {
  console.log(route);
  const onMoveLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 100, marginBottom: 80 }}>
        <Image source={congratulation}></Image>
      </View>
      <View style={{ marginTop: 10, width: 400 }}>
        <Text style={styles.heading}>
          {route.params
            ? `Account have been created successfully!`
            : `Password's changed successfully!`}
        </Text>
      </View>
      <View style={{ marginTop: 30, width: 400, alignItems: "center" }}>
        <Text style={styles.remind}>
          {route.params
            ? `Now, You can use this account to login`
            : `Now, You can use your new password to login`}
        </Text>
      </View>
      <TouchableOpacity activeOpacity={0.7} onPress={onMoveLogin}>
        <View
          style={{
            width: 320,
            height: 66,
            borderRadius: 36,
            backgroundColor: colors.primary,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              fontFamily: montserratFonts.semi,
              color: "#fff",
            }}
          >
            Login
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SuccessfullyChange;
