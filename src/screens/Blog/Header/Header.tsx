import { StyleSheet, Text, View, Image } from "react-native";
import { useEffect, useRef, useState, memo } from "react";
import { Audio } from "expo-av";
import * as Animatable from "react-native-animatable";
import { baloo2Fonts } from "../../../../constants/fontFamiles";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../constants";
import { FbSound } from "../../../../assets/audios";
import Modal from "../../../components/Modal";
interface HeaderBlogProps {
  name: string;
  like: number;
  rate: number;
  img: any;
  isDarkMode: boolean;
  isLiked: boolean;
  isFavorite: boolean;
  isRate: boolean;
  width: number;
  openModal: any;
}
const interactAnimation = {
  0: { scale: 1 },
  0.3: { scale: 1.3 },
  0.8: { scale: 0.8 },
  1: { scale: 1 },
};
const Header = ({
  name,
  like,
  rate,
  img,
  isDarkMode,
  width,
  openModal,
  ...props
}: HeaderBlogProps) => {
  const heartRef = useRef(null);
  const rateRef = useRef(null);
  const favoriteRef = useRef(null);
  const [likeSound, setLikeSound] = useState<Audio.Sound>();
  const [isLiked, setIsLiked] = useState(props.isLiked);
  const [isFavorite, setIsFavorite] = useState(props.isFavorite);
  const [isRate, setIsRate] = useState<boolean>(null);

  async function playSound() {
    try {
      const { sound } = await Audio.Sound.createAsync(FbSound);
      setLikeSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    return likeSound
      ? () => {
          likeSound.unloadAsync();
        }
      : undefined;
  }, [likeSound]);

  useEffect(() => {
    if (heartRef.current) {
      if (isLiked) {
        heartRef.current.animate(interactAnimation);
      }
    }
  }, [isLiked]);

  useEffect(() => {
    setIsRate(props.isRate);
  }, [props.isRate]);

  useEffect(() => {
    if (rateRef.current) {
      if (isRate) {
        rateRef.current.animate(interactAnimation);
      }
    }
  }, [isRate]);

  useEffect(() => {
    if (favoriteRef.current) {
      if (isFavorite) {
        favoriteRef.current.animate(interactAnimation);
      }
    }
  }, [isFavorite]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? colors.darkTheme : "#fff" },
      ]}
    >
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
                marginRight: width < 400 ? 24 : 32,
              }}
            >
              <Animatable.View ref={heartRef}>
                <Ionicons
                  name={isLiked ? "heart" : "heart-outline"}
                  color={
                    isLiked
                      ? "#fe2c55"
                      : isDarkMode
                      ? colors.whiteText
                      : "black"
                  }
                  size={36}
                  style={{ paddingRight: 4 }}
                  onPress={() => {
                    setIsLiked(!isLiked);
                    if (!isLiked) {
                      playSound();
                    }
                  }}
                ></Ionicons>
              </Animatable.View>
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
                marginRight: width < 400 ? 24 : 32,
              }}
            >
              <Animatable.View ref={rateRef}>
                <AntDesign
                  name={isRate ? "star" : "staro"}
                  color={
                    isRate ? "#face15" : isDarkMode ? colors.whiteText : "black"
                  }
                  size={32}
                  style={{ paddingRight: 4 }}
                  onPress={openModal}
                ></AntDesign>
              </Animatable.View>
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
                marginRight: width < 400 ? 24 : 32,
              }}
            >
              <Ionicons
                name="chatbubble-ellipses-outline"
                color={isDarkMode ? colors.whiteText : "black"}
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
              }}
            >
              <Animatable.View ref={favoriteRef}>
                <Ionicons
                  name={isFavorite ? "bookmark" : "bookmark-outline"}
                  color={
                    isFavorite
                      ? "#face15"
                      : isDarkMode
                      ? colors.whiteText
                      : "black"
                  }
                  size={32}
                  style={{ paddingRight: 4 }}
                  onPress={() => setIsFavorite(!isFavorite)}
                ></Ionicons>
              </Animatable.View>
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

export default memo(Header);

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
