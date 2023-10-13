import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { colors } from "../../../constants";
import {
  darkComment,
  darkReaction,
  whiteComment,
  whiteReaction,
} from "../../../assets/img/icons";
import { baloo2Fonts } from "../../../constants/fontFamiles";
interface NotifyItemProps {
  name: string;
  blog: string;
  isComment: boolean;
  isDarkMode: boolean;
  isRead: boolean;
  onPress: any;
}
const NotifyItem = ({
  isComment,
  isDarkMode,
  isRead,
  name,
  blog,
  onPress,
}: NotifyItemProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={{ marginBottom: 12 }}
      onPress={onPress}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: isDarkMode
              ? isRead
                ? "#29292980"
                : colors.darkBg
              : isRead
              ? colors.readNotify
              : colors.uneadNotify,
          },
        ]}
      >
        {isComment && (
          <Image
            source={isDarkMode ? whiteComment : darkComment}
            style={styles.icon}
            resizeMode="cover"
          ></Image>
        )}
        {!isComment && (
          <Image
            source={isDarkMode ? whiteReaction : darkReaction}
            style={styles.icon}
            resizeMode="cover"
          ></Image>
        )}
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.content,
              {
                color: isDarkMode ? colors.whiteText : "black",
              },
            ]}
          >
            <Text
              style={[
                styles.content,
                {
                  fontFamily: baloo2Fonts.bold,
                  color: isDarkMode ? colors.whiteText : "black",
                },
              ]}
            >
              {name}
            </Text>{" "}
            đã {isComment ? "phản hồi" : "thích"} về bình luận của bạn trong bài
            viết{" "}
            <Text
              style={[
                styles.content,
                {
                  fontFamily: baloo2Fonts.bold,
                  color: isDarkMode ? colors.whiteText : "black",
                },
              ]}
            >
              {blog}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotifyItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  icon: {
    width: 36,
    height: 36,
    marginRight: 16,
  },
  content: {
    fontSize: 18,
    fontFamily: baloo2Fonts.medium,
    lineHeight: 26,
  },
});