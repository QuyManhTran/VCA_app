import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef } from "react";
import fontFamilies, { montserratFonts } from "../../../constants/fontFamiles";
import { colors } from "../../../constants";
interface ModalProps {
  title?: string;
  content?: string;
  onPress?: any;
  children?: React.ReactNode;
  isPending?: boolean;
  isDarkMode: boolean;
}
const Modal = ({
  title,
  content,
  onPress,
  children,
  isDarkMode = false,
  isPending = false,
}: ModalProps) => {
  const scaleUp = useRef(new Animated.Value(0.5)).current;
  const onClose = () => {
    Animated.timing(scaleUp, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      onPress();
    }, 400);
  };
  useEffect(() => {
    Animated.timing(scaleUp, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, []);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.wrapper,
            {
              backgroundColor: isDarkMode ? colors.darkBg : "#fff",
              transform: [{ scale: scaleUp }],
            },
          ]}
        >
          {title && (
            <>
              <Text
                style={[
                  styles.title,
                  { color: isDarkMode ? colors.whiteText : "black" },
                ]}
              >
                {title}
              </Text>
              {isPending && (
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <ActivityIndicator
                    color={"black"}
                    size={"large"}
                  ></ActivityIndicator>
                </View>
              )}
              <Text
                style={[
                  styles.content,
                  {
                    color: isDarkMode ? colors.whiteText : "black",
                    textAlign: isPending ? "center" : "left",
                  },
                ]}
              >
                {content}
              </Text>
              {!isPending && (
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.closeBtn}
                  onPress={onClose}
                >
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 20,
                      padding: 8,
                      fontFamily: montserratFonts.bold,
                    }}
                  >
                    OK
                  </Text>
                </TouchableOpacity>
              )}
            </>
          )}
          {!title && children}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Modal;
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    width: 320,
    minHeight: 200,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontFamily: montserratFonts.bold,
    paddingTop: 12,
    paddingLeft: 12,
  },
  content: {
    fontSize: 16,
    fontFamily: fontFamilies.bold,
    paddingTop: 12,
    paddingLeft: 12,
  },
  closeBtn: {
    position: "absolute",
    bottom: 4,
    right: 16,
  },
});
