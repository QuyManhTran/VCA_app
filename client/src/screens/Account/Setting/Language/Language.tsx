import React, { memo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Foundation } from "@expo/vector-icons";

import { useContext } from "react";
import LinearBackGround from "../../../../components/LinearBackGround";
import { baloo2Fonts } from "../../../../../constants/fontFamiles";
import ThemeContext from "../../../../utilies/theme";
import { colors } from "../../../../../constants";
import BackButton from "../../../../components/BackButton";
import { LinearGradient } from "expo-linear-gradient";
import { navbarDarkLinearColors } from "../../../../../constants/colors";

type listLanguage = "VietNamese" | "English";

const Language = ({ navigation, ...props }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [language, Setlanguage] = useState<listLanguage>("VietNamese");

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
          {language === "VietNamese" ? "Ngôn ngữ" : "Languages"}
        </Text>
      </LinearGradient>

      <View style={styles.wrapper}>
        <TouchableOpacity
          style={[
            styles.wapperOption,
            language === "VietNamese" && {
              borderWidth: 1,
              borderColor: colors.primary,
            },
          ]}
          onPress={() => Setlanguage("VietNamese")}
        >
          <Text
            style={[
              styles.optionText,
              { color: isDarkMode ? colors.whiteText : "black" },
            ]}
          >
            Tiếng việt
          </Text>
          {language === "VietNamese" && (
            <Foundation
              name="checkbox"
              size={24}
              color={isDarkMode ? colors.whiteText : "black"}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.wapperOption,
            language === "English" && {
              borderWidth: 1,
              borderColor: colors.primary,
            },
          ]}
          onPress={() => Setlanguage("English")}
        >
          <Text
            style={[
              styles.optionText,
              { color: isDarkMode ? colors.whiteText : "black" },
            ]}
          >
            English
          </Text>
          {language === "English" && (
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

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
  },
  optionText: {
    fontFamily: baloo2Fonts.medium,
    fontSize: 17,
  },

  wapperOption: {
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginHorizontal: 8,
    justifyContent: "space-between",
  },
});

export default memo(Language);
