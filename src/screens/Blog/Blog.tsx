import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
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
const navItems = [
  { title: "Mô tả" },
  { title: "Ý nghĩa" },
  { title: "Công thức" },
];
const Blog = ({ route, navigation }: RouterProps) => {
  const { width } = useWindowDimensions();
  const { isDarkMode } = useContext(ThemeContext);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { name, img, like, rate, tag, isLiked, isRate, isFavorite } =
    route.params;
  const [activeNav, setActiveNav] = useState(0);
  const NavRef = useRef<FlatList>(null);
  const pageRef = useRef<FlatList>(null);
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
        <View style={{ marginHorizontal: 12 }}>
          <FlatList
            ref={pageRef}
            data={navItems}
            renderItem={({ item, index }) => {
              return (
                <View
                  key={index}
                  style={{
                    width: width - 24,
                    height: 300,
                  }}
                >
                  <Text style={{ fontSize: 30 }}>{item.title}</Text>
                </View>
              );
            }}
            horizontal
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const offSetX = Math.round(e.nativeEvent.contentOffset.x);
              if (offSetX % Math.round(width - 24) === 0) {
                setActiveNav(offSetX / Math.round(width - 24));
              }
            }}
          ></FlatList>
        </View>
      </View>
    </View>
  );
};

export default Blog;
