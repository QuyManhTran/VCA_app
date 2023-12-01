import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { RouterProps } from "../Splash/Splash";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import * as Animatable from "react-native-animatable";
import FoodReview, {
  FoodReviewRawProps,
} from "../../components/FoodReview/FoodReview";
import { searchTagService } from "../../services/searchService";
import ThemeContext from "../../utilies/theme";
import { baloo2Fonts, montserratFonts } from "../../../constants/fontFamiles";
import colors from "../../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
const headerAppear = {
  0: { scale: 0, opacity: 0 },
  1: { scale: 1, opacity: 1 },
};
const listDown = {
  0: { translateY: -400 },
  1: { translateY: 0 },
};
const PlayList = ({ navigation, route }: RouterProps) => {
  const { isDarkMode, userInfor } = useContext(ThemeContext);
  const [data, setData] = useState<FoodReviewRawProps[] | null>(null);
  const headerAnimation = useRef(null);
  const listAnimation = useRef(null);
  const getPlayListData = async () => {
    const response = await searchTagService.searchTag(
      searchTagService.searchTagPath,
      {
        tag: route.params?.keyword,
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
    getPlayListData();
  }, []);

  useEffect(() => {
    if (data !== null) {
      headerAnimation.current.animate(headerAppear);
      listAnimation.current.animate(listDown);
    }
  }, [data]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? colors.darkTheme : "#fff" },
      ]}
    >
      <View style={styles.backgroundImageWrapper}>
        <Image
          source={route.params?.image}
          style={{
            width: "100%",
            height: "100%",
            opacity: isDarkMode ? 0.3 : 0.2,
          }}
          resizeMode="cover"
          blurRadius={2}
        ></Image>
      </View>

      <TouchableOpacity
        onPress={onBack}
        activeOpacity={0.6}
        style={{
          position: "absolute",
          top: 12,
          left: 2,
          paddingVertical: 6,
          paddingHorizontal: 12,
          marginTop: 20,
          zIndex: 1,
        }}
      >
        <Ionicons
          name="arrow-back"
          color={isDarkMode ? colors.whiteText : "black"}
          size={32}
        ></Ionicons>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data !== null && (
          <Animatable.View
            duration={1000}
            style={styles.header}
            ref={headerAnimation}
          >
            <View style={styles.imageWrapper}>
              <Image
                source={route.params?.image}
                style={{
                  width: 280,
                  height: 280,
                }}
                resizeMode="cover"
              ></Image>
            </View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: montserratFonts.bold,
                marginBottom: 4,
                color: isDarkMode ? colors.whiteText : "black",
              }}
            >
              {route.params?.keyword || ""}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: montserratFonts.semi,
                color: isDarkMode ? "#fff" : "black",
                opacity: 0.6,
                marginBottom: 4,
              }}
            >
              {userInfor?.username ? userInfor.username : "Andrew"}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: montserratFonts.medium,
                color: isDarkMode ? colors.whiteText : colors.gray,
                opacity: isDarkMode ? 0.6 : 1,
              }}
            >
              {data?.length || 0} bài viết
            </Text>
          </Animatable.View>
        )}
        {data !== null && (
          <Animatable.View
            style={[styles.wrapper, { marginTop: 12, marginBottom: 24 }]}
            ref={listAnimation}
            duration={1000}
          >
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
          </Animatable.View>
        )}
      </ScrollView>
    </View>
  );
};

export default PlayList;

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
  header: {
    marginTop: 90,
    marginBottom: 36,
    alignItems: "center",
  },
  imageWrapper: {
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 24,
    overflow: "hidden",
  },
  backgroundImageWrapper: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
});
