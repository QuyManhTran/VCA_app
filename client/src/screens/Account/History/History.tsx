import { StyleSheet, Text, View } from "react-native";
import { useState, useCallback, useContext, useEffect } from "react";
import { RouterProps } from "../../Splash/Splash";
import ThemeContext from "../../../utilies/theme";
import BackButton from "../../../components/BackButton";
import { colors } from "../../../../constants";
import { LinearGradient } from "expo-linear-gradient";
import { navbarDarkLinearColors } from "../../../../constants/colors";
import { baloo2Fonts } from "../../../../constants/fontFamiles";
import FoodReview, {
  FoodReviewRawProps,
} from "../../../components/FoodReview/FoodReview";
import { getHistoriesService } from "../../../services/profileService";
import { ScrollView } from "react-native";

interface HistoryFood extends FoodReviewRawProps {
  watchedAt: string;
}
const History = ({ navigation, route }: RouterProps) => {
  const { isDarkMode, userId } = useContext(ThemeContext);
  const [histories, setHistories] = useState<HistoryFood[]>([]);
  const [parcition, setParcition] = useState<number | null>(null);
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

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
    const recentActivity = async () => {
      const response = await getHistoriesService.getHistories(
        getHistoriesService.getHistoriesPath,
        {
          id_user: userId,
        }
      );
      if (response.message === 200) {
        setHistories(response.data?.dataWatchedFoods || []);
      }
    };
    recentActivity();
  }, []);

  useEffect(() => {
    if (histories.length !== 0) {
      histories.some((food, index) => {
        const dateData = Date.parse(food.watchedAt);
        const currentTime = Date.parse(currentDate);
        if (dateData < currentTime) {
          setParcition(index);
        }
        return dateData < currentTime;
      });
    }
  }, [histories]);
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
          Hoạt động gần đây
        </Text>
      </LinearGradient>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingTop: 12 }}
      >
        <View style={styles.wrapper}>
          {parcition > 0 && (
            <Text
              style={[
                styles.title,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
            >
              Hôm nay
            </Text>
          )}
          {parcition > 0 &&
            histories
              .filter((food, index) => index < parcition)
              .map((food, index) => (
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
        <View style={[styles.wrapper, { marginBottom: 24 }]}>
          {parcition !== null && (
            <Text
              style={[
                styles.title,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
            >
              Trước đó
            </Text>
          )}
          {parcition !== null &&
            histories
              .filter((food, index) => index >= parcition)
              .map((food, index) => (
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

export default History;

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
