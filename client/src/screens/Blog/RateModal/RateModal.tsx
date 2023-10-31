import { Text, View, Animated, TouchableOpacity } from "react-native";
import { useState, useEffect, useRef, useMemo, memo } from "react";
import { colors } from "../../../../constants";
import { baloo2Fonts } from "../../../../constants/fontFamiles";
import {
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import NavButton from "../../../components/NavButton";
import styles from "./style";
interface RateModal {
  isDarkMode: boolean;
  closeModal: any;
  onRating: any;
}
const data = new Array(5);
data.fill(0);
const RateModal = ({ isDarkMode, closeModal, onRating }: RateModal) => {
  const modalAnimation = useRef(new Animated.Value(0.5)).current;
  const [star, setStar] = useState<number | null>(null);
  const starEvaluation = useMemo(() => {
    let tempt = "";
    switch (star) {
      case 0:
        tempt = "Rất tệ";
        break;
      case 1:
        tempt = "Tệ";
        break;
      case 2:
        tempt = "Bình thường";
        break;
      case 3:
        tempt = "Tốt";
        break;
      case 4:
        tempt = "Tuyệt vời";
        break;
      default:
        tempt = "Vui lòng đánh giá";
        break;
    }
    return tempt;
  }, [star]);
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
        <Text
          style={[
            styles.heading,
            { color: isDarkMode ? colors.whiteText : "black" },
          ]}
        >
          Đánh giá về bài viết
        </Text>
        <View style={styles.iconsWrapper}>
          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{ paddingHorizontal: 12 }}
              activeOpacity={0.6}
              onPress={() => setStar(index)}
            >
              <Ionicons
                name={index <= star && star !== null ? "star" : "star-outline"}
                size={32}
                color={
                  index <= star && star !== null
                    ? "#face15"
                    : isDarkMode
                    ? colors.whiteText
                    : "black"
                }
              ></Ionicons>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={{
            height: 80,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 12,
          }}
        >
          {star === 0 && (
            <FontAwesome5
              name="sad-tear"
              size={28}
              color={isDarkMode ? colors.whiteText : "black"}
            ></FontAwesome5>
          )}
          {star === 4 && (
            <MaterialCommunityIcons
              name="emoticon-excited-outline"
              size={32}
              color={isDarkMode ? colors.whiteText : "black"}
            />
          )}
          {star !== 0 && star !== 4 && star !== null && (
            <Entypo
              name={
                star === 1
                  ? "emoji-sad"
                  : star === 2
                  ? "emoji-neutral"
                  : "emoji-happy"
              }
              size={28}
              color={isDarkMode ? colors.whiteText : "black"}
            ></Entypo>
          )}
          <Text
            style={{
              fontFamily: baloo2Fonts.semi,
              fontSize: 24,
              marginLeft: 6,
              color: isDarkMode ? colors.whiteText : "black",
            }}
          >
            {starEvaluation}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{ width: "100%", opacity: star !== null ? 1 : 0.6 }}
          disabled={star !== null ? false : true}
          onPress={onRating}
        >
          <NavButton
            customeStyle={{ width: "100%" }}
            customeText={{
              fontSize: 20,
              fontFamily: baloo2Fonts.semi,
              lineHeight: 40,
            }}
          >
            Đánh giá
          </NavButton>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.discardWrapper}
          onPress={closeModal}
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

export default memo(RateModal);
