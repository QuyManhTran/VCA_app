import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  Pressable,
} from "react-native";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
  memo,
} from "react";
import { RouterProps } from "../../Splash/Splash";
import LinearBackGround from "../../../components/LinearBackGround";
import {
  baloo2Fonts,
  montserratFonts,
} from "../../../../constants/fontFamiles";
import { colors } from "../../../../constants";
import FoodReview from "../../../components/FoodReview";
import { Feather, Ionicons } from "@expo/vector-icons";
import { listOptions } from "../../../../constants/fakeData";
import ThemeContext from "../../../utilies/theme";

const SingleList = ({ route, navigation }: RouterProps) => {
  const { isDarkMode, onRemoveList } = useContext(ThemeContext);
  const { name, data, img, position } = route.params;
  const [isModal, setIsModal] = useState(false);
  const heightOptions = useRef(new Animated.Value(256)).current;
  const onBack = () => {
    navigation.goBack();
  };
  const onModal = () => {
    setIsModal(true);
  };
  const onCloseModal = () => {
    Animated.timing(heightOptions, {
      toValue: 256,
      duration: 400,
      useNativeDriver: false,
    }).start();
    const timeout = setTimeout(() => {
      setIsModal(false);
    }, 400);
  };
  const onTag = useCallback((keyword: string) => {
    navigation.navigate("Search", {
      keyword: keyword,
    });
  }, []);

  useEffect(() => {
    if (isModal) {
      Animated.timing(heightOptions, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }).start();
    }
  }, [isModal]);
  return (
    <View style={{ flex: 1 }}>
      <LinearBackGround
        height={100}
        back={true}
        avatar={false}
        onPress={onBack}
      ></LinearBackGround>
      <TouchableOpacity
        style={{ position: "absolute", top: 40, right: 20 }}
        onPress={onModal}
      >
        <Ionicons name="ellipsis-vertical" size={24}></Ionicons>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <View style={styles.imageWrapper}>
              <Image
                source={img}
                style={{
                  width: 280,
                  height: 280,
                }}
                resizeMode="cover"
              ></Image>
            </View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: montserratFonts.bold,
                marginBottom: 4,
              }}
            >
              {name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: montserratFonts.semi,
                opacity: 0.6,
                marginBottom: 4,
              }}
            >
              Andrew
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: montserratFonts.medium,
                color: colors.gray,
              }}
            >
              {data.length} bài viết
            </Text>
          </View>
          <View style={styles.foodWrapper}>
            {data.map((food, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <FoodReview {...food} onTag={onTag}></FoodReview>
                  <Ionicons
                    name="ellipsis-vertical"
                    size={20}
                    style={{ marginTop: 4 }}
                  ></Ionicons>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
      {isModal && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={onCloseModal}
          style={styles.modal}
        >
          <Animated.View
            style={[
              styles.innerModal,
              { transform: [{ translateY: heightOptions }] },
            ]}
          >
            <Pressable>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingBottom: 16,
                  borderBottomColor: "#D9D9D9",
                  borderBottomWidth: 1,
                }}
              >
                <Image
                  source={img}
                  style={{ width: 60, height: 60, borderRadius: 4 }}
                  resizeMode="cover"
                ></Image>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: montserratFonts.bold,
                    marginLeft: 12,
                  }}
                >
                  {name}
                </Text>
              </View>
              <View style={{ paddingTop: 16 }}>
                {listOptions.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        if (index === 2) {
                          onRemoveList(position);
                          navigation.goBack();
                        }
                      }}
                      key={index}
                      activeOpacity={0.6}
                      style={{
                        flexDirection: "row",
                        paddingBottom: 24,
                        alignItems: "center",
                      }}
                    >
                      <Ionicons
                        name={
                          index === 0
                            ? "pencil"
                            : index === 1
                            ? "share-social"
                            : "trash-outline"
                        }
                        size={24}
                        color="black"
                      ></Ionicons>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: montserratFonts.semi,
                          marginLeft: 18,
                        }}
                      >
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </Pressable>
          </Animated.View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default memo(SingleList);

const styles = StyleSheet.create({
  header: {
    marginTop: 24,
    marginBottom: 36,
    alignItems: "center",
  },
  imageWrapper: {
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 24,
    overflow: "hidden",
  },
  foodWrapper: {
    paddingLeft: 24,
    paddingRight: 12,
  },
  modal: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  innerModal: {
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingTop: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
});
