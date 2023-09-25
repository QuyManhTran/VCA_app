import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../Home";
import { colors, fontFamilies } from "../../../constants";
import Explore from "../Explore";
import Account from "../Account";

const Tab = createBottomTabNavigator();
const Navbar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: 20,
          backgroundColor: "#fff",
          height: 60,
          elevation: 2,
          shadowColor: "#171717",
          shadowOpacity: 0.5,
          shadowRadius: 8,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Explore") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "person" : "person-outline";
          }
          return (
            <View
              style={{
                alignItems: "center",
                paddingTop: 8,
              }}
            >
              <Ionicons
                name={iconName}
                size={28}
                color={focused ? colors.primary : "#777"}
                style={{
                  marginTop: 8,
                }}
              />
              <Text
                disabled={focused ? false : true}
                style={{
                  color: focused ? colors.primary : "#777",
                  fontSize: 14,
                }}
              >
                {route.name}
              </Text>
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        //   initialParams={{
        //     lastname: userData.lastname,
        //   }}
      />
      <Tab.Screen name="Explore" component={Explore} />
      <Tab.Screen
        name="Account"
        component={Account}
        //   initialParams={{
        //     role: userData.title,
        //     email: userData.email,
        //     password: userData.password,
        //   }}
      />
    </Tab.Navigator>
  );
};

export default Navbar;
