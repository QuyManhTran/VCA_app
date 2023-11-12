import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { history } from "../Meaning";
import { baloo2Fonts } from "../../../../../constants/fontFamiles";
import { colors } from "../../../../../constants";
import { Ionicons } from "@expo/vector-icons";

interface MeaningItemProps extends history {
  isDarkMode: boolean;
}

const MeaningItem = ({ img, title, content, isDarkMode }: MeaningItemProps) => {
  const [isSeeMore, setIsSeeMore] = useState(false);
  return (
    <View
      style={[
        styles.wrapperItem,
        {
          backgroundColor: isDarkMode ? colors.darkBg : "#fff",
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => setIsSeeMore((prev) => !prev)}
        activeOpacity={0.6}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Image
          source={{
            uri: "https://banhmipho.vn/wp-content/uploads/2021/08/banh-mi-Hoa-Ma.jpg",
          }}
          resizeMode="cover"
          style={{ width: 44, height: 44, borderRadius: 12 }}
        ></Image>
        <Text
          style={[
            styles.contentText,
            { flex: 1, color: isDarkMode ? colors.whiteText : "black" },
          ]}
        >
          {title}
        </Text>
        <Ionicons
          name={isSeeMore ? "chevron-down" : "chevron-forward"}
          size={24}
          color={colors.primary}
        ></Ionicons>
      </TouchableOpacity>
      {isSeeMore && (
        <Text
          style={[
            styles.text,
            { color: isDarkMode ? colors.whiteText : "black" },
          ]}
        >
          {content}
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontFamily: baloo2Fonts.medium,
    fontSize: 18,
    textAlign: "justify",
    lineHeight: 24,
  },
  wrapperItem: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000040",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    flexDirection: "column",
    gap: 12,
    marginHorizontal: 1,
  },
  contentText: {
    fontFamily: baloo2Fonts.semi,
    fontSize: 20,
    marginLeft: 24,
  },
});

export default MeaningItem;
