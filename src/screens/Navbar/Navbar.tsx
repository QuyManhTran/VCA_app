import React, { useEffect, useRef } from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../Home";
import { colors } from "../../../constants";
import Explore from "../Explore";
import Account from "../Account";
import MyTabBar from "./MyNavbar";
import MyTabBarIcon from "./MyTabBarIcon";

const Tab = createBottomTabNavigator();
const Navbar = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <MyTabBar {...props}></MyTabBar>}
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          left: 0,
          right: 0,
          paddingBottom: 20,
          backgroundColor: "#fff",
          height: 60,
          elevation: 2,
          shadowColor: "#171717",
          shadowOpacity: 0.5,
          shadowRadius: 8,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarIcon: ({ focused }) => (
          <MyTabBarIcon focused={focused} route={route}></MyTabBarIcon>
        ),
      })}
    >
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default Navbar;
