import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useEffect, useRef } from "react";
import fontFamilies, { montserratFonts } from "../../../constants/fontFamiles";
import { colors } from "../../../constants";
interface ModalProps {
  title: string;
  content: string;
  onPress: any;
}
const Modal = ({ title, content, onPress }: ModalProps) => {
  const scaleUp = useRef(new Animated.Value(0.5)).current;
  const onClose = () => {
    Animated.timing(scaleUp, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      onPress();
    }, 300);
  };
  useEffect(() => {
    Animated.timing(scaleUp, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, []);
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.wrapper,
          { opacity: scaleUp, transform: [{ scale: scaleUp }] },
        ]}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{content}</Text>
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
      </Animated.View>
    </View>
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
    height: 200,
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
