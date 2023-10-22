import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { banhmy } from "../../../../assets/img/foods";
import { baloo2Fonts } from "../../../../constants/fontFamiles";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../constants";
interface HeaderBlogProps {
  name: string;
  like: number;
  rate: number;
  img: any;
  isDarkMode: boolean;
  isLiked: boolean;
}
const Header = ({
  name,
  like,
  rate,
  img,
  isDarkMode,
  isLiked = false,
}: HeaderBlogProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {/* <Image source={img} style={styles.img}></Image> */}
        <View style={styles.wrapperContent}>
          <Text
            style={[
              styles.heading,
              { color: isDarkMode ? colors.whiteText : "black" },
            ]}
          >
            {name}
          </Text>
          <View style={styles.icons}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 16,
              }}
            >
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                color={isLiked ? "red" : "black"}
                size={36}
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
              <AntDesign
                name={isLiked ? "star" : "staro"}
                // color={"#ffad27"}
                color={isLiked ? "#ffad27" : "black"}
                size={32}
                style={{ paddingRight: 4 }}
              ></AntDesign>
              <Text
                style={[
                  styles.amount,
                  { color: isDarkMode ? colors.whiteText : "black" },
                ]}
              >
                {rate}
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
                name="chatbubble-ellipses-outline"
                color={"black"}
                size={32}
                style={{ paddingRight: 4 }}
              ></Ionicons>
              <Text
                style={[
                  styles.amount,
                  { color: isDarkMode ? colors.whiteText : "black" },
                ]}
              >
                {rate}k
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
                name="bookmark-outline"
                color={"black"}
                size={32}
                style={{ paddingRight: 4 }}
              ></Ionicons>
              <Text
                style={[
                  styles.amount,
                  { color: isDarkMode ? colors.whiteText : "black" },
                ]}
              >
                2.5k
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    // marginTop: ,
    marginHorizontal: 12,
  },
  wrapper: {
    flexDirection: "row",
  },
  img: {
    width: 150,
    height: 100,
    borderRadius: 12,
  },
  wrapperContent: {
    // marginLeft: 16,
  },
  heading: {
    fontSize: 32,
    fontFamily: baloo2Fonts.extra,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -6,
  },
  amount: {
    fontSize: 20,
    fontFamily: baloo2Fonts.semi,
  },
});
