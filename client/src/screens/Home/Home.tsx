import { View, Text, ScrollView } from "react-native";
import { useState, useContext, useRef, useEffect, useCallback } from "react";
import styles from "./style";
import ThemeContext from "../../utilies/theme";
import { Animated } from "react-native";
import * as Animatable from "react-native-animatable";
import { RouterProps } from "../Splash/Splash";
import LinearBackGround from "../../components/LinearBackGround";
import RecommendList from "../../components/RecommendList";
import ChipTag from "../../components/ChipTag";
import { mostlySearch, variousFoods } from "../../../constants/fakeData";
import SearchTool from "../../components/SearchTool";
import { colors } from "../../../constants";
import FoodReview from "../../components/FoodReview";
import Banner from "../../components/Banner";
import exploreData, { recommendLists } from "../../../assets/img/foods";
import { searchTagService } from "../../services/searchService";
import { recommendService } from "../../services/blogService";
import { useFocusEffect } from "@react-navigation/native";
const searchUp = {
  0: { translateY: 0 },
  1: { translateY: -60 },
};
const searchDown = {
  0: { translateY: -60 },
  1: { translateY: 0 },
};
const Home = ({ route, navigation }: RouterProps) => {
  const { isDarkMode, setHomeNavbar } = useContext(ThemeContext);
  const [prevOffSetY, setPrevOffSetY] = useState(0);
  const [countVar, setCountVar] = useState(0);
  const [recommendations, setRecommendations] = useState([]);
  const [isGoBack, setIsGoBack] = useState<boolean | null>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const searchRef = useRef(null);

  const onNavigateSearch = useCallback((params: object) => {
    navigation.navigate("Search", params);
  }, []);

  const onNavigateTrending = useCallback((params: object) => {
    navigation.navigate("Trending", params);
  }, []);

  const onTag = useCallback((keyword: string) => {
    navigation.navigate("Search", { keyword: keyword, status: "tag" });
  }, []);

  const onBanner = useCallback((keyword: string, image: any) => {
    navigation.navigate("PlayList", {
      keyword: keyword,
      image: image,
      status: "tag",
    });
  }, []);

  const onChipTab = useCallback((keyword: string) => {
    navigation.navigate("Search", { keyword: keyword, status: "tag" });
  }, []);

  const onBlog = useCallback(({ ...props }) => {
    setIsGoBack(false);
    navigation.navigate("Blog", { ...props });
  }, []);

  const recommendSearch = async () => {
    const response = await recommendService.getRecommend(
      recommendService.getReccomendPath,
      {
        limit: 3,
      }
    );
    if (response.message === 200) {
      setRecommendations(response.data);
    }
  };

  useEffect(() => {
    recommendSearch();
  }, []);

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      if (value > prevOffSetY) {
        setHomeNavbar(true);
      } else {
        setHomeNavbar(false);
      }
      if (value > prevOffSetY && countVar === 0) {
        setCountVar(1);
        searchRef.current.animate(searchUp);
      } else if (value === 0) {
        setCountVar(0);
        searchRef.current.animate(searchDown);
      }
    });
    return () => scrollY.removeAllListeners();
  });

  useFocusEffect(
    useCallback(() => {
      setIsGoBack(true);
    }, [isGoBack])
  );

  useEffect(() => {
    if (isGoBack) {
      recommendSearch();
    }
  }, [isGoBack]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? colors.darkTheme : "#fff",
      }}
    >
      <LinearBackGround
        height={140}
        title="Chào buổi "
        isDarkMode={isDarkMode}
      ></LinearBackGround>
      <Animatable.View duration={1000} style={[styles.search]} ref={searchRef}>
        <SearchTool
          isHome={true}
          onPress={onNavigateSearch}
          isDarkMode={isDarkMode}
        ></SearchTool>
      </Animatable.View>
      <Animated.ScrollView
        disableIntervalMomentum
        showsVerticalScrollIndicator={false}
        onScrollEndDrag={(e) => setPrevOffSetY(e.nativeEvent.contentOffset.y)}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {
            useNativeDriver: false,
          }
        )}
      >
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <Banner onPress={onBanner}></Banner>
            <View style={{ paddingLeft: 12 }}>
              <Text
                style={[
                  styles.otherHeading,
                  {
                    paddingLeft: 0,
                    color: isDarkMode ? colors.whiteText : "black",
                  },
                ]}
              >
                Đề xuất cho bạn
              </Text>
              {recommendations
                .filter((food, index) => index < 3)
                .map((food, index) => (
                  <FoodReview
                    {...food}
                    key={index}
                    isDarkMode={isDarkMode}
                    onTag={onTag}
                    onBlog={onBlog}
                  ></FoodReview>
                ))}
            </View>
            <RecommendList
              isDarkMode={isDarkMode}
              onNavigateTrending={onNavigateTrending}
              heading="Khám phá"
              explore
              data={exploreData}
              onBlog={onBlog}
            ></RecommendList>
            <View style={{ paddingBottom: 22 }}>
              <Text
                style={[
                  styles.otherHeading,
                  {
                    color: isDarkMode ? colors.whiteText : "black",
                  },
                ]}
              >
                Đa dạng món ăn
              </Text>
              <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                {variousFoods.map((food, index) => (
                  <ChipTag
                    isDarkmode={isDarkMode}
                    key={index}
                    title={food.title}
                    marginLeft={index === 0 ? 12 : 0}
                    onPress={onChipTab}
                    img={food.img}
                  ></ChipTag>
                ))}
              </ScrollView>
            </View>
            <RecommendList
              trending="popular"
              isDarkMode={isDarkMode}
              onNavigateTrending={onNavigateTrending}
              heading="Phổ biến"
              data={recommendLists}
              onBlog={onBlog}
            ></RecommendList>
            <RecommendList
              trending="love"
              isDarkMode={isDarkMode}
              onNavigateTrending={onNavigateTrending}
              heading="Yêu thích"
              data={recommendLists}
              onBlog={onBlog}
            ></RecommendList>
            <RecommendList
              trending="new"
              isDarkMode={isDarkMode}
              onNavigateTrending={onNavigateTrending}
              heading="Mới nhất"
              data={recommendLists}
              onBlog={onBlog}
            ></RecommendList>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default Home;
