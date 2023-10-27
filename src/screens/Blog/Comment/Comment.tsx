import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { memo } from "react";
import { baloo2Fonts } from "../../../../constants/fontFamiles";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../constants";
import CommentItem from "../../../components/CommentItem";
import { comments } from "../../../../constants/fakeData";

interface CommentProps {
  isDarkMode: boolean;
  closeComment: any;
}

const Comment = ({ isDarkMode, closeComment }: CommentProps) => {
  return (
    <View>
      <View
        style={[
          styles.lineCross,
          { borderBottomColor: isDarkMode ? colors.primary : "#ff5c001a" },
        ]}
      ></View>
      <View
        style={[
          styles.headerWrapper,
          { backgroundColor: isDarkMode ? colors.primary : "#ff5c001a" },
        ]}
      >
        <Text
          style={[
            styles.heading,
            { color: isDarkMode ? colors.whiteText : "black" },
          ]}
        >
          Bình luận
        </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={closeComment}
          style={{ marginRight: 12 }}
        >
          <Ionicons
            name="close"
            size={32}
            color={isDarkMode ? colors.whiteText : "black"}
          ></Ionicons>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.contentWrapper}>
          {comments.map((comment, index) => (
            <CommentItem
              key={index}
              img={comment.img}
              content={comment.content}
              likeAmount={comment.likeAmount}
              name={comment.name}
              time={comment.time}
              isDarkMode={isDarkMode}
            ></CommentItem>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(Comment);

const styles = StyleSheet.create({
  lineCross: {
    // marginTop: 8,
    borderBottomColor: "#ff5c001a",
    borderBottomWidth: 4,
  },
  headerWrapper: {
    marginTop: 4,
    backgroundColor: "#ff5c001a",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heading: {
    fontFamily: baloo2Fonts.bold,
    fontSize: 24,
    marginLeft: 12,
  },
  contentWrapper: {
    marginHorizontal: 12,
    marginTop: 16,
    marginBottom: 56,
  },
});
