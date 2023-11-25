import { useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  useWindowDimensions,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { baloo2Fonts } from "../../../constants/fontFamiles";
import { colors } from "../../../constants";
import { Ionicons } from "@expo/vector-icons";
import { isLoading } from "expo-font";
export type Status = "success" | "error";
interface ToastProps {
  status: Status;
  isLoading: boolean | null;
  onToggleLoading: any;
  text?: string;
  isDarkMode?: boolean;
}

const popupAnimation = {
  0: { top: -80 },
  0.09: { top: 108 },
  0.1: { top: 90 },
  0.91: { top: 90 },
  1: { top: -80 },
};

const ToastNotify = ({
  status = "error",
  isDarkMode = false,
  isLoading,
  onToggleLoading,
  text,
}: ToastProps) => {
  const { width } = useWindowDimensions();
  const animatableRef = useRef(null);
  const progressRef = useRef(new Animated.Value(100)).current;
  const timeoutRef: { current: NodeJS.Timeout } = useRef(null);

  useEffect(() => {
    if (isLoading !== null && !isLoading) {
      animatableRef?.current.animate(popupAnimation);
      Animated.timing(progressRef, {
        toValue: 0,
        delay: 300,
        duration: 2430,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
      timeoutRef.current = setTimeout(() => {
        onToggleLoading(null);
        progressRef.setValue(100);
      }, 3500);
    }
    return () => clearTimeout(timeoutRef.current as NodeJS.Timeout);
  }, [isLoading]);
  return (
    <Animatable.View
      animation={"bounceInDown"}
      easing={"linear"}
      ref={animatableRef}
      duration={3000}
      style={styles.popupWrapper}
    >
      <View
        style={[
          styles.popupContent,
          { backgroundColor: isDarkMode ? colors.darkTheme : "#fff" },
        ]}
      >
        <View style={styles.popupContentText}>
          <Ionicons
            name={status === "success" ? "checkmark-circle" : "alert-circle"}
            color={status === "success" ? colors.success : colors.error}
            size={36}
          ></Ionicons>
          <Text
            style={[
              styles.popupText,
              {
                color: isDarkMode ? colors.whiteText : "black",
                fontSize: width < 400 ? 20 : 22,
              },
            ]}
          >
            {status === "success"
              ? `${text} 👌`
              : text
              ? `${text} 😩`
              : "Có lỗi, vui lòng thử lại 😩"}
          </Text>
        </View>
        <Animated.View
          style={{
            left: 0,
            bottom: 0,
            width: progressRef.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
            height: 6,
            backgroundColor:
              status === "success" ? colors.success : colors.error,
          }}
        ></Animated.View>
      </View>
    </Animatable.View>
  );
};

export default ToastNotify;

const styles = StyleSheet.create({
  popupWrapper: {
    position: "absolute",
    top: -60,
    left: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  popupContent: {
    borderRadius: 8,
    elevation: 10,
    backgroundColor: "#fff",
    gap: 12,
    overflow: "hidden",
  },
  popupContentText: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingHorizontal: 12,
    gap: 12,
  },
  popupText: {
    fontFamily: baloo2Fonts.medium,
  },
});
