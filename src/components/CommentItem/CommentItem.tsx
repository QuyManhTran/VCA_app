import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { colors } from "../../../constants";
import { baloo2Fonts } from "../../../constants/fontFamiles";

interface CommentItemProps {
  img: any;
  name: string;
  content: string;
  time: string;
  likeAmount: number;
  isDarkMode: boolean;
}
const CommentItem = ({ ...props }: CommentItemProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: props.img }}
        resizeMode="cover"
        style={styles.img}
      ></Image>
      <View
        style={[
          styles.contentWrapper,
          { backgroundColor: props.isDarkMode ? colors.darkBg : colors.grayBg },
        ]}
      >
        <Text
          style={[
            styles.name,
            { color: props.isDarkMode ? colors.whiteText : "black" },
          ]}
        >
          {props.name}
        </Text>
        <Text
          style={[
            styles.content,
            { color: props.isDarkMode ? colors.whiteText : "black" },
          ]}
        >
          {props.content}
        </Text>
        <View style={styles.timeWrapper}>
          <Text
            style={[
              styles.timeText,
              {
                marginLeft: 0,
                color: props.isDarkMode ? colors.whiteText : "black",
              },
            ]}
          >
            {props.time}
          </Text>
          <Text
            style={[
              styles.timeText,
              { color: props.isDarkMode ? colors.whiteText : "black" },
            ]}
          >
            Thích
          </Text>
          <Text
            style={[
              styles.timeText,
              { color: props.isDarkMode ? colors.whiteText : "black" },
            ]}
          >
            Phản hồi
          </Text>
          <Text
            style={[
              [
                styles.timeText,
                {
                  marginRight: 8,
                  color: props.isDarkMode ? colors.whiteText : "black",
                },
              ],
            ]}
          >
            {props.likeAmount}😆
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 36,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  contentWrapper: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 24,
    minWidth: 160,
    maxWidth: 300,
  },
  name: {
    fontFamily: baloo2Fonts.bold,
    fontSize: 20,
    lineHeight: 28,
  },
  content: {
    fontFamily: baloo2Fonts.regular,
    fontSize: 18,
    lineHeight: 22,
  },
  timeWrapper: {
    position: "absolute",
    top: "100%",
    transform: [{ translateY: 12 }],
    minWidth: "100%",
    marginLeft: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeText: {
    fontSize: 16,
    fontFamily: baloo2Fonts.medium,
    lineHeight: 22,
    marginLeft: 20,
  },
});
