import {
  View,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React, { useState, useContext, useRef, useEffect } from "react";
import ThemeContext, { darkTheme } from "../../utilies/theme";
import { Animated } from "react-native";
import { RouterProps } from "../Splash/Splash";

const Home = ({ route, navigation }: RouterProps) => {
  const { width, height } = useWindowDimensions();
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
          justifyContent: "center",
          backgroundColor: isDarkMode ? darkTheme.backGroundColor : undefined,
          height: 1000,
        }}
      >
        <Text style={{ fontSize: 40 }}>Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Video")}>
          <Text style={{ fontSize: 40 }}>Watch Video</Text>
        </TouchableOpacity>
      </View>
    </Animated.ScrollView>
  );
};

export default Home;
