import {
  View,
  FlatList,
  Image,
  useWindowDimensions,
  Animated,
  Easing,
  Text,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import styles from "./style";
import splashes from "../../../assets/img/splash";
import Paginator from "../../components/Paginator";
import ArrowButton from "../../components/ArrowButton";
import { fontFamilies } from "../../../constants";
import customeFont from "../../../constants/customeFont";
import { NavigationProp } from "@react-navigation/native";
import { montserratFonts } from "../../../constants/fontFamiles";

export interface RouterProps {
  navigation: NavigationProp<any, any>;
  route: any;
}

const Splash = ({ route, navigation }: RouterProps) => {
  const { width } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const bottomButton = useRef(new Animated.Value(0)).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const onNext = () => {
    if (activeIndex === splashes.length - 1) {
      navigation.navigate("AskAccount");
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  const viewableItemsChange = useRef(({ viewableItems }) => {
    setActiveIndex(viewableItems[0].index);
  }).current;

  useEffect(() => {
    Animated.timing(bottomButton, {
      toValue: 1,
      duration: 800,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, []);

  useEffect(() => {
    flatRef?.current.scrollToIndex({
      index: activeIndex,
      animated: true,
    });
  }, [activeIndex]);

  const isFont = customeFont();
  return (
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
                          opacity: opacity,
                          fontFamily: isFont
                            ? montserratFonts.extra
                            : undefined,
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
                        maxWidth: 300,
                        lineHeight: 20,
                      },
                      {
                        opacity: opacity,
                        fontFamily: isFont ? fontFamilies.bold : undefined,
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

      <View style={styles.paginator}>
        <Paginator scrollX={scrollX}></Paginator>
      </View>

      <Animated.View style={[styles.btn, { opacity: bottomButton }]}>
        <ArrowButton
          percentage={(activeIndex + 1) * (100 / splashes.length)}
          onNext={onNext}
        ></ArrowButton>
      </Animated.View>
    </View>
  );
};

export default Splash;
