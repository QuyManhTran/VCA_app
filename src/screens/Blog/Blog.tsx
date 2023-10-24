import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
  Animated,
} from "react-native";
import { useCallback, useState, useContext, useRef, useEffect } from "react";
import { RouterProps } from "../Splash/Splash";
import Video from "../Video";
import styles from "./style";
import { Ionicons } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";
import Header from "./Header";
import ThemeContext from "../../utilies/theme";
import { colors } from "../../../constants";
import Description from "./Description/Description";
import Meaning from "./Meaning/Meaning";
import { navItems } from "../../../constants/fakeData";
import Recipe from "./Recipe/Recipe";
const Blog = ({ route, navigation }: RouterProps) => {
  const { height, width } = useWindowDimensions();
  const { isDarkMode } = useContext(ThemeContext);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { name, img, like, rate, tag, isLiked, isRate, isFavorite } =
    route.params;
  const [activeNav, setActiveNav] = useState(0);
  const [contentY, setContentY] = useState(0);
  const NavRef = useRef<FlatList>(null);
  const pageRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const contentRef = useRef<View>(null);
  const onBack = () => {
    navigation.goBack();
  };
  const toggleFullscreen = useCallback(async () => {
    if (isFullscreen) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
      setIsFullscreen(false);
    } else {
      // Enter fullscreen mode
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
      setIsFullscreen(true);
    }
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  const onHorizontalScroll = (value: number) => {
    const offSetX = Math.round(value);
    const mode = offSetX % Math.round(width - 24);
    if (mode === 0) {
      setActiveNav(Math.round(offSetX / Math.round(width - 24)));
    }
  };

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      if (!isFullscreen) {
        onHorizontalScroll(value);
      }
    });
    return () => scrollX.removeAllListeners();
  }, [scrollX]);

  useEffect(() => {
    if (NavRef.current) {
      NavRef.current.scrollToIndex({
        index: activeNav,
        animated: true,
      });
    }
    if (pageRef.current) {
      pageRef.current.scrollToIndex({
        index: activeNav,
        animated: true,
      });
    }
  }, [activeNav]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.backBtn}
        onPress={onBack}
      >
        <Ionicons name="arrow-back" size={30}></Ionicons>
      </TouchableOpacity>
      <Video
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
      ></Video>
      <View
        style={{
          display: isFullscreen ? "none" : "flex",
        }}
      >
        <Header
          name={name}
          like={like}
          rate={rate}
          img={img}
          isDarkMode={isDarkMode}
          isLiked={isLiked}
          isFavorite={isFavorite}
          isRate={isRate}
        ></Header>
        <View
          style={[
            styles.wrapperNav,
            { backgroundColor: isDarkMode ? colors.gray : "#ff5c001a" },
          ]}
        >
          <FlatList
            ref={NavRef}
            data={navItems}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => setActiveNav(index)}
                  key={index}
                  style={[
                    styles.navItem,
                    {
                      minWidth: (width - 32) / 3,
                      backgroundColor:
                        activeNav === index ? "#ff5c00b8" : "transparent",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.navItemText,
                      { color: activeNav === index ? "white" : "black" },
                    ]}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
            horizontal
          ></FlatList>
        </View>
        <View
          style={{
            paddingTop: 12,
            marginHorizontal: 12,
            height: height - contentY + 30,
          }}
          ref={contentRef}
          onLayout={(e) => {
            if (contentRef.current) {
              contentRef.current.measure(
                (x, y, width, height, pageX, pageY) => {
                  setContentY(Math.round(pageY));
                }
              );
            }
          }}
        >
          <FlatList
            ref={pageRef}
            data={navItems}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 1) * (width - 24),
                index * (width - 24),
                (index + 1) * (width - 24),
              ];
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0, 1, 0],
                extrapolate: "clamp",
              });
              if (index === 0) {
                return (
                  <Animated.View
                    key={index}
                    style={{
                      width: width - 24,
                      opacity: opacity,
                    }}
                  >
                    <Description
                      content={item.content}
                      isDarkMode={isDarkMode}
                    ></Description>
                  </Animated.View>
                );
              } else if (index === 1) {
                return (
                  <Animated.ScrollView
                    showsVerticalScrollIndicator={false}
                    key={index}
                    style={{
                      width: width - 24,
                      opacity: opacity,
                      // maxHeight: 500,
                    }}
                  >
                    <Meaning
                      content={item.content}
                      isDarkMode={isDarkMode}
                    ></Meaning>
                  </Animated.ScrollView>
                );
              } else {
                return (
                  <Animated.ScrollView
                    showsVerticalScrollIndicator={false}
                    key={index}
                    style={{
                      width: width - 24,
                      opacity: opacity,
                    }}
                  >
                    <Recipe isDarkMode={isDarkMode}></Recipe>
                  </Animated.ScrollView>
                );
              }
            }}
            horizontal
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { x: scrollX },
                  },
                },
              ],
              {
                useNativeDriver: false,
              }
            )}
          ></FlatList>
        </View>
      </View>
    </View>
  );
};

export default Blog;
