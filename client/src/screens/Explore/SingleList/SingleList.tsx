import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  Pressable,
  TextInput,
  useWindowDimensions,
  Vibration,
} from "react-native";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
  memo,
} from "react";
import * as Animatable from "react-native-animatable";
import { RouterProps } from "../../Splash/Splash";
import fontFamilies, {
  baloo2Fonts,
  montserratFonts,
} from "../../../../constants/fontFamiles";
import { colors } from "../../../../constants";
import FoodReview from "../../../components/FoodReview";
import { Ionicons } from "@expo/vector-icons";
import { listOptions } from "../../../../constants/fakeData";
import ThemeContext from "../../../utilies/theme";
import Modal from "../../../components/Modal";
import BackButton from "../../../components/BackButton";
import NavButton from "../../../components/NavButton";
import AskModal from "../../../components/AskModal";
import { FoodReviewRawProps } from "../../../components/FoodReview/FoodReview";
import { singleListService } from "../../../services/listService";
const headerHide = {
  0: { scale: 1, opacity: 1 },
  0.8: { opacity: 0 },
  1: { scale: 0, opacity: 0 },
};
const headerAppear = {
  0: { scale: 0, opacity: 0 },
  1: { scale: 1, opacity: 1 },
};
const listUp = {
  0: { translateY: 0 },
  1: { translateY: -400 },
};
const listDown = {
  0: { translateY: -400 },
  1: { translateY: 0 },
};

