import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
  Animated,
} from "react-native";
import { useCallback, useState, useContext, useRef, useEffect } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import { RouterProps } from "../Splash/Splash";
import Header from "./Header";
import Description from "./Description";
import Meaning from "./Meaning";
import Recipe from "./Recipe";
import RateModal from "./RateModal";
import Comment from "./Comment";
import Video from "../Video";
import ThemeContext from "../../utilies/theme";
import styles from "./style";
import { colors } from "../../../constants";
import { navItems } from "../../../constants/fakeData";
import { blogService } from "../../services/blogService";
import { history } from "./Meaning/Meaning";
import { ingredients } from "./Recipe/Recipe";
import FavoriteModal from "./FavoriteModal";
import { baloo2Fonts } from "../../../constants/fontFamiles";
import { postHistoryService } from "../../services/profileService";

const upComment = { 0: { top: 1000 }, 1: { top: 0 } };
const downComment = { 0: { top: 0 }, 1: { top: 1000 } };
const saveFavoriteAnimation = {
  0: { bottom: -50 },
  0.1: { bottom: 0 },
  0.98: { bottom: 0 },
  1: { bottom: -50 },
};

const Blog = ({ route, navigation }: RouterProps) => {
  const { height, width } = useWindowDimensions();
  const { id, name, like, image, rate } = route.params;
  const {
    isLiked,
    originRate,
    isFavorite: isFavoriteOrigin,
  } = {
    isLiked: false,
    originRate: false,
    isFavorite: false,
  };
  const { isDarkMode, userId, userInfor } = useContext(ThemeContext);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [description, setDescription] = useState("");
  const [histories, setHistories] = useState<history[]>([]);
  const [ingredientList, setIngredientList] = useState<ingredients[]>([]);
  const [video, setVideo] = useState<string>("");
  const [isRate, setIsRate] = useState(originRate);
  const [isFavorite, setIsFavorite] = useState(isFavoriteOrigin);
  const [activeNav, setActiveNav] = useState(0);
  const [contentY, setContentY] = useState(0);
  const [isModal, setIsModal] = useState(false);
  const [isFavoriteModal, setIsFavoriteModal] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [firstComment, setFirstComment] = useState(false);
  const [isSavedFavorite, setIsSavedFavorite] = useState<boolean>(null);
  const timoutRef: { current: NodeJS.Timeout } = useRef(null);
  const FavoriteRef = useRef(null);
  const navRef = useRef<FlatList>(null);
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

  const openFavoriteModal = useCallback(() => {
    setIsFavoriteModal(true);
  }, []);

  const closeFavoriteModal = useCallback(() => {
    setIsFavoriteModal(false);
  }, []);

  const onRating = useCallback(() => {
    setIsRate(true);
    setIsModal(false);
  }, []);

  const onFavoriting = useCallback(() => {
    setIsFavorite(true);
    setIsSavedFavorite(true);
  }, []);

  const openComment = useCallback(() => {
    setIsComment(true);
  }, []);

  const closeComment = useCallback(() => {
    setIsComment(false);
  }, []);

  useEffect(() => {
    const updateActivity = async () => {
      const response = await postHistoryService.postHistory(
        postHistoryService.postHistoryPath,
        {
          id_food: id,
          id_user: userId,
        }
      );
      console.log(response.message);
    };
    return () => {
      updateActivity();
    };
  }, []);

  // Call API
  useEffect(() => {
    const getBlog = async () => {
      const response = await blogService.getBlog(blogService.blogPath, {
        _id: id,
      });
      if (response.message === 200) {
        const {
          history,
          video,
          description: descriptionAPI,
          ingredient_list,
        } = response.data;
        setHistories(history);
        setDescription(descriptionAPI);
        setVideo(video);
        setIngredientList(ingredient_list);
      }
    };
    getBlog();
    return () => clearTimeout(timoutRef.current as NodeJS.Timeout);
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
    if (navRef.current) {
      navRef.current.scrollToIndex({
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

  useEffect(() => {
    if (isSavedFavorite) {
      FavoriteRef.current?.animate(saveFavoriteAnimation);
      timoutRef.current = setTimeout(() => {
        setIsSavedFavorite(null);
      }, 3000);
    }
  }, [isSavedFavorite]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? colors.darkTheme : "#fff" },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.6}
        style={[styles.backBtn, { top: width < 400 ? 24 : 32 }]}
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
        video={video}
        thumbnail={image}
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
          image={image}
          isDarkMode={isDarkMode}
          isLiked={isLiked}
          isFavorite={isFavorite}
          isRate={isRate}
          width={width}
          openModal={openModal}
          openComment={openComment}
          openFavoriteModal={openFavoriteModal}
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
            ref={navRef}
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
                  <Animated.ScrollView
                    showsVerticalScrollIndicator={false}
                    key={index}
                    style={{
                      width: width - 24,
                      opacity: opacity,
                    }}
                  >
                    <Description
                      content={description}
                      isDarkMode={isDarkMode}
                    ></Description>
                  </Animated.ScrollView>
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
                      histories={histories}
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
                    <Recipe
                      isDarkMode={isDarkMode}
                      ingredientList={ingredientList}
                    ></Recipe>
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
            blogId={id}
            userId={userId}
            userInfor={userInfor}
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
      {isFavoriteModal && (
        <FavoriteModal
          blogId={id}
          onFavoriting={onFavoriting}
          isDarkMode={isDarkMode}
          onCloseModal={closeFavoriteModal}
        ></FavoriteModal>
      )}
      {isSavedFavorite && (
        <Animatable.View
          duration={3000}
          ref={FavoriteRef}
          style={{
            position: "absolute",
            bottom: -50,
            left: 0,
            width: "100%",
            alignItems: "center",
            height: 50,
            backgroundColor: isDarkMode ? colors.darkBg : "#fff",
            justifyContent: "center",
            borderTopColor: isDarkMode ? "tranparent" : "black",
            borderTopWidth: isDarkMode ? 0 : 1,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontFamily: baloo2Fonts.semi,
              color: colors.primary,
            }}
          >
            Lưu thành công
          </Text>
        </Animatable.View>
      )}
    </View>
  );
};

export default Blog;
