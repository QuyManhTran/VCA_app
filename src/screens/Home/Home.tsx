import { View, Text, ScrollView, useWindowDimensions } from "react-native";
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
const searchUp = {
  0: { translateY: 0 },
  1: { translateY: -60 },
};
const searchDown = {
  0: { translateY: -60 },
  1: { translateY: 0 },
};
const Home = ({ route, navigation }: RouterProps) => {
  const { width, height } = useWindowDimensions();
  const { isDarkMode, setHomeNavbar } = useContext(ThemeContext);
  const [prevOffSetY, setPrevOffSetY] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampScrollY = Animated.diffClamp(scrollY, 0, 70);
  const searchRef = useRef(null);
  const [countVar, setCountVar] = useState(0);
  const headerBottom = diffClampScrollY.interpolate({
    inputRange: [0, 35],
    outputRange: [0, -70],
  });

  const onNavigateSearch = useCallback((params: object) => {
    navigation.navigate("Search", params);
  }, []);

  const onTag = useCallback((keyword: string) => {
    navigation.navigate("Search", { keyword: keyword });
  }, []);

  const onBanner = useCallback((keyword: string) => {
    navigation.navigate("Search", { keyword: keyword });
  }, []);

  const onChipTab = useCallback((keyword: string) => {
    navigation.navigate("Search", { keyword: keyword });
  }, []);

  const onBlog = useCallback(({ ...props }) => {
    navigation.navigate("Blog", { ...props });
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? colors.darkTheme : "#fff",
      }}
    >
      <LinearBackGround
        height={140}
        title="Chào buổi sáng"
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
            <View style={{ paddingLeft: 24 }}>
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
              {mostlySearch
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
              onNavigateSearch={onNavigateSearch}
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
                    marginLeft={index === 0 ? 24 : 0}
                    onPress={onChipTab}
                    img={food.img}
                  ></ChipTag>
                ))}
              </ScrollView>
            </View>
            <RecommendList
              isDarkMode={isDarkMode}
              onNavigateSearch={onNavigateSearch}
              heading="Phổ biến"
              data={recommendLists}
              onBlog={onBlog}
            ></RecommendList>
            <RecommendList
              isDarkMode={isDarkMode}
              onNavigateSearch={onNavigateSearch}
              heading="Yêu thích"
              data={recommendLists}
              onBlog={onBlog}
            ></RecommendList>
            <RecommendList
              isDarkMode={isDarkMode}
              onNavigateSearch={onNavigateSearch}
              heading="Thêm gần đây"
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
