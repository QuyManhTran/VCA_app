import { StyleSheet, Text, View, ScrollView } from "react-native";
import { RouterProps } from "../Splash/Splash";
import { useCallback, useContext, useEffect, useState } from "react";
import FoodReview, {
  FoodReviewRawProps,
} from "../../components/FoodReview/FoodReview";
import {
  searchTagService,
  trendingService,
} from "../../services/searchService";
import ThemeContext from "../../utilies/theme";
import { baloo2Fonts } from "../../../constants/fontFamiles";
import { LinearGradient } from "expo-linear-gradient";
import colors, { navbarDarkLinearColors } from "../../../constants/colors";
import BackButton from "../../components/BackButton";

const TrendingList = ({ navigation, route }: RouterProps) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [data, setData] = useState<FoodReviewRawProps[]>([]);
  const getTrendingData = async () => {
    const response = await trendingService.getTrendingFood(
      trendingService.getTrendingFoodPath + route.params?.keyword,
      {
        limit: 10,
      }
    );
    if (response.message === 200) {
      setData(response.data);
    }
  };

  const getAreaData = async () => {
    const response = await searchTagService.searchTag(
      searchTagService.searchTagPath,
      {
        tag: route.params?.title || route.params?.keyword,
      }
    );
    if (response.message === 200) {
      setData(response.data || []);
    }
  };

  const onBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const onBlog = useCallback(({ ...props }) => {
    navigation.navigate("Blog", { ...props });
  }, []);

  const onTag = useCallback((keyword: string) => {
    navigation.navigate("Search", { keyword: keyword, status: "tag" });
  }, []);

  useEffect(() => {
    if (route.params?.status) {
      getAreaData();
    } else {
      getTrendingData();
    }
  }, []);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? colors.darkTheme : "#fff" },
      ]}
    >
      <LinearGradient
        colors={isDarkMode ? navbarDarkLinearColors : ["#FF0701", "#FFD28D"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          flexDirection: "row",
          height: 120,
          alignItems: "center",
          gap: 24,
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
          style={[
            styles.heading,
            { color: isDarkMode ? "black" : colors.whiteText },
          ]}
        >
          {route.params?.title || "Khám phá"}
        </Text>
      </LinearGradient>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingTop: 12 }}
      >
        <View style={[styles.wrapper, { marginTop: 12, marginBottom: 24 }]}>
          {data.map((food, index) => (
            <FoodReview
              key={index}
              id={food.id}
              image={food.image}
              isDarkMode={isDarkMode}
              like={food.like}
              name={food.name}
              rate={food.rate}
              tags={food.tags}
              onBlog={onBlog}
              onTag={onTag}
            ></FoodReview>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default TrendingList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 30,
    fontFamily: baloo2Fonts.extra,
    color: "#fff",
  },
  wrapper: {
    paddingLeft: 12,
  },
  title: {
    fontSize: 20,
    fontFamily: baloo2Fonts.semi,
    marginBottom: 8,
  },
});
