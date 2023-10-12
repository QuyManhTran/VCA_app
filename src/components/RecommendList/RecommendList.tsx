import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useContext, memo } from "react";
import { baloo2Fonts } from "../../../constants/fontFamiles";
import BackButton from "../BackButton";
import { colors } from "../../../constants";
import exploreData, { banhmy } from "../../../assets/img/foods";
import { Entypo, Ionicons } from "@expo/vector-icons";
interface RecommendListProps {
  heading: string;
  explore?: boolean;
  onNavigateSearch: any;
  isDarkMode: boolean;
  isLibrary?: boolean;
}
const RecommendList = ({
  heading,
  explore = false,
  onNavigateSearch,
  isDarkMode = false,
  isLibrary = false,
}: RecommendListProps) => {
  let data = new Array(5);
  data.fill(6);
  if (explore) {
    data = exploreData;
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={{
          paddingBottom: isLibrary ? 8 : 0,
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => onNavigateSearch({ keyword: heading })}
      >
        <Text
          style={[
            styles.heading,
            {
              fontSize: isLibrary ? 28 : 26,
              paddingLeft: isLibrary ? 0 : 24,
              color: isDarkMode ? colors.whiteText : "black",
            },
          ]}
        >
          {heading}
        </Text>
        <Ionicons
          name="chevron-forward-outline"
          size={24}
          color={isDarkMode ? colors.whiteText : "black"}
        ></Ionicons>
      </TouchableOpacity>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((element, index) => {
          return (
            <TouchableOpacity
              onPress={() => alert(explore ? element.name : "Bánh mỳ")}
              activeOpacity={0.6}
              key={index}
              style={{
                paddingLeft: isLibrary ? 0 : 24,
                marginRight: index === data.length - 1 ? 0 : isLibrary ? 24 : 0,
                paddingRight: index === data.length - 1 ? 24 : 0,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={explore ? element.image : banhmy}
                resizeMode="contain"
                style={{ borderRadius: 12, width: 150, height: 90 }}
              ></Image>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: isLibrary ? baloo2Fonts.medium : baloo2Fonts.bold,
                  paddingTop: 4,
                  color: isDarkMode ? colors.whiteText : "black",
                }}
              >
                {explore ? element.name : " Bánh mỳ"}
              </Text>
            </TouchableOpacity>
          );
        })}
        {!explore && (
          <View
            style={{ marginTop: 12, alignItems: "center", paddingRight: 12 }}
          >
            <BackButton
              color={colors.primary}
              onPress={() => onNavigateSearch({ keyword: heading })}
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
