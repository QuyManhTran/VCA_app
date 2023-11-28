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

const listLanguage = {
  vietnam: "vietname",
  english: "english",
};

const Language = ({ navigation, ...props }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [language, Setlanguage] = useState(listLanguage.vietnam);

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
      <ScrollView>
        <LinearBackGround
          height={100}
          back={true}
          avatar={false}
          onPress={onBack}
          isDarkMode={isDarkMode}
        ></LinearBackGround>
        <Text
          style={{
            marginTop: 4,
            fontFamily: baloo2Fonts.bold,
            fontSize: 28,
            paddingLeft: 20,
            paddingBottom: 12,
            color: isDarkMode ? colors.whiteText : "black",
          }}
        >
          Ngôn ngữ
        </Text>

        <TouchableOpacity
          style={[
            styles.wapperOption,
            { borderTopColor: "#D9D9D9", borderTopWidth: 2 },
          ]}
          onPress={() => Setlanguage(listLanguage.vietnam)}
        >
          <Text
            style={[
              styles.optionText,
              { color: isDarkMode ? colors.whiteText : "black" },
            ]}
          >
            Tiếng việt
          </Text>
          {language === listLanguage.vietnam && (
            <Foundation
              name="checkbox"
              size={24}
              color={isDarkMode ? colors.whiteText : "black"}
            />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.wapperOption}
          onPress={() => Setlanguage(listLanguage.english)}
        >
          <Text
            style={[
              styles.optionText,
              { color: isDarkMode ? colors.whiteText : "black" },
            ]}
          >
            Tiếng Anh
          </Text>
          {language === listLanguage.english && (
            <Foundation
              name="checkbox"
              size={24}
              color={isDarkMode ? colors.whiteText : "black"}
            />
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  optionText: {
    fontFamily: baloo2Fonts.medium,
    fontSize: 17,
  },

  wapperOption: {
    marginHorizontal: 20,
    flexDirection: "row",
    paddingVertical: 15,

    justifyContent: "space-between",
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 2,
  },
});

export default memo(Language);
