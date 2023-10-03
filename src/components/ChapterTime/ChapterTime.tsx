import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { montserratFonts } from "../../../constants/fontFamiles";
import { colors } from "../../../constants";
interface ChapterProps {
  data: {
    uri: string;
    time: string;
  }[];
}
const ChapterTime = ({ data }: ChapterProps) => {
  return (
    <View style={{ flex: 1 }}>
      {data.map((chapter, index) => {
        let heading = "Introduction";
        if (index === 1) {
          heading = "Recipe";
        } else if (index === 2) {
          heading = "Meaning";
        }
        return (
          <TouchableOpacity
            key={index}
            style={styles.container}
            activeOpacity={0.7}
          >
            <Image
              source={{ uri: chapter.uri }}
              style={{ width: 180, height: 90 }}
              resizeMode="cover"
            ></Image>
            <View style={styles.timeWrapper}>
              <Text style={styles.heading}>{heading}</Text>
              <Text style={styles.time}>{chapter.time}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default React.memo(ChapterTime);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  timeWrapper: {
    marginLeft: 24,
  },
  heading: {
    fontSize: 18,
    fontFamily: montserratFonts.semi,
  },
  time: {
    fontSize: 14,
    fontFamily: montserratFonts.medium,
    color: colors.primary,
  },
});
