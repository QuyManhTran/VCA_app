import {
  View,
  Text,
  ScrollView,
  Animated,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useCallback, useEffect, useState, useRef, useContext } from "react";
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
type SearchStatusType = "tag" | "all";
const Search = ({ route, navigation }: RouterProps) => {
  const flatRef = useRef<FlatList>(null);
  const scrollOpacity = useRef(new Animated.Value(0)).current;
  const { isDarkMode } = useContext(ThemeContext);
  const [keyword, setKeyword] = useState(route.params?.keyword || "");
  const [data, setData] = useState([]);
  const debounceKeyword = useDebounce(keyword, 300);
  const [activeTag, setActiveTag] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [searchStatus, setSearchStatus] = useState<SearchStatusType>(
    route.params?.status || "all"
  );
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

  useEffect(() => {
    console.log(searchStatus);
  }, [searchStatus]);

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
    </View>
  );
};

export default Search;
