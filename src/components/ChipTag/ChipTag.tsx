import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { baloo2Fonts } from "../../../constants/fontFamiles";

interface ChipTagProps {
  children?: React.ReactNode;
  title: string;
  marginLeft?: number;
}
const ChipTag = ({ children, title, marginLeft = 0 }: ChipTagProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.container, { marginLeft: marginLeft }]}
    >
      {children}
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(ChipTag);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingVertical: 6,
    flexDirection: "row",
    justifyContent: "center",
    marginRight: 16,
    borderRadius: 24,
    elevation: 2,
    shadowColor: "#00000040",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 1.0,
  },
  title: {
    fontSize: 20,
    fontFamily: baloo2Fonts.bold,
    paddingLeft: 4,
  },
});
