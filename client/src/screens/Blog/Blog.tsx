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
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
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
import {
  blogService,
  checkLikeService,
  checkRateService,
  rateReactService,
} from "../../services/blogService";
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
  const { id, name, image } = route.params;
  const { isFavorite: isFavoriteOrigin } = {
    isFavorite: false,
  };
  const { isDarkMode, userId, userInfor } = useContext(ThemeContext);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [description, setDescription] = useState("");
  const [histories, setHistories] = useState<history[]>([]);
  const [ingredientList, setIngredientList] = useState<ingredients[]>([]);
  const [video, setVideo] = useState<string>("");
  const [like, setLike] = useState(route.params.like);
  const [rate, setRate] = useState(route.params.rate);
  const [model3d, setModel3d] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isRated, setIsRated] = useState(false);
  const [isFavorite, setIsFavorite] = useState(isFavoriteOrigin);
  const [activeNav, setActiveNav] = useState(0);
  const [contentY, setContentY] = useState<number | null>(null);
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
  const descriptionScrollY = useRef(new Animated.Value(0)).current;
  const meaningScrollY = useRef(new Animated.Value(0)).current;
  const recipeScrollY = useRef(new Animated.Value(0)).current;
  const diffClampDescriptionScrollY = Animated.diffClamp(
    descriptionScrollY,
    0,
    800
  );
  const diffClampScrollY = Animated.diffClamp(meaningScrollY, 0, 800);
  const diffClampRecipeScrollY = Animated.diffClamp(recipeScrollY, 0, 800);
  const headerBottomRef: {
    current: Animated.AnimatedInterpolation<string | number>;
  } = useRef(new Animated.Value(0));
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

  const onRating = useCallback(async (star: number) => {
    setIsRated(true);
    setIsModal(false);
    const response = await rateReactService.rateReact(
      rateReactService.rateReactPath,
      {
        food_id: id,
        user_id: userId,
        rateUser: star + 1,
      }
    );
    if (response.message === 200) {
      setRate(response.data?.rate || rate);
    }
  }, []);

  const onLiking = useCallback(() => {
    setIsLiked(!isLiked);
    setLike((prev) => (isLiked ? prev - 1 : prev + 1));
  }, [isLiked]);

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

  const onNavigate3D = () => {
    navigation.navigate("Model3d", {
      isDarkMode,
      model3d,
      name,
    });
  };

  useEffect(() => {
    const updateActivity = async () => {
      try {
        const response = await postHistoryService.postHistory(
          postHistoryService.postHistoryPath,
          {
            id_food: id,
            id_user: userId,
          }
        );
      } catch (error) {
        console.log(error);
      }
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
          like,
          rate,
          model_3d,
        } = response.data;
        setModel3d(model_3d || model3d);
        setHistories(history);
        setDescription(descriptionAPI);
        setVideo(video);
        setIngredientList(ingredient_list);
        setLike(like);
        setRate(rate);
      }
    };
    const getIsLiked = async () => {
      const response = await checkLikeService.checkLike(
        checkLikeService.checkLikePath,
        {
          food_id: id,
          user_id: userId,
        }
      );
      if (response.message === 200) {
        setIsLiked(response.data?.isLiked || isLiked);
      }
    };
    const getIsRated = async () => {
      const response = await checkRateService.checkRate(
        checkRateService.checkRatePath,
        {
          food_id: id,
          user_id: userId,
        }
      );
      if (response.message === 200) {
        setIsRated(response.data?.isRated || isRated);
      }
    };
    getBlog();
    getIsLiked();
    getIsRated();
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

  useEffect(() => {
    if (activeNav === 0) {
      descriptionScrollY.addListener(({ value }) => {
        if (contentY !== 0) {
          setContentY(0);
        }
        const headerBottomValue =
          2 * Math.abs(Number(JSON.stringify(headerBottomRef.current)));
        if (
          (value <= 288 && value >= headerBottomValue) ||
          (value >= 0 && value <= headerBottomValue)
        ) {
          headerBottomRef.current = diffClampDescriptionScrollY.interpolate({
            inputRange: [0, 288, 800],
            outputRange: [0, -150, -150],
          });
        }
      });
    }
    if (activeNav === 1) {
      meaningScrollY.addListener(({ value }) => {
        if (contentY !== 1) {
          setContentY(1);
        }
        const headerBottomValue =
          2 * Math.abs(Number(JSON.stringify(headerBottomRef.current)));
        if (
          (value <= 288 && value >= headerBottomValue) ||
          (value >= 0 && value <= headerBottomValue)
        ) {
          headerBottomRef.current = diffClampScrollY.interpolate({
            inputRange: [0, 288, 800],
            outputRange: [0, -150, -150],
          });
        }
      });
    }
    if (activeNav === 2) {
      recipeScrollY.addListener(({ value }) => {
        if (contentY !== 2) {
          setContentY(2);
        }
        const headerBottomValue =
          2 * Math.abs(Number(JSON.stringify(headerBottomRef.current)));
        if (
          (value <= 288 && value >= headerBottomValue) ||
          (value >= 0 && value <= headerBottomValue)
        ) {
          headerBottomRef.current = diffClampRecipeScrollY.interpolate({
            inputRange: [0, 288, 800],
            outputRange: [0, -150, -150],
          });
        }
      });
    }
    return () => {
      meaningScrollY.removeAllListeners();
      recipeScrollY.removeAllListeners();
    };
  }, [activeNav]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? colors.darkTheme : "#fff",
        },
      ]}
    >
      <View style={[styles.headerWrapper, { top: width < 400 ? 24 : 36 }]}>
        <TouchableOpacity activeOpacity={0.6} onPress={onBack}>
          <Ionicons
            name="arrow-back"
            size={30}
            color={isDarkMode ? colors.whiteText : "black"}
          ></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onNavigate3D}
          style={{ paddingHorizontal: 12, justifyContent: "center" }}
        >
          <MaterialIcons
            name="3d-rotation"
            size={28}
            color={isDarkMode ? colors.whiteText : "black"}
          />
        </TouchableOpacity>
      </View>
      <Video
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
        video={video}
        thumbnail={image}
      ></Video>
      <View
        style={{
          display: isFullscreen ? "none" : "flex",
          flex: isFullscreen ? 0 : 1,
        }}
      >
        <Header
          headerBottom={headerBottomRef.current}
          onLiking={onLiking}
          blogId={id}
          userId={userId}
          name={name}
          like={like}
          rate={rate}
          image={image}
          isDarkMode={isDarkMode}
          isLiked={isLiked}
          isFavorite={isFavorite}
          isRated={isRated}
          width={width}
          openModal={openModal}
          openComment={openComment}
          openFavoriteModal={openFavoriteModal}
        ></Header>
        <Animated.View
          style={[
            styles.wrapperNav,
            {
              backgroundColor: isDarkMode ? "transparent" : "#ff5c001a",
              borderColor: isDarkMode ? colors.whiteText : "transparent",
              transform: [{ translateY: headerBottomRef.current }],
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
        </Animated.View>
        <Animated.View
          style={{
            height: "120%",
            marginTop: headerBottomRef.current.interpolate({
              inputRange: [-150, 0],
              outputRange: [50, 194],
            }),
            paddingBottom: 130,
          }}
        >
          <View
            style={{
              paddingTop: 12,
              marginHorizontal: 12,
              height: "92%",
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
                      onScroll={Animated.event(
                        [
                          {
                            nativeEvent: {
                              contentOffset: {
                                y: descriptionScrollY,
                              },
                            },
                          },
                        ],
                        {
                          useNativeDriver: false,
                        }
                      )}
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
                      onScroll={Animated.event(
                        [
                          {
                            nativeEvent: {
                              contentOffset: {
                                y: meaningScrollY,
                              },
                            },
                          },
                        ],
                        {
                          useNativeDriver: false,
                        }
                      )}
                      showsVerticalScrollIndicator={false}
                      key={index}
                      style={{
                        width: width - 24,
                        opacity: opacity,
                        height: "100%",
                      }}
                    >
                      <Meaning
                        histories={histories}
                        isDarkMode={isDarkMode}
                      ></Meaning>
                    </Animated.ScrollView>
                  );
                } else {
                  return (
                    <Animated.ScrollView
                      onScroll={Animated.event(
                        [
                          {
                            nativeEvent: {
                              contentOffset: {
                                y: recipeScrollY,
                              },
                            },
                          },
                        ],
                        {
                          useNativeDriver: false,
                        }
                      )}
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
        </Animated.View>
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
