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
import styles from "./style";
import CommentItem from "../../../components/CommentItem";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../constants";
//  import { comments } from "../../../../constants/fakeData";
import socket from "../../../utilies/server";
import { useWindowDimensions } from "react-native";

interface CommentProps {
  isDarkMode: boolean;
  closeComment: any;
  name: string;
}

const Comment = ({ isDarkMode, closeComment, name }: CommentProps) => {
  const { width } = useWindowDimensions();
  const [comments, setComments] = useState([]);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [active, setActive] = useState({ index: 2, down: true });
  const [textInput, setTextInput] = useState("");
  const [isComment, setIsComment] = useState(false);
  const [someone, setSomeOne] = useState(false);
  const bottomValue = useRef(new Animated.Value(-1)).current;
  const timeoutRef: { current: NodeJS.Timeout | null } = useRef(null);

  const onSending = () => {
    socket.emit("newMessage", {
      time: `${new Date().getSeconds()}`,
      content: textInput,
    });
    setTextInput("");
    if (isComment) {
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    if (someone) {
      setActive({ index: 2, down: true });
    }
  }, [someone]);

  useEffect(() => {
    if (someone) {
      const { index, down } = active;
      timeoutRef.current = setTimeout(() => {
        if (down && index - 1 < 0) {
          setActive({ index: index + 1, down: !down });
        } else if (!down && index + 1 > 2) {
          setActive({ index: index - 1, down: !down });
        } else {
          setActive({ index: down ? index - 1 : index + 1, down: down });
        }
      }, 350);
    }
    return () => clearTimeout(timeoutRef.current as NodeJS.Timeout);
  }, [active]);

  useEffect(() => {
    if (isComment) {
      Animated.timing(bottomValue, {
        toValue: keyboardHeight - 1,
        duration: 100,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start();
    } else {
      Animated.timing(bottomValue, {
        toValue: -1,
        duration: 100,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start();
    }
  }, [isComment]);

  useEffect(() => {
    if (textInput.trim()) {
      socket.emit("chatting", true);
    } else {
      socket.emit("chatting", false);
    }
  }, [textInput]);

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
    socket.on(
      "someone",
      ({ food, isChatting }: { food: string; isChatting: boolean }) => {
        setSomeOne(isChatting);
      }
    );
    return () => {
      socket.emit("chatting", false);
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (e) => {
        setKeyboardHeight(Math.round(e.endCoordinates.height));
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
                width={width}
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
              paddingTop: someone ? 0 : 12,
              borderTopColor: isDarkMode ? colors.placeHolder : colors.gray,
              bottom: bottomValue,
            },
          ]}
        >
          {someone && (
            <View style={styles.someone}>
              <Text
                style={[
                  styles.someoneText,
                  {
                    fontSize: width < 400 ? 12 : 14,
                    color: isDarkMode ? colors.whiteText : "black",
                  },
                ]}
              >
                Ai đó đang bình luận
                {active.index >= 0 && <Text style={{ fontSize: 16 }}>.</Text>}
                {active.index >= 1 && <Text style={{ fontSize: 16 }}>.</Text>}
                {active.index >= 2 && <Text style={{ fontSize: 16 }}>.</Text>}
              </Text>
            </View>
          )}
          <View
            style={[
              styles.innterArea,
              { backgroundColor: isDarkMode ? colors.darkBg : colors.grayBg },
            ]}
          >
            <TextInput
              value={textInput}
              onChangeText={(text) => setTextInput(text)}
              placeholder="Viết bình luận..."
              style={[
                styles.textInput,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
              selectionColor={colors.primary}
              placeholderTextColor={isDarkMode ? colors.placeHolder : undefined}
            ></TextInput>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.sendIcon}
              onPress={onSending}
            >
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
