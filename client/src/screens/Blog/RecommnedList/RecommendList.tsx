import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import { useState, useEffect } from "react";
import { recommendService } from "../../../services/blogService";
import { FoodReviewRawProps } from "../../../components/FoodReview/FoodReview";
import { baloo2Fonts } from "../../../../constants/fontFamiles";
import { colors } from "../../../../constants";
interface RecommnedListProps {
  isDarkMode: boolean;
}
const RecommendList = ({ isDarkMode }: RecommnedListProps) => {
  const [data, setData] = useState<FoodReviewRawProps[]>([]);
  const recommendSearch = async () => {
    const response = await recommendService.getRecommend(
      recommendService.getReccomendPath,
      {
        limit: 5,
      }
    );
    if (response.message === 200) {
      setData(response.data);
    }
  };
  useEffect(() => {
    recommendSearch();
  }, []);
  return (
    <FlatList
      horizontal
      style={{ flexDirection: "row" }}
      keyExtractor={(item) => item.id}
      data={data}
      renderItem={({ item, index }) => {
        return (
          <View style={styles.itemWrapper}>
            <Image source={{ uri: item.image }} style={styles.itemImg}></Image>
            <Text
              style={[
                styles.itemText,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
            >
              {item.name}
            </Text>
          </View>
        );
      }}
    ></FlatList>
  );
};

export default RecommendList;

const styles = StyleSheet.create({
  itemWrapper: {
    marginHorizontal: 8,
    padding: 16,
    alignItems: "center",
    gap: 8,
  },
  itemImg: {
    width: 150,
    height: 90,
    borderRadius: 12,
  },
  itemText: {
    fontSize: 16,
    fontFamily: baloo2Fonts.semi,
  },
});
