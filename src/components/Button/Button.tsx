import {
  StyleSheet,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useContext } from "react";
import ThemeContext from "../../utilies/theme";
import { colors } from "../../../constants";

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
  const { isDarkMode } = useContext(ThemeContext);
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
          {
            width: width < 400 ? 320 : 340,
            backgroundColor: isDarkMode ? colors.black : "#fff",
          },
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
