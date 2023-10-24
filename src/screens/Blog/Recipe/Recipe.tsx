import { StyleSheet, Text, Image, View } from "react-native";
import { useState } from "react";
import { baloo2Fonts } from "../../../../constants/fontFamiles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../../constants";
import { BanhMyRaw, banhmy } from "../../../../assets/img/foods";
import { banhmyRecipe } from "../../../../constants/recipes";
interface RecipeProps {
  isDarkMode: boolean;
}
const Recipe = ({ isDarkMode }: RecipeProps) => {
  const [isSeeMore, setIsSeeMore] = useState(false);
  return (
    <View>
      <Text style={styles.heading}>Các chất dinh dưỡng</Text>
      <View style={{ flexDirection: "row", marginBottom: 24 }}>
        <View style={[styles.wrapper, { width: "50%" }]}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <View
              style={[styles.wrapperIcon, { backgroundColor: "#ff5c001a" }]}
            >
              <Ionicons name="leaf-outline" size={28}></Ionicons>
            </View>
            <Text style={styles.textItem}>65g tinh bột</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={[styles.wrapperIcon, { backgroundColor: "#ff5c001a" }]}
            >
              <Ionicons name="flame-outline" size={28}></Ionicons>
            </View>
            <Text style={styles.textItem}>120 calo</Text>
          </View>
        </View>
        <View style={styles.wrapper}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <View
              style={[styles.wrapperIcon, { backgroundColor: "#ff5c001a" }]}
            >
              <MaterialCommunityIcons
                name="egg-fried"
                size={28}
                color="black"
              />
            </View>
            <Text style={styles.textItem}>27g protein</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={[styles.wrapperIcon, { backgroundColor: "#ff5c001a" }]}
            >
              <Ionicons name="pizza-outline" size={28}></Ionicons>
            </View>
            <Text style={styles.textItem}>91g chất béo</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <Text style={styles.heading}>Nguyên liệu</Text>
        <Text
          style={{
            fontSize: 20,
            fontFamily: baloo2Fonts.medium,
            color: colors.primary,
            minWidth: 64,
          }}
        >
          6 loại
        </Text>
      </View>
      <View style={{ marginTop: -10 }}>
        {banhmyRecipe.map((item, index) => (
          <View style={styles.recipeWrapper} key={index}>
            <View
              style={{
                backgroundColor: "#ff5c001a",
                padding: 8,
                borderRadius: 12,
              }}
            >
              <Image
                source={item.img}
                resizeMode="cover"
                style={{ width: 36, height: 36 }}
              ></Image>
            </View>
            <Text style={[styles.contentText, { flex: 1 }]}>{item.name}</Text>
            <Text
              style={[
                styles.contentText,
                {
                  fontFamily: baloo2Fonts.medium,
                  color: colors.primary,
                  minWidth: 50,
                },
              ]}
            >
              {item.amount}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Recipe;

const styles = StyleSheet.create({
  text: {
    fontFamily: baloo2Fonts.medium,
    fontSize: 20,
    textAlign: "justify",
    lineHeight: 30,
  },
  wrapper: {
    marginTop: 12,
  },
  wrapperIcon: {
    padding: 8,
    borderRadius: 12,
    marginRight: 8,
  },
  textItem: {
    fontFamily: baloo2Fonts.medium,
    fontSize: 18,
  },
  heading: {
    fontSize: 24,
    fontFamily: baloo2Fonts.bold,
  },
  recipeWrapper: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 1,
  },
  contentText: {
    fontFamily: baloo2Fonts.semi,
    fontSize: 20,
    marginLeft: 24,
  },
});
