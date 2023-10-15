import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { baloo2Fonts } from "../../../constants/fontFamiles";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { colors } from "../../../constants";

interface FoodReviewProps {
  name: string;
  like: number;
  rate: number;
  tag: string;
  img: any;
  isDarkMode: boolean;
  onTag?: any;
  onBlog: any;
}
const FoodReview = ({
  name,
  like,
  rate,
  tag,
  img,
  isDarkMode = false,
  onTag = () => {},
  onBlog = () => {},
}: FoodReviewProps) => {
  const onNavigateBlog = (name: string) => {
    onBlog(name);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => onNavigateBlog(name)}
      >
        <Image
          source={img}
          style={{ width: 150, height: 100, borderRadius: 12 }}
          resizeMode="cover"
        ></Image>
      </TouchableOpacity>
      <View style={{ marginLeft: 16 }}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => onNavigateBlog(name)}
        >
          <Text
            style={[
              styles.heading,
              { color: isDarkMode ? colors.whiteText : "black" },
            ]}
          >
            {name}
          </Text>
        </TouchableOpacity>
        {/* chip tag */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ flexDirection: "row" }}
          onPress={(e) => {
            e.stopPropagation();
            onTag(tag);
          }}
        >
          <View
            style={[
              styles.chipTag,
              { backgroundColor: isDarkMode ? colors.darkBg : "#fff" },
            ]}
          >
            <Ionicons
              name="pricetag"
              size={14}
              style={{ marginRight: 4 }}
              color={isDarkMode ? colors.whiteText : "black"}
            ></Ionicons>
            <Text
              style={{
                fontSize: 14,
                fontFamily: baloo2Fonts.semi,
                color: isDarkMode ? colors.whiteText : "black",
              }}
            >
              {tag}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.icons}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 16,
            }}
          >
            <Ionicons
              name="heart"
              color={"red"}
              size={20}
              style={{ paddingRight: 4 }}
            ></Ionicons>
            <Text
              style={[
                styles.amount,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
            >
              {like}k
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginRight: 24,
            }}
          >
            <Ionicons
              name="star"
              color={"#ffad27"}
              size={20}
              style={{ paddingRight: 4 }}
            ></Ionicons>
            <Text
              style={[
                styles.amount,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
            >
              {rate}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default React.memo(FoodReview);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 24,
    flexDirection: "row",
  },
  heading: {
    fontSize: 24,
    fontFamily: baloo2Fonts.extra,
    lineHeight: 34,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  amount: {
    fontSize: 18,
    fontFamily: baloo2Fonts.semi,
  },
  chipTag: {
    paddingHorizontal: 12,
    paddingVertical: 2,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#0000040",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 1.0,
  },
});
