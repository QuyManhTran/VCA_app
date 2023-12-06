import { Text, Image, View } from "react-native";
import { baloo2Fonts } from "../../../../constants/fontFamiles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../../../../constants";
import { banhmyRecipe } from "../../../../constants/recipes";
import styles from "./style";
export interface ingredients {
  name: string;
  image: string;
  quantity: string;
}
interface RecipeProps {
  isDarkMode: boolean;
  ingredientList: ingredients[];
}
const Recipe = ({ isDarkMode, ingredientList }: RecipeProps) => {
  return (
    <View
      style={{
        backgroundColor: isDarkMode ? colors.darkTheme : "#fff",
        marginBottom: 40,
        marginTop: 12,
      }}
    >
      <Text
        style={[
          styles.heading,
          { color: isDarkMode ? colors.whiteText : "black" },
        ]}
      >
        Các chất dinh dưỡng
      </Text>
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
              style={[
                styles.wrapperIcon,
                { backgroundColor: isDarkMode ? colors.primary : "#ff5c001a" },
              ]}
            >
              <Ionicons
                name={isDarkMode ? "leaf" : "leaf-outline"}
                size={28}
                color={isDarkMode ? colors.whiteText : "black"}
              ></Ionicons>
            </View>
            <Text
              style={[
                styles.textItem,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
            >
              65g tinh bột
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={[
                styles.wrapperIcon,
                { backgroundColor: isDarkMode ? colors.primary : "#ff5c001a" },
              ]}
            >
              <Ionicons
                name={isDarkMode ? "flame" : "flame-outline"}
                size={28}
                color={isDarkMode ? colors.whiteText : "black"}
              ></Ionicons>
            </View>
            <Text
              style={[
                styles.textItem,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
            >
              120 calo
            </Text>
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
              style={[
                styles.wrapperIcon,
                { backgroundColor: isDarkMode ? colors.primary : "#ff5c001a" },
              ]}
            >
              <MaterialCommunityIcons
                name="egg-fried"
                size={28}
                color={isDarkMode ? colors.whiteText : "black"}
              />
            </View>
            <Text
              style={[
                styles.textItem,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
            >
              27g protein
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={[
                styles.wrapperIcon,
                { backgroundColor: isDarkMode ? colors.primary : "#ff5c001a" },
              ]}
            >
              <Ionicons
                name={isDarkMode ? "pizza" : "pizza-outline"}
                size={28}
                color={isDarkMode ? colors.whiteText : "black"}
              ></Ionicons>
            </View>
            <Text
              style={[
                styles.textItem,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
            >
              91g chất béo
            </Text>
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
        <Text
          style={[
            styles.heading,
            { color: isDarkMode ? colors.whiteText : "black" },
          ]}
        >
          Nguyên liệu
        </Text>
        <Text
          style={{
            fontSize: 20,
            fontFamily: baloo2Fonts.medium,
            color: colors.primary,
            minWidth: 64,
          }}
        >
          {ingredientList.length} loại
        </Text>
      </View>
      <View style={{ marginTop: -10 }}>
        {ingredientList.map((item, index) => (
          <View
            style={[
              styles.recipeWrapper,
              {
                backgroundColor: isDarkMode ? colors.darkBg : "#fff",
              },
            ]}
            key={index}
          >
            <View
              style={{
                backgroundColor: isDarkMode ? "transparent" : "#ff5c001a",
                padding: 8,
                borderRadius: 12,
              }}
            >
              <Image
                source={{ uri: item.image }}
                resizeMode="cover"
                style={{ width: 36, height: 36 }}
              ></Image>
            </View>
            <Text
              style={[
                styles.contentText,
                { flex: 1, color: isDarkMode ? colors.whiteText : "black" },
              ]}
            >
              {item.name}
            </Text>
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
              {item.quantity}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Recipe;
