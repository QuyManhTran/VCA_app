import { View, Text, TouchableOpacity, Easing } from "react-native";
import { Animated } from "react-native";
import { useContext, useEffect, useRef } from "react";
import ThemeContext from "../../utilies/theme";
import { LinearGradient } from "expo-linear-gradient";
import { navbarLinearColors } from "../../../constants/colors";
function MyTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const { isHomeScrollDown } = useContext(ThemeContext);
  const bottomDownAnimation = useRef(new Animated.Value(0)).current;

  const navBarAnimation = useRef(new Animated.Value(-60)).current;
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  useEffect(() => {
    Animated.timing(navBarAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, []);

  useEffect(() => {
    if (isHomeScrollDown) {
      Animated.timing(bottomDownAnimation, {
        toValue: 90,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(bottomDownAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [isHomeScrollDown]);

  return (
    <Animated.View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        ...focusedOptions.tabBarStyle,
        bottom: navBarAnimation,
        transform: [{ translateY: bottomDownAnimation }],
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
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
        }}
      ></LinearGradient>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={index}
          >
            {options.tabBarIcon &&
              options.tabBarIcon({
                focused: isFocused,
                color: "blue",
                size: 28,
                route,
              })}
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
}
export default MyTabBar;
