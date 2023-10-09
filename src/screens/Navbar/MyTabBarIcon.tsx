import { View, Text, StyleSheet } from "react-native";
import { useRef, useEffect, useContext } from "react";
import * as Animatable from "react-native-animatable";
import NavBarIcon from "../../../assets/icons/NavBarIcon";
import { LinearGradient } from "expo-linear-gradient";
import { navbarLinearColors } from "../../../constants/colors";
import { baloo2Fonts } from "../../../constants/fontFamiles";
import ThemeContext from "../../utilies/theme";
const MyTabBarIcon = ({ focused, route }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const animateFocused = {
    0: { scale: 1, translateY: 0 },
    1: { scale: 1.2, translateY: -24 },
  };
  const animateBlured = {
    0: { scale: 1.2, translateY: -24 },
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
    1: { scale: 1, translateY: -24 },
  };
  const textBlured = {
    0: { scale: 0, translateY: -24 },
    1: { scale: 0, translateY: 0 },
  };
  const tabRef = useRef(null);
  const circelRef = useRef(null);
  const lableRef = useRef(null);
  let iconName;
  if (route.name === "Home") {
    iconName = focused ? "home-fill" : "home-outline";
  } else if (route.name === "Library") {
    iconName = focused ? "album-fill" : "album-outline";
  } else if (route.name === "Account") {
    iconName = focused ? "user-fill" : "user-outline";
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
          width: 50,
          height: 50,
          borderRadius: 25,
          marginTop: 50,
        }}
      >
        <Animatable.View
          duration={500}
          ref={circelRef}
          style={{
            ...StyleSheet.absoluteFillObject,
            borderRadius: 25,
            overflow: "hidden",
          }}
        >
          <LinearGradient
            colors={navbarLinearColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          ></LinearGradient>
        </Animatable.View>
        <NavBarIcon
          name={iconName}
          width={28}
          height={28}
          darkMode={isDarkMode}
        ></NavBarIcon>
      </Animatable.View>
      <Animatable.Text
        duration={500}
        ref={lableRef}
        disabled={focused ? false : true}
        style={{
          fontSize: 18,
          fontFamily: baloo2Fonts.extra,
          color: isDarkMode ? "#fff" : "black",
        }}
      >
        {route.name}
      </Animatable.Text>
    </View>
  );
};

export default MyTabBarIcon;
