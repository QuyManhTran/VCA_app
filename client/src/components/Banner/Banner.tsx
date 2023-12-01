import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { memo, useRef } from "react";
import { banners } from "../../../assets/img/foods";
import { montserratFonts } from "../../../constants/fontFamiles";

interface BannerProps {
  onPress: any;
}
const Banner = ({ onPress }: BannerProps) => {
  const onBanner = (keyword: string, image: any) => {
    onPress(keyword, image);
  };
  return (
    <View style={{ marginBottom: 24 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {banners.map((item, index) => {
          const scaleAnimation = new Animated.Value(0);
          const scaleRef = scaleAnimation.interpolate({
            inputRange: [0, 0.9, 1],
            outputRange: [1, 0.97, 1],
          });
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                Animated.timing(scaleAnimation, {
                  toValue: 1,
                  duration: 100,
                  useNativeDriver: false,
                }).start();
                setTimeout(() => {
                  scaleAnimation.resetAnimation();
                  onBanner(item.keyword, item.img);
                }, 100);
              }}
              key={index}
              style={{
                marginLeft: index === 0 ? 12 : 0,
                marginRight: 16,
              }}
            >
              <Animated.View style={{ transform: [{ scale: scaleRef }] }}>
                <Image
                  source={item.img}
                  style={{ width: 220, height: 280, borderRadius: 6 }}
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
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default memo(Banner);

const styles = StyleSheet.create({});
