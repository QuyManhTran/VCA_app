import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Easing,
} from "react-native";
import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import { baloo2Fonts } from "../../../../constants/fontFamiles";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../constants";
import CommentItem from "../../../components/CommentItem";
//  import { comments } from "../../../../constants/fakeData";
import socket from "../../../utilies/server";

interface CommentProps {
  isDarkMode: boolean;
  closeComment: any;
  name: string;
}

const Comment = ({ isDarkMode, closeComment, name }: CommentProps) => {
  const [comments, setComments] = useState([]);
  const [isComment, setIsComment] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const bottomValue = useRef(new Animated.Value(0)).current;
  const newMessage = () => {
    socket.emit("newMessage", {
      time: `${new Date().getSeconds()}`,
      content: "vai ca dai",
    });
  };

  useEffect(() => {
    if (isComment) {
      Animated.timing(bottomValue, {
        toValue: keyboardHeight,
        duration: 100,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start();
    } else {
      Animated.timing(bottomValue, {
        toValue: 0,
        duration: 100,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start();
    }
  }, [isComment]);

  useLayoutEffect(() => {
    socket.on("connection", (message) => {});
    socket.emit("test", name);
    socket.on(name, (comments) => {
      setComments(comments);
    });
  }, []);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.on(name, (comments) => {
      setComments(comments);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        setIsComment(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsComment(false);
      }
    );

    // Clean up listeners when the component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <>
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
          <TouchableOpacity activeOpacity={0.5} onPress={newMessage}>
            <Text style={styles.heading}>New message</Text>
          </TouchableOpacity>
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Animated.View
          style={[
            styles.commentArea,
            {
              backgroundColor: isDarkMode ? colors.darkTheme : "#fff",
              borderTopColor: colors.gray,
              bottom: bottomValue,
            },
          ]}
        >
          <View
            style={[
              styles.innterArea,
              { backgroundColor: isDarkMode ? colors.darkBg : colors.grayBg },
            ]}
          >
            <TextInput
              placeholder="Viết bình luận..."
              style={[
                styles.textInput,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
              selectionColor={colors.primary}
            ></TextInput>
            <TouchableOpacity activeOpacity={0.6} style={styles.sendIcon}>
              <Ionicons
                name="send"
                size={32}
                color={isDarkMode ? colors.whiteText : "black"}
              ></Ionicons>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </TouchableWithoutFeedback>
    </>
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
    marginBottom: 126,
  },
  commentArea: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderTopWidth: 0.5,
  },
  innterArea: {
    borderRadius: 24,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "transparent",
    paddingHorizontal: 12,
    flex: 1,
    height: "100%",
    fontFamily: baloo2Fonts.regular,
    fontSize: 18,
  },
  sendIcon: {
    paddingHorizontal: 12,
  },
});
