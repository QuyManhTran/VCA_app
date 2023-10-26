import { StyleSheet, Text, ScrollView } from "react-native";
import React from "react";
import { baloo2Fonts } from "../../../../constants/fontFamiles";
import { colors } from "../../../../constants";
interface DescriptionProps {
  content: string;
  isDarkMode: boolean;
}
const Description = ({ content, isDarkMode }: DescriptionProps) => {
  return (
    <Text
      style={[styles.text, { color: isDarkMode ? colors.whiteText : "black" }]}
    >
      {content}
    </Text>
  );
};

export default Description;

const styles = StyleSheet.create({
  text: {
    fontFamily: baloo2Fonts.medium,
    fontSize: 20,
    textAlign: "justify",
  },
});
