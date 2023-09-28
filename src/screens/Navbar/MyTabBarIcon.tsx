import { View, Text, StyleSheet } from "react-native";
import React, { useRef, useEffect } from "react";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../constants";
const MyTabBarIcon = ({ focused, route }) => {
  const animateFocused = {
    0: { scale: 1, translateY: 0 },
    1: { scale: 1.2, translateY: -20 },
  };
  const animateBlured = {
    0: { scale: 1.2, translateY: -20 },
    1: { scale: 1, translateY: 0 },
  };
  const circleFocused = {
    0: { scale: 0 },
    0.3: { scale: 0.3 },
    0.5: { scale: 0.5 },
    0.8: { scale: 0.7 },
    1: { scale: 1 },
  };
  const circleBlured = {
    0: { scale: 1 },
    1: { scale: 0 },
  };
  const textFocused = {
    0: { scale: 1, translateY: 0 },
    1: { scale: 1, translateY: -20 },
  };
  const textBlured = {
    0: { scale: 0, translateY: -20 },
    1: { scale: 0, translateY: 0 },
  };
  const tabRef = useRef(null);
  const circelRef = useRef(null);
  const lableRef = useRef(null);
  let iconName;
  if (route.name === "Home") {
    iconName = focused ? "home" : "home-outline";
  } else if (route.name === "Explore") {
    iconName = focused ? "search" : "search-outline";
  } else if (route.name === "Account") {
    iconName = focused ? "person" : "person-outline";
  }
  useEffect(() => {
    if (focused) {
      tabRef.current.animate(animateFocused);
      circelRef.current.animate(circleFocused);
      lableRef.current.animate(textFocused);
    } else {
      tabRef.current.animate(animateBlured);
      circelRef.current.animate(circleBlured);
      lableRef.current.animate(textBlured);
    }
  }, [focused]);

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Animatable.View
        ref={tabRef}
        duration={500}
        style={{
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 4,
          borderColor: "#fff",
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: "#fff",
          marginTop: 34,
        }}
      >
        <Animatable.View
          duration={500}
          ref={circelRef}
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: colors.primary,
            borderRadius: 25,
          }}
        ></Animatable.View>
        <Ionicons
          name={iconName}
          size={28}
          color={focused ? "#fff" : colors.primary}
        />
      </Animatable.View>
      <Animatable.Text
        duration={500}
        ref={lableRef}
        disabled={focused ? false : true}
        style={{
          color: colors.primary,
          fontSize: 14,
        }}
      >
        {route.name}
      </Animatable.Text>
    </View>
  );
};

export default MyTabBarIcon;
