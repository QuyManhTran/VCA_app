import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  Pressable,
  Animated,
} from "react-native";
import {
  useState,
  useEffect,
  useCallback,
  useContext,
  useReducer,
  useRef,
} from "react";
import ThemeContext from "../../utilies/theme";
import LinearBackGround from "../../components/LinearBackGround";
import { RouterProps } from "../Splash/Splash";
import { baloo2Fonts } from "../../../constants/fontFamiles";
import { colors } from "../../../constants";
import NotifyItem from "../../components/NotifyItem";
import { Ionicons } from "@expo/vector-icons";

const Notification = ({ route, navigation }: RouterProps) => {
  const { isDarkMode, notifitions, onRemoveUnread } = useContext(ThemeContext);
  const { today, before } = notifitions;
  const { width } = useWindowDimensions();
  const [isAll, setIsAll] = useState(true);
  const [isUnreadToday, setIsUnreadToday] = useState(false);
  const [isUnreadBefore, setIsUnreadBefore] = useState(false);
  const [isOptions, setIsOptions] = useState(false);
  const opcityOption = useRef(new Animated.Value(0)).current;
  const onBack = () => {
    navigation.goBack();
  };

  const onViewComment = useCallback(
    (type: string, position: number, isRead: boolean) => {
      if (!isRead) {
        onRemoveUnread(type, position, true);
      }
    },
    [notifitions]
  );

  const onHideOptions = () => {
    Animated.timing(opcityOption, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      setIsOptions(false);
    }, 200);
  };
  useEffect(() => {
    setIsUnreadToday(false);
    setIsUnreadBefore(false);
    for (let i = 0; i < today.length; i++) {
      if (!today[i].isRead) {
        setIsUnreadToday(true);
        break;
      }
    }

    for (let i = 0; i < before.length; i++) {
      if (!before[i].isRead) {
        setIsUnreadBefore(true);
        break;
      }
    }
  }, [notifitions]);

  useEffect(() => {
    if (isOptions) {
      Animated.timing(opcityOption, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [isOptions]);
  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "black" : "#fff" }}>
      <Pressable
        onPress={() => {
          if (isOptions) {
            onHideOptions();
          }
        }}
      >
        <LinearBackGround
          height={width < 400 ? 100 : 120}
          back={true}
          avatar={false}
          onPress={onBack}
          isDarkMode={isDarkMode}
        ></LinearBackGround>
      </Pressable>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable
          onPress={() => {
            if (isOptions) {
              onHideOptions();
            }
          }}
        >
          <View style={styles.wrapper}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={[
                  styles.heading,
                  { color: isDarkMode ? colors.whiteText : "black" },
                ]}
              >
                Thông báo của tôi
              </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setIsOptions(true)}
              >
                <Ionicons
                  name="ellipsis-horizontal"
                  color={isDarkMode ? colors.whiteText : "black"}
                  size={26}
                ></Ionicons>
              </TouchableOpacity>
              {isOptions && (
                <Animated.View
                  style={[
                    styles.optionsWrapper,
                    {
                      backgroundColor: isDarkMode ? colors.darkBg : "#fff",
                      opacity: opcityOption,
                    },
                  ]}
                >
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.optionItem}
                    onPress={() => {
                      setIsOptions(false);
                      if (isUnreadToday || isUnreadBefore) {
                        onRemoveUnread("read_all", 0, true);
                      }
                    }}
                  >
                    <Ionicons
                      name="checkmark-done"
                      size={24}
                      color={isDarkMode ? colors.whiteText : "black"}
                    ></Ionicons>
                    <Text
                      style={[
                        styles.optionText,
                        { color: isDarkMode ? colors.whiteText : "black" },
                      ]}
                    >
                      Đánh dấu tất cả
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              )}
            </View>
            <View style={styles.tabWrapper}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsAll(true)}
                style={{
                  marginRight: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: 20,
                  backgroundColor: isDarkMode
                    ? isAll
                      ? colors.primary
                      : colors.darkBg
                    : isAll
                    ? "#ff5c0033"
                    : colors.grayBg,
                }}
              >
                <Text
                  style={[
                    styles.tabText,
                    {
                      color: isDarkMode
                        ? isAll
                          ? "black"
                          : colors.whiteText
                        : isAll
                        ? colors.primary
                        : "black",
                    },
                  ]}
                >
                  Tất cả
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 4,
                  borderRadius: 20,
                  backgroundColor: isDarkMode
                    ? !isAll
                      ? colors.primary
                      : colors.darkBg
                    : !isAll
                    ? "#ff5c0033"
                    : colors.grayBg,
                }}
                onPress={() => setIsAll(false)}
              >
                <Text
                  style={[
                    styles.tabText,
                    {
                      color: isDarkMode
                        ? !isAll
                          ? "black"
                          : colors.whiteText
                        : !isAll
                        ? colors.primary
                        : "black",
                    },
                  ]}
                >
                  Chưa đọc
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.contentWrapper}>
              {((isAll && today.length > 0) || (!isAll && isUnreadToday)) && (
                <Text
                  style={[
                    styles.title,
                    { color: isDarkMode ? colors.whiteText : "black" },
                  ]}
                >
                  Hôm nay
                </Text>
              )}
              {today.map((item, index) => {
                if (!isAll && item.isRead) {
                  return;
                }
                return (
                  <NotifyItem
                    key={index}
                    isDarkMode={isDarkMode}
                    {...item}
                    onPress={() => onViewComment("today", index, item.isRead)}
                  ></NotifyItem>
                );
              })}
            </View>
            <View style={styles.contentWrapper}>
              {((isAll && before.length > 0) || (!isAll && isUnreadBefore)) && (
                <Text
                  style={[
                    styles.title,
                    { color: isDarkMode ? colors.whiteText : "black" },
                  ]}
                >
                  Trước đó
                </Text>
              )}
              {before.map((item, index) => {
                if (!isAll && item.isRead) {
                  return;
                }
                return (
                  <NotifyItem
                    key={index}
                    isDarkMode={isDarkMode}
                    {...item}
                    onPress={() => onViewComment("before", index, item.isRead)}
                  ></NotifyItem>
                );
              })}
            </View>
          </View>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 8,
    paddingHorizontal: 12,
  },
  tabWrapper: {
    marginTop: 20,
    flexDirection: "row",
  },
  heading: {
    fontSize: 30,
    fontFamily: baloo2Fonts.bold,
  },
  contentWrapper: {
    marginVertical: 8,
  },
  title: {
    fontSize: 22,
    fontFamily: baloo2Fonts.bold,
    marginBottom: 4,
  },
  tabText: {
    fontSize: 16,
    fontFamily: baloo2Fonts.medium,
  },
  optionsWrapper: {
    position: "absolute",
    top: -4,
    right: 0,
    paddingRight: 12,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: "#fff",
    elevation: 2,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  optionText: {
    fontSize: 18,
    fontFamily: baloo2Fonts.semi,
    marginLeft: 4,
  },
});
