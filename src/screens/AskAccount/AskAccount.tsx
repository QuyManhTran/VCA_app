import { View, Text, Image } from "react-native";
import React from "react";
import { singleLego } from "../../../assets/img/splash";
import styles from "./style";
import Button from "../../components/Button";
import { NavigationProp } from "@react-navigation/native";
import { RouterProps } from "../Splash/Splash";

const AskAccount = ({ route, navigation }: RouterProps) => {
  const onMoveLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={singleLego}
        style={{ width: "100%", height: "100%" }}
      ></Image>
      <View style={styles.container}>
        <Text style={styles.heading}>You have an account</Text>
        <Button
          otherStyles={{
            justifyContent: "center",
            minHeight: 72,
          }}
          customeStyles={{ marginVertical: 12 }}
          onPress={onMoveLogin}
        >
          <Text style={styles.title}>Login</Text>
        </Button>
        <View
          style={{
            marginVertical: 12,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.whiteLine}></View>
          <Text style={{ fontSize: 28, color: "#fff", marginHorizontal: 8 }}>
            or
          </Text>
          <View style={styles.whiteLine}></View>
        </View>
        <Text style={[styles.heading]}>You don't have </Text>
        <Button
          otherStyles={{
            justifyContent: "center",
            minHeight: 72,
          }}
          customeStyles={{ marginVertical: 12 }}
        >
          <Text style={styles.title}>Sign up</Text>
        </Button>
      </View>
    </View>
  );
};

export default AskAccount;
