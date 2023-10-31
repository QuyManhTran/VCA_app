import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { linearColors } from "../../../constants/colors";
import { montserratFonts } from "../../../constants/fontFamiles";
import RightArrow from "../../../assets/icons/RightArrow";
interface NavBtnProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
  rightArrow?: boolean;
  customeStyle?: object;
  customeText?: object;
}
const NavButton = ({
  children,
  width = 136,
  height = 52,
  customeText = {},
  rightArrow = false,
  customeStyle = {},
}: NavBtnProps) => {
  return (
    <LinearGradient
      colors={linearColors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[{ width: width, height: height, borderRadius: 20 }, customeStyle]}
    >
      <View style={styles.container}>
        <Text style={[styles.text, customeText]}>{children}</Text>
        {rightArrow && <RightArrow color="#fff" size={28}></RightArrow>}
      </View>
    </LinearGradient>
  );
};

export default NavButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    fontFamily: montserratFonts.extra,
    color: "#fff",
    lineHeight: 24,
  },
});
