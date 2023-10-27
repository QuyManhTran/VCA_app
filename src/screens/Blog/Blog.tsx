import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
  Animated,
} from "react-native";
import { useCallback, useState, useContext, useRef, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { RouterProps } from "../Splash/Splash";
import Video from "../Video";
import styles from "./style";
import { Ionicons } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";
import Header from "./Header";
import ThemeContext from "../../utilies/theme";
import { colors } from "../../../constants";
import { navItems } from "../../../constants/fakeData";
import Description from "./Description";
import Meaning from "./Meaning";
import Recipe from "./Recipe";
import RateModal from "./RateModal";
import Comment from "./Comment";

const upComment = { 0: { top: 1000 }, 1: { top: 0 } };
const downComment = { 0: { top: 0 }, 1: { top: 1000 } };

const Blog = ({ route, navigation }: RouterProps) => {
  const { height, width } = useWindowDimensions();
  const { isDarkMode } = useContext(ThemeContext);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { name, img, like, rate, tag, isLiked, originRate, isFavorite } =
    route.params;
  const [isRate, setIsRate] = useState(originRate);
  const [activeNav, setActiveNav] = useState(0);
  const [contentY, setContentY] = useState(0);
  const [topComment, setTopComment] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [firstComment, setFirstComment] = useState(false);
  const NavRef = useRef<FlatList>(null);
  const pageRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const commentRef = useRef(null);
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
    let mode = offSetX % Math.round(width - 24);
    const interger = (offSetX - mode) / Math.round(width - 24);
    // console.log(offSetX);
    if (mode === 1 && interger > activeNav) {
      mode = 0;
    }
    if (mode === 0) {
      setActiveNav(Math.round(offSetX / Math.round(width - 24)));
    }
  };

  const closeModal = useCallback(() => {
    setIsModal(false);
  }, []);

  const openModal = useCallback(() => {
    setIsModal(true);
  }, []);

  const onRating = useCallback(() => {
    setIsRate(true);
    setIsModal(false);
  }, []);

  const openComment = useCallback(() => {
    setIsComment(true);
  }, []);

  const closeComment = useCallback(() => {
    setIsComment(false);
  }, []);

  useEffect(() => {
    if (!isFullscreen) {
      scrollX.setValue(activeNav * (width - 24));
    }
  }, [isFullscreen]);

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

  useEffect(() => {
    if (firstComment) {
      if (isComment) {
        commentRef.current.animate(upComment);
      } else {
        commentRef.current.animate(downComment);
      }
    } else {
      setFirstComment(true);
    }
  }, [isComment]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? colors.darkTheme : "#fff" },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.backBtn}
        onPress={onBack}
      >
        <Ionicons
          name="arrow-back"
          size={30}
          color={isDarkMode ? colors.primary : "black"}
        ></Ionicons>
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
          width={width}
          openModal={openModal}
          openComment={openComment}
        ></Header>
        <View
          style={[
            styles.wrapperNav,
            {
              backgroundColor: isDarkMode ? "transparent" : "#ff5c001a",
              borderColor: isDarkMode ? colors.whiteText : "transparent",
            },
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
                      minWidth: (width - 34) / 3,
                      backgroundColor:
                        activeNav === index ? "#ff5c00b8" : "transparent",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.navItemText,
                      {
                        color:
                          activeNav === index
                            ? "white"
                            : isDarkMode
                            ? colors.whiteText
                            : "black",
                      },
                    ]}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              );
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
          ></FlatList>
        </View>
        <View
          style={{
            paddingTop: 12,
            marginHorizontal: 12,
            height:
              width > 400 ? height - contentY + 38 : height - contentY + 30,
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
                    }}
                  >
                    <Meaning
                      content={item.content}
                      isDarkMode={isDarkMode}
                      width={width}
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
        <Animatable.View
          style={[
            styles.cmtWrapper,
            { backgroundColor: isDarkMode ? colors.darkTheme : "#fff" },
          ]}
          ref={commentRef}
          duration={500}
        >
          <Comment
            isDarkMode={isDarkMode}
            closeComment={closeComment}
          ></Comment>
        </Animatable.View>
      </View>
      {isModal && (
        <RateModal
          isDarkMode={isDarkMode}
          closeModal={closeModal}
          onRating={onRating}
        ></RateModal>
      )}
    </View>
  );
};

export default Blog;