const SingleList = ({ route, navigation }: RouterProps) => {
  const { name, data, img, position, userId, listId, userInfor } = route.params;
  const { width } = useWindowDimensions();
  const [foodList, setFoodList] = useState<FoodReviewRawProps[]>([]);
  const { isDarkMode, onRemoveList, onAdjustList, onRemoveBlogList } =
    useContext(ThemeContext);
  const [realName, setRealName] = useState(name);
  const [allRemoveList, setAllRemoveList] = useState([]);
  const [removeList, setRemoveList] = useState([]);
  const [newName, setNewName] = useState(name);
  const [isModal, setIsModal] = useState(false);
  const [isAdjustModal, setIsAdjustModal] = useState(false);
  const [isRemoveListModal, setIsRemoveListModal] = useState(false);
  const [isRemoveFoodBlog, setisRemoveFoodBlog] = useState(false);
  const [isRemoveMode, setIsRemoveMode] = useState(false);
  const heightOptions = useRef(new Animated.Value(310)).current;
  const headerAnimation = useRef(null);
  const listAnimation = useRef(null);

  const onLongPress = useCallback(() => {
    if (!isRemoveMode) {
      Vibration.vibrate(50);
      setIsRemoveMode(true);
    }
  }, []);

  const onPressOptions = (index: number) => {
    if (index === 0) {
      onCloseModal(400);
      setIsAdjustModal(true);
    } else if (index === 2) {
      onCloseModal(400);
      setIsRemoveMode(true);
    } else if (index === 3) {
      onCloseModal(400);
      setIsRemoveListModal(true);
    }
  };

  const handleRemove = (id: string) => {
    if (removeList.includes(id)) {
      setRemoveList(removeList.filter((value) => value !== id));
      return;
    }
    setRemoveList((prevList) => prevList.concat([id]));
  };

  const handleSelectRemove = () => {
    if (removeList.length === foodList.length) {
      setRemoveList([]);
    } else {
      setRemoveList(allRemoveList);
    }
  };
  const onBack = () => {
    navigation.goBack();
  };
  const onModal = () => {
    setIsModal(true);
  };
  const onCloseModal = (duration: number) => {
    Animated.timing(heightOptions, {
      toValue: 310,
      duration: duration,
      useNativeDriver: false,
    }).start();
    const timeout = setTimeout(() => {
      setIsModal(false);
    }, duration);
  };
  const onTag = useCallback((keyword: string) => {
    navigation.navigate("Search", {
      keyword: keyword,
      status: "tag",
    });
  }, []);

  const onBlog = useCallback(({ ...props }) => {
    navigation.navigate("Blog", { ...props });
  }, []);

  const updateList = async (response: Promise<{ message: number }>) => {
    const message = await response;
    if (message.message === 200) {
      setFoodList((prev) =>
        prev.filter((food, index) => !removeList.includes(food.id))
      );
      setisRemoveFoodBlog(false);
      setRemoveList([]);
      setIsRemoveMode(false);
    } else {
      alert("update fail for some reasons!");
      setisRemoveFoodBlog(false);
      setRemoveList([]);
      setIsRemoveMode(false);
    }
  };

  useEffect(() => {
    if (isModal) {
      Animated.timing(heightOptions, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }).start();
    }
  }, [isModal]);

  useEffect(() => {
    if (isRemoveMode) {
      headerAnimation.current.animate(headerHide);
      listAnimation.current.animate(listUp);
    } else {
      headerAnimation.current.animate(headerAppear);
      listAnimation.current.animate(listDown);
    }
  }, [isRemoveMode]);
  // Call API
  useEffect(() => {
    const getSingleList = async () => {
      const response = await singleListService.getSingleList(
        singleListService.singleListPath,
        {
          id_ulist: listId,
          id_user: userId,
        }
      );
      if (response.message === 200) {
        if (response.data?.foods) {
          setFoodList(response.data.foods);
        }
      }
    };
    getSingleList();
  }, []);

  useEffect(() => {
    if (foodList.length !== allRemoveList.length) {
      setAllRemoveList(foodList.map((food, index) => food.id));
    }
  }, [foodList]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? colors.darkTheme : "#fff",
      }}
    >
      <View style={styles.backgroundImageWrapper}>
        <Image
          source={img}
          style={{
            width: "100%",
            height: "100%",
            opacity: isDarkMode ? 0.3 : 0.2,
          }}
          resizeMode="cover"
          blurRadius={2}
        ></Image>
      </View>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onBack}
          activeOpacity={0.6}
          style={{
            paddingHorizontal: 14,
            paddingVertical: 4,
          }}
        >
          <Ionicons
            name="arrow-back"
            color={isDarkMode ? colors.whiteText : "black"}
            size={32}
          ></Ionicons>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", gap: 24, paddingRight: 14 }}>
          {isRemoveMode && (
            <TouchableOpacity onPress={handleSelectRemove}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: baloo2Fonts.bold,
                  color: isDarkMode ? colors.whiteText : "black",
                }}
              >
                {removeList.length === foodList.length
                  ? "Bỏ chọn"
                  : "Chọn tất cả"}
              </Text>
            </TouchableOpacity>
          )}
          {isRemoveMode && (
            <TouchableOpacity onPress={() => setIsRemoveMode(false)}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: baloo2Fonts.bold,
                  color: isDarkMode ? colors.whiteText : "black",
                }}
              >
                Hủy
              </Text>
            </TouchableOpacity>
          )}
          {!isRemoveMode && (
            <TouchableOpacity
              onPress={onModal}
              style={{ paddingHorizontal: 4 }}
            >
              <Ionicons
                name="ellipsis-vertical"
                size={24}
                color={isDarkMode ? colors.whiteText : "black"}
              ></Ionicons>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, marginTop: 90 }}>
          <Animatable.View
            duration={1000}
            style={styles.headerContent}
            ref={headerAnimation}
          >
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
                color: isDarkMode ? colors.whiteText : "black",
              }}
            >
              {realName}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: montserratFonts.semi,
                color: isDarkMode ? "#fff" : "black",
                opacity: 0.6,
                marginBottom: 4,
              }}
            >
              {userInfor?.username ? userInfor.username : "Andrew"}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: montserratFonts.medium,
                color: isDarkMode ? colors.whiteText : colors.gray,
                opacity: isDarkMode ? 0.6 : 1,
              }}
            >
              {foodList.length} bài viết
            </Text>
          </Animatable.View>
          <Animatable.View
            style={styles.foodWrapper}
            ref={listAnimation}
            duration={1000}
          >
            {foodList.map((food, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <FoodReview
                    {...food}
                    isDarkMode={isDarkMode}
                    onTag={onTag}
                    onBlog={onBlog}
                    onLongPress={onLongPress}
                  ></FoodReview>
                  {isRemoveMode && (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => handleRemove(foodList[index].id)}
                    >
                      {!removeList.includes(foodList[index].id) && (
                        <Ionicons
                          name="ellipse-outline"
                          size={20}
                          style={{ marginTop: 5 }}
                          color={isDarkMode ? colors.whiteText : "black"}
                        ></Ionicons>
                      )}
                      {removeList.includes(foodList[index].id) && (
                        <Ionicons
                          name="checkmark-circle"
                          size={20}
                          style={{ marginTop: 5 }}
                          color={colors.primary}
                        ></Ionicons>
                      )}
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </Animatable.View>
        </View>
      </ScrollView>
      {isModal && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => onCloseModal(400)}
          style={styles.modal}
        >
          <Animated.View
            style={[
              styles.innerModal,
              {
                backgroundColor: isDarkMode ? colors.darkBg : "#fff",
                transform: [{ translateY: heightOptions }],
              },
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
                    color: isDarkMode ? colors.whiteText : "black",
                  }}
                >
                  {realName}
                </Text>
              </View>
              <View style={{ paddingTop: 16 }}>
                {listOptions.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => onPressOptions(index)}
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
                            : index === 2
                            ? "trash-outline"
                            : "trash-bin-outline"
                        }
                        size={24}
                        color={isDarkMode ? colors.whiteText : "black"}
                      ></Ionicons>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: montserratFonts.semi,
                          marginLeft: 18,
                          color: isDarkMode ? colors.whiteText : "black",
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
      {isAdjustModal && (
        <Modal isDarkMode={isDarkMode}>
          <BackButton
            fill
            color={isDarkMode ? colors.whiteText : "black"}
            size={32}
            onPress={() => setIsAdjustModal(false)}
            customeStyle={{ marginLeft: 8 }}
          ></BackButton>
          <View style={styles.newListWrapper}>
            <View
              style={{ width: "100%", paddingHorizontal: 24, marginBottom: 36 }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: fontFamilies.bold,
                  marginBottom: 8,
                  color: isDarkMode ? colors.whiteText : colors.gray,
                }}
              >
                Tên danh sách
              </Text>
              <TextInput
                placeholder="Nhập tên danh sách"
                selectionColor={colors.primary}
                value={newName}
                placeholderTextColor={
                  isDarkMode ? colors.placeHolder : undefined
                }
                style={{
                  backgroundColor: isDarkMode ? colors.darkBg : "#fff",
                  color: isDarkMode ? colors.whiteText : "black",
                  paddingVertical: 8,
                  width: "100%",
                  height: 50,
                  borderBottomWidth: 4,
                  borderColor: colors.primary,
                  fontSize: 20,
                  fontFamily: baloo2Fonts.medium,
                }}
                onChangeText={(text) => setNewName(text)}
              ></TextInput>
            </View>
            <TouchableOpacity
              disabled={newName.trim() ? false : true}
              activeOpacity={0.6}
              onPress={async () => {
                onAdjustList(position, newName, listId);
                setRealName(newName);
                setIsAdjustModal(false);
              }}
              style={{ opacity: newName.trim() ? 1 : 0.5, marginBottom: 24 }}
            >
              <NavButton
                customeStyle={{
                  width: "100%",
                  borderRadius: 24,
                  paddingHorizontal: 20,
                  color: isDarkMode ? colors.whiteText : "#fff",
                }}
              >
                Xong
              </NavButton>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
      {isRemoveMode && (
        <TouchableOpacity
          onPress={() => {
            setisRemoveFoodBlog(true);
          }}
          disabled={removeList.length === 0 ? true : false}
          activeOpacity={0.6}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            opacity: removeList.length === 0 ? 0.5 : 1,
          }}
        >
          <NavButton
            customeStyle={{ width: "100%", borderRadius: 0 }}
            customeText={{
              fontSize: 16,
              fontFamily: baloo2Fonts.medium,
            }}
          >
            Xóa
            {removeList.length === 0
              ? undefined
              : removeList.length === foodList.length
              ? ` tất cả (${removeList.length})`
              : ` (${removeList.length})`}
          </NavButton>
        </TouchableOpacity>
      )}
      {isRemoveListModal && (
        <AskModal
          isDarkMode={isDarkMode}
          title={realName}
          content="Bạn chắc chắn muốn xóa danh sách này?"
          removeContent="Xóa danh sách"
          onAccess={async () => {
            onRemoveList(position, userId, listId);
            setIsRemoveListModal(false);
            navigation.goBack();
          }}
          onDiscard={() => setIsRemoveListModal(false)}
        ></AskModal>
      )}
      {isRemoveFoodBlog && (
        <AskModal
          isDarkMode={isDarkMode}
          content="Bạn chắc chắn muốn xóa các bài viết này?"
          removeContent="Xóa"
          onAccess={() => {
            updateList(onRemoveBlogList(position, listId, removeList));
          }}
          onDiscard={() => setisRemoveFoodBlog(false)}
        ></AskModal>
      )}
    </View>
  );
};

export default memo(SingleList);

const styles = StyleSheet.create({
  headerContent: {
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
  newListWrapper: {
    alignItems: "center",
  },
  backgroundImageWrapper: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  header: {
    position: "absolute",
    top: 20,
    left: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
    zIndex: 1,
  },
});
