import React, { memo, useContext, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Foundation } from "@expo/vector-icons";
import LinearBackGround from "../../../components/LinearBackGround";
import { baloo2Fonts } from "../../../../constants/fontFamiles";
import ThemeContext from "../../../utilies/theme";
import { colors } from "../../../../constants";
import BackButton from "../../../components/BackButton";
import { LinearGradient } from "expo-linear-gradient";
import { navbarDarkLinearColors } from "../../../../constants/colors";

const Display = ({ navigation, ...props }) => {
  const { isDarkMode, onDarkTheme } = useContext(ThemeContext);
  const [isDark, setIsDark] = useState(isDarkMode);
  const onBack = () => {
    navigation.goBack();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? colors.darkTheme : "#fff",
      }}
    >
      <LinearGradient
        colors={isDarkMode ? navbarDarkLinearColors : ["#FF0701", "#FFD28D"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          flexDirection: "row",
          height: 120,
          alignItems: "center",
          gap: 16,
        }}
      >
        <BackButton
          onPress={onBack}
          size={28}
          color={isDarkMode ? "#fff" : "black"}
          customeStyle={{
            backgroundColor: isDarkMode ? colors.darkBg : "#fff",
            marginLeft: 10,
          }}
        ></BackButton>
        <Text
          style={{
            fontSize: 30,
            fontFamily: baloo2Fonts.extra,
            color: isDarkMode ? "black" : colors.whiteText,
          }}
        >
          Giao diện
        </Text>
      </LinearGradient>

      <View
        style={{
          marginTop: 20,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          padding: 5,
          marginHorizontal: 12,
          borderWidth: 1,
          borderColor: isDarkMode ? colors.whiteText : "black",
          borderRadius: 12,
          backgroundColor: isDarkMode ? colors.darkBg : "#fff",
        }}
      >
        <TouchableOpacity
          style={{ borderRadius: 25, alignItems: "center" }}
          onPress={() => {
            setIsDark(false);
            onDarkTheme(false);
          }}
        >
          <Image
            style={{
              width: 107,
              height: 197,
              resizeMode: "stretch",
              borderRadius: 25,
            }}
            source={require("../../../../assets/img/accounts/Light2.png")}
          />
          <Text
            style={{
              fontFamily: baloo2Fonts.bold,
              fontSize: 20,
              color: isDarkMode ? colors.whiteText : "black",
            }}
          >
            Sáng
          </Text>
          {!isDark && (
            <Foundation
              name="checkbox"
              size={24}
              color={isDarkMode ? colors.whiteText : "black"}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={{ borderRadius: 25, alignItems: "center" }}
          onPress={() => {
            setIsDark(true);
            onDarkTheme(true);
          }}
        >
          <Image
            style={{
              width: 107,
              height: 197,
              resizeMode: "stretch",
              borderRadius: 25,
            }}
            source={require("../../../../assets/img/accounts/Dark2.png")}
          />
          <Text
            style={{
              fontFamily: baloo2Fonts.bold,
              fontSize: 20,
              color: isDarkMode ? colors.whiteText : "black",
            }}
          >
            Tối
          </Text>
          {isDark && (
            <Foundation
              name="checkbox"
              size={24}
              color={isDarkMode ? colors.whiteText : "black"}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(Display);
