import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { baloo2Fonts } from "../../../constants/fontFamiles";
import { colors } from "../../../constants";
import ImageIcon from "../../../assets/icons/ImageIcon";

interface ChipTagProps {
  title: string;
  marginLeft?: number;
  isDarkmode: boolean;
  onPress: any;
  img: any;
}
const ChipTag = ({
  title,
  marginLeft = 0,
  isDarkmode = false,
  onPress,
  img,
}: ChipTagProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[
        styles.container,
        {
          backgroundColor: isDarkmode ? colors.darkBg : "#fff",
          marginLeft: marginLeft,
        },
      ]}
      onPress={() => onPress(title)}
    >
      <ImageIcon img={img}></ImageIcon>
      <Text
        style={[
          styles.title,
          { color: isDarkmode ? colors.whiteText : "black" },
        ]}
      >
        {title}
      </Text>
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
    marginBottom: 2,
    borderRadius: 24,
    elevation: 2,
    shadowColor: "#000040",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0.5,
  },
  title: {
    fontSize: 20,
    fontFamily: baloo2Fonts.bold,
    paddingLeft: 4,
  },
});
