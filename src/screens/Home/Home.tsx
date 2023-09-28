import { View, Text, Switch, ScrollView } from "react-native";
import React, { useState, useContext, useRef, useEffect } from "react";
import ThemeContext, { darkTheme } from "../../utilies/theme";
import { Animated } from "react-native";
import { RouterProps } from "../Splash/Splash";

const Home = ({ route, navigation }: RouterProps) => {
  const { isDarkMode, setHomeNavbar } = useContext(ThemeContext);
  const [prevOffSetY, setPrevOffSetY] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampScrollY = Animated.diffClamp(scrollY, 0, 70);
  const headerBottom = diffClampScrollY.interpolate({
    inputRange: [0, 35],
    outputRange: [0, -70],
  });

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      if (value > prevOffSetY) {
        setHomeNavbar(true);
      } else {
        setHomeNavbar(false);
      }
    });
    return () => scrollY.removeAllListeners();
  });

  return (
    <View>
      <Animated.View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 70,
          backgroundColor: "grey",
          justifyContent: "center",
          alignItems: "center",
          transform: [{ translateY: headerBottom }],
        }}
      >
        <Text>Header</Text>
      </Animated.View>
      <Animated.ScrollView
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
        <View
          style={{
            flex: 1,
            alignItems: "center",
            backgroundColor: isDarkMode ? darkTheme.backGroundColor : undefined,
            height: 2000,
          }}
        >
          <Text
            style={{
              marginTop: 200,
              fontSize: 30,
              fontWeight: "600",
              color: isDarkMode ? darkTheme.color : undefined,
            }}
          >
            Home
          </Text>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default Home;
