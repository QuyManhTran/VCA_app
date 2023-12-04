import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import GoogleIcon from "../../../assets/icons/GoogleIcon";
import { baloo2Fonts } from "../../../constants/fontFamiles";
import { colors } from "../../../constants";
import { authEmail } from "../../../assets/img/icons";

type AuthIcon = "google" | "email";

interface AuthButtonProps {
  icon: AuthIcon;
  isDarkMode?: boolean;
  onAccess: any;
  width: number;
  content: string;
}

const AuthButton = ({
  content,
  icon,
  isDarkMode = false,
  width,
  onAccess,
}: AuthButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onAccess}
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          backgroundColor:
            icon === "email"
              ? isDarkMode
                ? "#fa5f07"
                : "#facdb4"
              : isDarkMode
              ? colors.darkBg
              : "#fff",
          width: width < 400 ? 320 : 340,
        },
      ]}
    >
      {icon === "google" && <GoogleIcon height="40px" width="40"></GoogleIcon>}
      {icon === "email" && (
        <Image
          source={authEmail}
          style={{ height: 40, width: 40 }}
          resizeMode="cover"
        ></Image>
      )}
      <Text
        style={[
          styles.authText,
          { color: isDarkMode ? colors.whiteText : "black" },
        ]}
      >
        {content}
      </Text>
    </TouchableOpacity>
  );
};

export default AuthButton;

const styles = StyleSheet.create({
  container: {
    height: 72,
    borderRadius: 36,
    elevation: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  authText: {
    fontSize: 24,
    fontFamily: baloo2Fonts.semi,
  },
});
