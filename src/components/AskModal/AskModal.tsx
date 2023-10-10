import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useEffect, useRef } from "react";
import { baloo2Fonts, montserratFonts } from "../../../constants/fontFamiles";
import NavButton from "../NavButton";
import { colors } from "../../../constants";

interface AskModalProps {
  title?: string;
  content: string;
  removeContent: string;
  onAccess: any;
  onDiscard: any;
  isDarkMode: boolean;
}

const AskModal = ({
  title,
  content,
  removeContent,
  onAccess,
  onDiscard,
  isDarkMode = false,
}: AskModalProps) => {
  const modalAnimation = useRef(new Animated.Value(0.5)).current;
  const onReject = () => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      onDiscard();
    }, 400);
  };
  useEffect(() => {
    Animated.timing(modalAnimation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, []);
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.wrapper,
          {
            backgroundColor: isDarkMode ? colors.darkBg : "#fff",
            opacity: modalAnimation,
            transform: [{ scale: modalAnimation }],
          },
        ]}
      >
        {title && (
          <Text
            style={[
              styles.title,
              { color: isDarkMode ? colors.whiteText : "black" },
            ]}
          >
            {title}
          </Text>
        )}
        <Text
          style={[
            styles.content,
            { color: isDarkMode ? colors.whiteText : colors.darkBg },
          ]}
        >
          {content}
        </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onAccess}
          style={{ width: "100%" }}
        >
          <NavButton
            customeStyle={{ width: "100%" }}
            customeText={{ fontSize: 18, fontFamily: montserratFonts.semi }}
          >
            {removeContent}
          </NavButton>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.discardWrapper}
          onPress={onReject}
        >
          <Text
            style={[
              styles.discard,
              { color: isDarkMode ? colors.primary : "black" },
            ]}
          >
            Hủy
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default AskModal;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    width: 320,
    minHeight: 200,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: montserratFonts.bold,
    paddingBottom: 12,
  },
  content: {
    fontSize: 16,
    fontFamily: montserratFonts.semi,
    paddingBottom: 18,
    textAlign: "center",
  },
  discardWrapper: {
    width: "100%",
    marginTop: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  discard: {
    fontSize: 18,
    fontFamily: montserratFonts.semi,
  },
});
