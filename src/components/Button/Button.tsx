import {
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  useWindowDimensions,
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
  const { width, height } = useWindowDimensions();
  return (
    <TouchableOpacity
      activeOpacity={loginStyle ? 1 : 0.7}
      onPress={onPress}
      style={[
        {
          marginVertical: loginStyle ? 12 : 0,
        },
        customeStyles,
      ]}
    >
      <View
        style={[
          styles.container,
          { width: width < 400 ? 320 : 340 },
          otherStyles,
        ]}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: 340,
    height: 72,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
    elevation: 6,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  text: {
    color: "#00FB19",
    fontSize: 30,
    fontWeight: "bold",
  },
});
