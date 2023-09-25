import { View, Text, Switch, ScrollView } from "react-native";
import React, { useState, useContext, useRef } from "react";
import ThemeContext, { darkTheme } from "../../utilies/theme";
import { StatusBar } from "expo-status-bar";
import { Animated } from "react-native";

const Home = () => {
  const isDarkMode = useContext(ThemeContext);
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampScrollY = Animated.diffClamp(scrollY, 0, 70);
  const headerBottom = diffClampScrollY.interpolate({
    inputRange: [0, 14],
    outputRange: [0, -70],
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
        bounces={false}
        showsVerticalScrollIndicator={false}
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
