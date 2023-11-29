import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect, memo } from "react";
import { baloo2Fonts } from "../../../constants/fontFamiles";
import BackButton from "../BackButton";
import { colors } from "../../../constants";
import { Ionicons } from "@expo/vector-icons";
import { trendingService } from "../../services/searchService";
import { mostlySearch } from "../../../constants/fakeData";

interface RecommendListProps {
  heading: string;
  explore?: boolean;
  isDarkMode: boolean;
  isLibrary?: boolean;
  onNavigateTrending?: any;
  onBlog: any;
  trending?: string;
  isAccount?: boolean;
  isFocused?: boolean;
  onNavigateHistory?: any;
  recentActivity?: () => Promise<
    { message: number; data: any } | { message: any; data?: undefined }
  >;
  data: {
    name: string;
    img: any;
    like?: number;
    rate?: number;
    isLiked?: boolean;
    isRate?: boolean;
    isFavorite?: boolean;
  }[];
}
const RecommendList = ({
  trending,
  heading,
  explore = false,
  onNavigateTrending,
  isDarkMode = false,
  isLibrary = false,
  isAccount = false,
  isFocused = false,
  recentActivity,
  onNavigateHistory = () => {},
  onBlog = () => {},
  data: fallBackData = mostlySearch,
}: RecommendListProps) => {
  const [data, setData] = useState<any[]>([]);
  const getTrendingFood = async () => {
    const response = await trendingService.getTrendingFood(
      trendingService.getTrendingFoodPath + trending,
      {
        limit: 5,
      }
    );
    if (response.message === 200) {
      setData(response.data);
    } else {
      setData(fallBackData);
    }
  };
  const getRecentActivity = async () => {
    const response = await recentActivity();
    if (response.message === 200) {
      setData(response.data?.dataWatchedFoods || fallBackData);
    } else {
      setData(fallBackData);
    }
  };
  useEffect(() => {
    if (!trending) {
      setData(fallBackData);
    } else {
      if (isAccount) {
        getRecentActivity();
      } else {
        getTrendingFood();
      }
    }
  }, [isFocused]);
  const onNavigateBlog = (data: any) => {
    onBlog(data);
  };
  return (
    <View style={styles.container}>
      {!isAccount && (
        <TouchableOpacity
          disabled={explore ? true : false}
          activeOpacity={0.6}
          style={{
            paddingBottom: isLibrary ? 8 : 0,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() =>
            onNavigateTrending({
              keyword: trending,
              title: heading,
            })
          }
        >
          <Text
            style={[
              styles.heading,
              {
                fontSize: isLibrary ? 28 : 26,
                paddingLeft: isLibrary ? 0 : 12,
                color: isDarkMode ? colors.whiteText : "black",
              },
            ]}
          >
            {heading}
          </Text>
          {!explore && (
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color={isDarkMode ? colors.whiteText : "black"}
            ></Ionicons>
          )}
        </TouchableOpacity>
      )}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data
          .filter((blog, index) => index < 5)
          .map((blog, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  if (explore) {
                    onNavigateTrending({
                      keyword: blog.name,
                      title: blog.name,
                      status: "tag",
                    });
                  } else {
                    onNavigateBlog({
                      id: blog.id,
                      name: blog.name,
                      image: blog.image,
                      like: blog.like,
                      rate: blog.rate,
                    });
                  }
                }}
                activeOpacity={0.6}
                key={index}
                style={{
                  paddingLeft: isLibrary ? 0 : index === 0 ? 12 : 24,
                  marginRight:
                    index === data.length - 1 ? 0 : isLibrary ? 24 : 0,
                  paddingRight:
                    index === data.length - 1 && data.length < 5 ? 24 : 0,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={trending ? { uri: blog.image } : blog.img}
                  resizeMode="cover"
                  style={{ borderRadius: 12, width: 150, height: 90 }}
                ></Image>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: isLibrary
                      ? baloo2Fonts.medium
                      : baloo2Fonts.bold,
                    paddingTop: 4,
                    color: isDarkMode ? colors.whiteText : "black",
                  }}
                >
                  {blog.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        {!explore && data.length >= 5 && (
          <View
            style={{
              marginTop: 12,
              alignItems: "center",
              paddingRight: 12,
              paddingLeft: 24,
            }}
          >
            <BackButton
              color={colors.primary}
              onPress={() => {
                if (isAccount) {
                  onNavigateHistory();
                } else {
                  onNavigateTrending({
                    keyword: trending,
                    title: heading,
                  });
                }
              }}
              rotate="180deg"
              customeStyle={{
                borderRadius: 25,
                width: 50,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: isDarkMode ? "rgba(0, 0, 0, 0.5)" : "#fff",
              }}
            ></BackButton>

            <Text
              style={{
                fontSize: 16,
                fontFamily: baloo2Fonts.regular,
                color: colors.primary,
              }}
            >
              Xem tất cả
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default memo(RecommendList);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
  },
  heading: {
    paddingLeft: 24,
    fontSize: 26,
    fontFamily: baloo2Fonts.extra,
  },
});
