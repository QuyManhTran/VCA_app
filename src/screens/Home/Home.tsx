import { View, Text, ScrollView, useWindowDimensions } from "react-native";
import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react";
import styles from "./style";
import ThemeContext, { darkTheme } from "../../utilies/theme";
import { Animated } from "react-native";
import * as Animatable from "react-native-animatable";
import { RouterProps } from "../Splash/Splash";
import LinearBackGround from "../../components/LinearBackGround";
import RecommendList from "../../components/RecommendList";
import ChipTag from "../../components/ChipTag";
import ImageIcon from "../../../assets/icons/ImageIcon";
import { variousFoods } from "../../../constants/fakeData";
import { baloo2Fonts } from "../../../constants/fontFamiles";
import SearchTool from "../../components/SearchTool";
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
    <View style={{ flex: 1 }}>
      <LinearBackGround height={140} title="Chào buổi sáng"></LinearBackGround>
      <Animatable.View duration={1000} style={[styles.search]} ref={searchRef}>
        <SearchTool isHome={true} onPress={onNavigateSearch}></SearchTool>
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
            <RecommendList
              onNavigateSearch={onNavigateSearch}
              heading="Khám phá"
              explore
            ></RecommendList>
            <View style={{ paddingBottom: 24 }}>
              <Text
                style={{
                  fontSize: 26,
                  fontFamily: baloo2Fonts.extra,
                  paddingBottom: 8,
                  paddingLeft: 24,
                }}
              >
                Đa dạng món ăn
              </Text>
              <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                {variousFoods.map((food, index) => (
                  <ChipTag
                    key={index}
                    title={food.title}
                    marginLeft={index === 0 ? 24 : 0}
                  >
                    <ImageIcon img={food.img}></ImageIcon>
                  </ChipTag>
                ))}
              </ScrollView>
            </View>
            <RecommendList
              onNavigateSearch={onNavigateSearch}
              heading="Phổ biến"
            ></RecommendList>
            <RecommendList
              onNavigateSearch={onNavigateSearch}
              heading="Yêu thích"
            ></RecommendList>
            <RecommendList
              onNavigateSearch={onNavigateSearch}
              heading="Thêm gần đây"
            ></RecommendList>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default Home;
