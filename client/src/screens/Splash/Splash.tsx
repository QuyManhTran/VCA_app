import {
  View,
  FlatList,
  Image,
  useWindowDimensions,
  Animated,
  Easing,
} from "react-native";
import {
  useState,
  useRef,
  useEffect,
  useContext,
  useLayoutEffect,
} from "react";
import styles from "./style";
import { splashesDark, splashesLight } from "../../../assets/img/splash";
import Paginator from "../../components/Paginator";
import ArrowButton from "../../components/ArrowButton";
import { colors, fontFamilies } from "../../../constants";
import { NavigationProp } from "@react-navigation/native";
import { baloo2Fonts } from "../../../constants/fontFamiles";
import ThemeContext from "../../utilies/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface RouterProps {
  navigation: NavigationProp<any, any>;
  route: any;
}

const Splash = ({ route, navigation }: RouterProps) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { width } = useWindowDimensions();
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [splashes, setSplashes] = useState<any[]>();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const bottomButton = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const getIsDarkMode = async () => {
    try {
      const value = await AsyncStorage.getItem(
        process.env.EXPO_PUBLIC_DARK_MODE_KEY
      );
      if (value !== null) {
        setSplashes(
          JSON.parse(value).isDarkMode ? splashesDark : splashesLight
        );
      } else {
        setSplashes(splashesLight);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onNext = () => {
    if (activeIndex === splashes.length - 1) {
      navigation.navigate("AskAccount");
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  const viewableItemsChange = useRef(({ viewableItems }) => {
    if (viewableItems[0] !== undefined) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  useEffect(() => {
    getIsDarkMode();
  }, []);

  useEffect(() => {
    if (splashes) {
      setIsLoading(false);
    }
  }, [splashes]);

  useEffect(() => {
    Animated.timing(bottomButton, {
      toValue: 1,
      duration: 800,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, []);

  useEffect(() => {
    if (isLoading === false) {
      flatRef?.current.scrollToIndex({
        index: activeIndex,
        animated: true,
      });
    }
  }, [activeIndex]);
  return (
    <>
      {isLoading === false && (
        <View>
          <FlatList
            ref={flatRef}
            data={splashes}
            renderItem={({ item, index }) => {
              const inputRange = [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ];
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0, 1, 0],
                extrapolate: "clamp",
              });
              return (
                <View style={{ flex: 1 }} key={index}>
                  <Image
                    source={item.splash}
                    style={{
                      width: width,
                      height: "100%",
                      resizeMode: "cover",
                    }}
                  ></Image>
                  {item.heading && (
                    <View style={[styles.containerTitle, { width: width }]}>
                      <View style={{ flex: 0 }}>
                        <Animated.Text
                          style={[
                            styles.heading,
                            {
                              borderBottomColor: isDarkMode
                                ? colors.whiteText
                                : "black",
                              color: isDarkMode ? colors.whiteText : "black",
                              marginTop: width < 400 ? 0 : 10,
                              opacity: opacity,
                              fontFamily: baloo2Fonts.extra,
                            },
                          ]}
                        >
                          {item.heading}
                        </Animated.Text>
                      </View>
                      <Animated.Text
                        style={[
                          {
                            marginTop: 20,
                            maxWidth: width < 400 ? 300 : 320,
                            lineHeight: width < 400 ? 20 : 24,
                            fontSize: width < 400 ? 16 : 20,
                          },
                          {
                            color: isDarkMode ? colors.whiteText : "black",
                            opacity: opacity,
                            fontFamily: fontFamilies.bold,
                          },
                        ]}
                      >
                        {item.description}
                      </Animated.Text>
                    </View>
                  )}
                </View>
              );
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            initialScrollIndex={activeIndex}
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
            onViewableItemsChanged={viewableItemsChange}
            scrollEventThrottle={32}
            viewabilityConfig={viewConfig}
            bounces={false}
          ></FlatList>

          <View style={[styles.paginator, { top: width > 400 ? 670 : 660 }]}>
            <Paginator isDarkMode={isDarkMode} scrollX={scrollX}></Paginator>
          </View>

          <Animated.View
            style={[
              styles.btn,
              { opacity: bottomButton, top: width < 400 ? 698 : 720 },
            ]}
          >
            <ArrowButton
              percentage={(activeIndex + 1) * (100 / splashes.length)}
              onNext={onNext}
              isDarkMode={isDarkMode}
            ></ArrowButton>
          </Animated.View>
        </View>
      )}
    </>
  );
};

export default Splash;
