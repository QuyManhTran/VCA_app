import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { fontFamilies } from "../../../constants";

const Button = ({
  children,
  onPress,
  loginStyle = false,
  customeStyles,
  otherStyles,
}: {
  children?: React.ReactNode;
  onPress?: any;
  loginStyle?: boolean;
  customeStyles?: object;
  otherStyles?: object;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={loginStyle ? 1 : 0.7}
      onPress={onPress}
      style={[{ marginVertical: loginStyle ? 12 : 0 }, customeStyles]}
    >
      <View style={[styles.container, otherStyles]}>{children}</View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 66,
    borderRadius: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    color: "#00FB19",
    fontSize: 30,
    fontWeight: "bold",
  },
});
