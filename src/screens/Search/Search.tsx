import {
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Animated,
} from "react-native";
import { useCallback, useEffect, useState, useRef, useContext } from "react";
import styles from "./style";
import LinearBackGround from "../../components/LinearBackGround";
import SearchTool from "../../components/SearchTool";
import { RouterProps } from "../Splash/Splash";
import useDebounce from "../../../hooks/useDebounce";
import { baloo2Fonts } from "../../../constants/fontFamiles";
import FoodReview from "../../components/FoodReview";
import { mostlySearch } from "../../../constants/fakeData";
import BackButton from "../../components/BackButton";
import ThemeContext from "../../utilies/theme";
import { colors } from "../../../constants";
const Search = ({ route, navigation }: RouterProps) => {
  const { isDarkMode } = useContext(ThemeContext);
  const scrollOpacity = useRef(new Animated.Value(0)).current;
  const [keyword, setKeyword] = useState(route.params.keyword || "");
  const [data, setData] = useState(mostlySearch);
  const debounceKeyword = useDebounce(keyword, 300);
  const onKeyword = useCallback((text: string) => {
    setKeyword(text);
  }, []);

  const onTag = useCallback((tag: string) => {
    setKeyword(tag);
  }, []);

  const onBack = useCallback(() => {
    navigation.goBack();
  }, []);

  useEffect(() => {
    // sent API by debounceKeyword
    if (debounceKeyword === "") {
      setData(mostlySearch);
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
  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "black" : "#fff" }}>
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
        <View
          style={{
            flex: 1,
            paddingHorizontal: 24,
            paddingBottom: 24,
          }}
        >
          {debounceKeyword === "" && (
            <Text
              style={{
                fontSize: 30,
                fontFamily: baloo2Fonts.extra,
                paddingVertical: 12,
                color: isDarkMode ? colors.whiteText : "black",
              }}
            >
              Tìm kiếm nhiều nhất
            </Text>
          )}
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
              ></FoodReview>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Search;
