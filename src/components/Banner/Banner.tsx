import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { memo } from "react";
import { banners } from "../../../assets/img/foods";
import { montserratFonts } from "../../../constants/fontFamiles";
interface BannerProps {
  onPress: any;
}
const Banner = ({ onPress }: BannerProps) => {
  console.log("banner");
  const onBanner = (keyword: string) => {
    onPress(keyword);
  };
  return (
    <View style={{ marginBottom: 24 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {banners.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => onBanner(item.keyword)}
            key={index}
            style={{
              marginLeft: index === 0 ? 24 : 0,
              marginRight: 16,
            }}
          >
            <Image
              source={item.img}
              style={{ width: 220, height: 280, borderRadius: 12 }}
              resizeMode="cover"
            ></Image>
            <View style={{ position: "absolute", top: 20, left: 20 }}>
              {item.content.map((label, index) => (
                <Text
                  key={index}
                  style={{
                    fontSize: index === 1 ? 32 : 24,
                    fontFamily: montserratFonts.bold,
                    color: label.color,
                    marginLeft: index === 1 ? 24 : 0,
                  }}
                >
                  {label.content}
                </Text>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default memo(Banner);

const styles = StyleSheet.create({});
