import {
  View,
  Text,
  ScrollView,
  Animated,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useCallback, useEffect, useState, useRef, useContext } from "react";
import styles from "./style";
import LinearBackGround from "../../components/LinearBackGround";
import SearchTool from "../../components/SearchTool";
import { RouterProps } from "../Splash/Splash";
import useDebounce from "../../../hooks/useDebounce";
import { baloo2Fonts } from "../../../constants/fontFamiles";
import FoodReview from "../../components/FoodReview";
import { mostlySearch, viralSearchs } from "../../../constants/fakeData";
import BackButton from "../../components/BackButton";
import ThemeContext from "../../utilies/theme";
import { colors } from "../../../constants";

type SearchStatusType = "tag" | "all";
const Search = ({ route, navigation }: RouterProps) => {
  const flatRef = useRef<FlatList>(null);
  const scrollOpacity = useRef(new Animated.Value(0)).current;
  const { isDarkMode } = useContext(ThemeContext);
  const [keyword, setKeyword] = useState(route.params?.keyword || "");
  const [data, setData] = useState(mostlySearch);
  const debounceKeyword = useDebounce(keyword, 300);
  const [activeTag, setActiveTag] = useState(0);
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

  useEffect(() => {
    if (!keyword) {
      // call api with keyword = 'pho bien'
    }
  }, []);

  useEffect(() => {
    // sent API by debounceKeyword
    console.log(searchStatus);
    if (debounceKeyword === "") {
      setData(mostlySearch);
      setSearchStatus("tag");
    } else {
      setData([]);
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
      <ScrollView showsVerticalScrollIndicator={false}>
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
        <View
          style={{
            flex: 1,
            paddingHorizontal: 12,
            paddingBottom: 24,
          }}
        >
          {/* {debounceKeyword === "" && (
            <Text
              style={{
                fontSize: 30,
                fontFamily: baloo2Fonts.extra,
                paddingVertical: 12,
                color: isDarkMode ? colors.whiteText : "black",
              }}
            >
              {viralSearchs[activeTag]}
            </Text>
          )} */}
          {debounceKeyword !== "" && (
            <Animated.Text
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
          )}
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
        </View>
      </ScrollView>
    </View>
  );
};

export default Search;
