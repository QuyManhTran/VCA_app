import {
  View,
  Text,
  ScrollView,
  Animated,
  FlatList,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { useCallback, useEffect, useState, useRef, useContext } from "react";
import * as Animatable from "react-native-animatable";
import * as ImagePicker from "expo-image-picker";
import { Blob } from "buffer";
import styles from "./style";
import LinearBackGround from "../../components/LinearBackGround";
import SearchTool from "../../components/SearchTool";
import { RouterProps } from "../Splash/Splash";
import useDebounce from "../../../hooks/useDebounce";
import { baloo2Fonts } from "../../../constants/fontFamiles";
import FoodReview from "../../components/FoodReview";
import { viralSearchs } from "../../../constants/fakeData";
import BackButton from "../../components/BackButton";
import ThemeContext from "../../utilies/theme";
import { colors } from "../../../constants";
import {
  searchAllService,
  searchTagService,
  trendingService,
} from "../../services/searchService";
import { resultNotFound } from "../../../assets/img/ilustraitions";
import { Ionicons } from "@expo/vector-icons";
import request from "../../utilies/request";
type SearchStatusType = "tag" | "all";
const photoUp = {
  0: { translateY: 0 },
  1: { translateY: -140 },
};
const photoDown = {
  0: { translateY: -140 },
  1: { translateY: 0 },
};
const Search = ({ route, navigation }: RouterProps) => {
  const { isDarkMode } = useContext(ThemeContext);
  const photoRef = useRef(null);
  const flatRef = useRef<FlatList>(null);
  const timeoutRef: { current: NodeJS.Timeout } = useRef(null);
  const scrollOpacity = useRef(new Animated.Value(0)).current;
  const [keyword, setKeyword] = useState(route.params?.keyword || "");
  const debounceKeyword = useDebounce(keyword, 300);
  const [data, setData] = useState([]);
  const [activeTag, setActiveTag] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [isModal, setIsModal] = useState<boolean | null>(null);
  const [searchStatus, setSearchStatus] = useState<SearchStatusType>(
    route.params?.status || "all"
  );
  const [photoData, setPhotoData] = useState<any>();
  const onKeyword = useCallback((text: string) => {
    setKeyword(text);
    if (searchStatus !== "all") {
      setSearchStatus("all");
    }
  }, []);

  const onTag = useCallback((tag: string) => {
    setKeyword(tag);
    if (searchStatus !== "tag") {
      setSearchStatus("tag");
    }
  }, []);

  const onBlog = useCallback(({ ...props }) => {
    navigation.navigate("Blog", { ...props });
  }, []);

  const onBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const searchByTrending = async (tag: string) => {
    setIsLoading(true);
    const response = await trendingService.getTrendingFood(
      trendingService.getTrendingFoodPath + tag,
      {
        limit: 8,
      }
    );
    if (response.message === 200) {
      setIsLoading(false);
      setData(response.data);
    } else {
      setIsLoading(false);
      setData([]);
    }
  };

  const searchByTag = async (tag: string) => {
    setIsLoading(true);
    const foods = await searchTagService.searchTag(
      searchTagService.searchTagPath,
      {
        tag: tag,
      }
    );

    if (foods.message !== 200) {
      setIsLoading(false);
      setData([]);
    } else {
      setIsLoading(false);
      setData(foods.data);
    }
  };

  const searchByAll = async (keyword: string) => {
    setIsLoading(true);
    const foods = await searchAllService.searchAll(
      searchAllService.searchAllPath,
      {
        keyword: keyword,
      }
    );

    if (foods.message !== 200) {
      setIsLoading(false);
      setData([]);
    } else {
      setIsLoading(false);
      setData(foods.data);
    }
  };

  const blankKeywordHandler = () => {
    switch (viralSearchs[activeTag]) {
      case "Phổ biến":
        searchByTrending("popular");
        break;
      case "Mới":
        searchByTrending("new");
        break;
      case "Yêu thích":
        searchByTrending("love");
        break;
      default:
        searchByTag(viralSearchs[activeTag]);
        break;
    }
  };

  const closeModalHandler = () => {
    photoRef.current?.animate(photoDown);
    timeoutRef.current = setTimeout(() => {
      setIsModal(false);
    }, 300);
  };

  const chosePhotoHandler = async (isCamera = true) => {
    let result;
    if (isCamera) {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
    }
    if (result) {
      setPhotoData(result.assets[0]);
    }
  };

  const apiPhotoHandler = async () => {
    const formData = new FormData();
    formData.append(
      "imageSearch",
      JSON.stringify({
        uri: photoData.uri,
        name: "image",
        type: photoData.type,
      })
    );
    const response = await request.post("/food/search-image", {
      data: FormData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response.data);
  };

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current as NodeJS.Timeout);
  }, []);

  useEffect(() => {
    blankKeywordHandler();
  }, [activeTag]);

  useEffect(() => {
    if (debounceKeyword === "") {
      setSearchStatus("tag");
      blankKeywordHandler();
    } else {
      if (searchStatus === "tag") {
        searchByTag(debounceKeyword);
      } else {
        searchByAll(debounceKeyword);
      }
    }
    scrollOpacity.setValue(0);
  }, [debounceKeyword]);

  useEffect(() => {
    Animated.timing(scrollOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [data]);

  useEffect(() => {
    if (flatRef.current) {
      flatRef.current.scrollToIndex({
        index: activeTag,
        animated: true,
        viewPosition: 0.3,
      });
    }
  }, [activeTag]);

  useEffect(() => {
    if (isModal !== null) {
      if (isModal) {
        photoRef.current?.animate(photoUp);
      }
    }
  }, [isModal]);

  useEffect(() => {
    if (photoData) {
      apiPhotoHandler();
    }
  }, [photoData]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? colors.darkTheme : "#fff",
      }}
    >
      <LinearBackGround height={140} avatar={false}></LinearBackGround>
      <View style={{ position: "absolute", top: 44, left: 10 }}>
        <BackButton
          onPress={onBack}
          size={28}
          color={isDarkMode ? "#fff" : "black"}
          customeStyle={{
            backgroundColor: isDarkMode ? colors.darkBg : "#fff",
          }}
        ></BackButton>
      </View>
      <View style={styles.search}>
        <SearchTool
          onPhotoSearch={() => setIsModal(true)}
          isDarkMode={isDarkMode}
          isHome={false}
          width={300}
          onKeyword={onKeyword}
          keyword={keyword}
        ></SearchTool>
      </View>
      <View style={{ paddingBottom: 16 }}>
        {debounceKeyword === "" && (
          <FlatList
            ref={flatRef}
            data={viralSearchs}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => setActiveTag(index)}
                  activeOpacity={0.6}
                  style={[
                    styles.chiptag,
                    {
                      backgroundColor: isDarkMode
                        ? index === activeTag
                          ? colors.primary
                          : "transparent"
                        : index === activeTag
                        ? "#ff5c0033"
                        : colors.grayBg,
                      marginLeft: index === 0 ? 12 : 0,
                      borderColor: isDarkMode
                        ? index === activeTag
                          ? "transparent"
                          : "gray"
                        : "transparent",
                    },
                  ]}
                >
                  <Ionicons
                    name="trending-up"
                    size={24}
                    color={
                      isDarkMode
                        ? colors.whiteText
                        : index === activeTag
                        ? colors.primary
                        : "black"
                    }
                  ></Ionicons>
                  <Text
                    style={[
                      styles.chipTagText,
                      {
                        color: isDarkMode
                          ? colors.whiteText
                          : index === activeTag
                          ? colors.primary
                          : "black",
                      },
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            }}
            showsHorizontalScrollIndicator={false}
            horizontal
          ></FlatList>
        )}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            marginTop: 12,
            paddingHorizontal: 12,
            paddingBottom: 24,
          }}
        >
          {data.length === 0 &&
            searchStatus === "all" &&
            debounceKeyword !== "" &&
            isLoading === false && (
              <View style={{ alignItems: "center" }}>
                <Animated.Text
                  numberOfLines={2}
                  ellipsizeMode={"tail"}
                  style={{
                    fontSize: 20,
                    fontFamily: baloo2Fonts.extra,
                    paddingVertical: 12,
                    textAlign: "center",
                    opacity: scrollOpacity,
                    color: isDarkMode ? colors.whiteText : "black",
                  }}
                >
                  {data.length === 0
                    ? `Không có kết quả phù hợp '${debounceKeyword}'`
                    : undefined}
                </Animated.Text>
                <Image
                  source={resultNotFound}
                  resizeMode="cover"
                  style={{ flex: 1, width: 300, height: 300 }}
                ></Image>
              </View>
            )}

          {data.length > 0 && (
            <View style={{ flex: 1 }}>
              {data.map((food, index) => (
                <FoodReview
                  {...food}
                  key={index}
                  onTag={onTag}
                  isDarkMode={isDarkMode}
                  onBlog={onBlog}
                ></FoodReview>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      {isModal && (
        <Pressable style={styles.modalContainer} onPress={closeModalHandler}>
          <Animatable.View
            ref={photoRef}
            duration={200}
            easing={"linear"}
            style={[
              styles.modalContent,
              { backgroundColor: isDarkMode ? colors.darkBg : "#fff" },
            ]}
          >
            <Pressable style={styles.contentWrapper}>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.itemContent}
                onPress={() => chosePhotoHandler(true)}
              >
                <Ionicons
                  name={isDarkMode ? "camera" : "camera-outline"}
                  size={32}
                  color={isDarkMode ? colors.whiteText : "black"}
                ></Ionicons>
                <Text
                  style={[
                    styles.itemText,
                    { color: isDarkMode ? colors.whiteText : "black" },
                  ]}
                >
                  Chọn ảnh từ camera
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.itemContent}
                onPress={() => chosePhotoHandler(false)}
              >
                <Ionicons
                  name={isDarkMode ? "image" : "image-outline"}
                  size={32}
                  color={isDarkMode ? colors.whiteText : "black"}
                ></Ionicons>
                <Text
                  style={[
                    styles.itemText,
                    { color: isDarkMode ? colors.whiteText : "black" },
                  ]}
                >
                  Chọn ảnh từ thư viện
                </Text>
              </TouchableOpacity>
            </Pressable>
          </Animatable.View>
        </Pressable>
      )}
    </View>
  );
};

export default Search;
