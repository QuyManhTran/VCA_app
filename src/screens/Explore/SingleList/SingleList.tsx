import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useCallback, useState } from "react";
import { RouterProps } from "../../Splash/Splash";
import LinearBackGround from "../../../components/LinearBackGround";
import {
  baloo2Fonts,
  montserratFonts,
} from "../../../../constants/fontFamiles";
import { colors } from "../../../../constants";
import FoodReview from "../../../components/FoodReview";
import { Feather, Ionicons } from "@expo/vector-icons";

const SingleList = ({ route, navigation }: RouterProps) => {
  const [isModal, setIsModal] = useState(false);
  const { name, data, img } = route.params;
  const onBack = () => {
    navigation.goBack();
  };
  const onTag = useCallback((keyword: string) => {
    navigation.navigate("Search", {
      keyword: keyword,
    });
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <LinearBackGround
        height={100}
        back={true}
        avatar={false}
        onPress={onBack}
      ></LinearBackGround>
      <TouchableOpacity style={{ position: "absolute", top: 40, right: 20 }}>
        <Ionicons name="ellipsis-vertical" size={24}></Ionicons>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            {/* <Image
              source={img}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              resizeMode="cover"
              blurRadius={80}
            ></Image> */}
            <View style={styles.imageWrapper}>
              <Image
                source={img}
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
              }}
            >
              {name}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: montserratFonts.semi,
                opacity: 0.6,
                marginBottom: 4,
              }}
            >
              Andrew
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: montserratFonts.medium,
                color: colors.gray,
              }}
            >
              {data.length} bài viết
            </Text>
          </View>
          <View style={styles.foodWrapper}>
            {data.map((food, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <FoodReview {...food} onTag={onTag}></FoodReview>
                  <Ionicons
                    name="ellipsis-vertical"
                    size={20}
                    style={{ marginTop: 4 }}
                  ></Ionicons>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View style={styles.modal}>
        <View style={styles.innerModal}>
          <View style={{ paddingTop: 12, paddingHorizontal: 12 }}>
            <View
              style={{
                flexDirection: "row",
                paddingBottom: 12,
                alignItems: "center",
                borderBottomWidth: 2,
                borderBottomColor: "#D9D9D9",
              }}
            >
              <Feather name="trash-2" size={36} color="black" />
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: baloo2Fonts.bold,
                  marginLeft: 24,
                }}
              >
                Xóa danh sách
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SingleList;

const styles = StyleSheet.create({
  header: {
    marginTop: 24,
    marginBottom: 48,
    alignItems: "center",
  },
  imageWrapper: {
    elevation: 6,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 24,
    overflow: "hidden",
  },
  foodWrapper: {
    paddingLeft: 24,
    paddingRight: 12,
  },
  modal: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  innerModal: {
    width: "100%",
    height: 200,
    backgroundColor: "#fff",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
});
