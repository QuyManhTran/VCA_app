import { StyleSheet, Text, View, Image } from "react-native";
import { memo } from "react";
import { colors } from "../../../constants";
import { baloo2Fonts } from "../../../constants/fontFamiles";
import { avatar } from "../../../assets/img/avatars";

interface CommentItemProps {
  avatar: any;
  name: string;
  content: string;
  time: string;
  like: number;
  isDarkMode: boolean;
  width: number;
}
const CommentItem = ({ ...props }: CommentItemProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={props?.avatar ? { uri: props.avatar } : avatar}
        resizeMode="cover"
        style={styles.img}
      ></Image>
      <View
        style={[
          styles.contentWrapper,
          {
            backgroundColor: props.isDarkMode ? colors.darkBg : colors.grayBg,
            maxWidth: props.width - 50 - 12 * 3,
          },
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
            {props.like}😆
          </Text>
        </View>
      </View>
    </View>
  );
};

export default memo(CommentItem);

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
  },
  name: {
    fontFamily: baloo2Fonts.bold,
    fontSize: 20,
    marginBottom: -8,
  },
  content: {
    fontFamily: baloo2Fonts.regular,
    fontSize: 18,
    lineHeight: 20,
    paddingTop: 8,
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
