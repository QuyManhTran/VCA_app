import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import { useEffect, useRef, useState, memo } from "react";
import { Audio } from "expo-av";
import * as Animatable from "react-native-animatable";
import { baloo2Fonts } from "../../../../constants/fontFamiles";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { colors } from "../../../../constants";
import { FbSound } from "../../../../assets/audios";
import { likeReactService } from "../../../services/blogService";

interface HeaderBlogProps {
  userId: string;
  blogId: string;
  name: string;
  like: number;
  rate: number;
  image: any;
  isDarkMode: boolean;
  isLiked: boolean;
  isFavorite: boolean;
  isRated: boolean;
  width: number;
  openModal: any;
  openFavoriteModal: any;
  openComment: any;
  onLiking: any;
  headerBottom: Animated.AnimatedInterpolation<string | number>;
}
const interactAnimation = {
  0: { scale: 1 },
  0.3: { scale: 1.3 },
  0.8: { scale: 0.8 },
  1: { scale: 1 },
};
const Header = ({
  blogId,
  userId,
  name,
  like,
  rate,
  image,
  isDarkMode,
  isFavorite,
  width,
  openModal,
  openFavoriteModal,
  openComment,
  onLiking,
  isLiked,
  isRated,
  headerBottom,
}: HeaderBlogProps) => {
  const heartRef = useRef(null);
  const rateRef = useRef(null);
  const favoriteRef = useRef(null);
  const [likeSound, setLikeSound] = useState<Audio.Sound>();

  const likeReact = async () => {
    await likeReactService.likeReact(likeReactService.likeReactPath, {
      food_id: blogId,
      user_id: userId,
    });
  };

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
    if (rateRef.current) {
      if (isRated) {
        rateRef.current.animate(interactAnimation);
      }
    }
  }, [isRated]);

  useEffect(() => {
    if (favoriteRef.current) {
      if (isFavorite) {
        favoriteRef.current.animate(interactAnimation);
      }
    }
  }, [isFavorite]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode ? colors.darkTheme : "#fff",
          transform: [{ translateY: headerBottom }],
        },
      ]}
    >
      <View style={styles.wrapper}>
        <Image
          source={{ uri: image }}
          style={[
            styles.img,
            { width: width < 400 ? 110 : 120, height: width < 400 ? 110 : 120 },
          ]}
          resizeMode="cover"
        ></Image>
        <View style={styles.wrapperContent}>
          <Text
            style={[
              styles.heading,
              {
                fontSize: width < 400 ? 28 : 32,
                color: isDarkMode ? colors.whiteText : "black",
              },
            ]}
          >
            {name}
          </Text>
          <View style={styles.icons}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
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
                  onPress={async () => {
                    onLiking();
                    likeReact();
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
              }}
            >
              <Animatable.View ref={rateRef}>
                <AntDesign
                  name={isRated ? "star" : "staro"}
                  color={
                    isRated
                      ? "#face15"
                      : isDarkMode
                      ? colors.whiteText
                      : "black"
                  }
                  size={30}
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
                  onPress={() => {
                    openFavoriteModal();
                  }}
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
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={openComment}
            style={[
              styles.commentWrapper,
              {
                marginRight: width < 400 ? 24 : 32,
                backgroundColor: isDarkMode
                  ? colors.darkBg
                  : colors.lightPrimary,
              },
            ]}
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
              Bình luận
            </Text>
            {/* <Text
              style={[
                styles.amount,
                { color: isDarkMode ? colors.whiteText : "black" },
              ]}
            >
              {rate}k
            </Text> */}
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    paddingHorizontal: 12,
    elevation: 2,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    gap: 24,
  },
  img: {
    borderRadius: 12,
  },

  wrapperContent: {
    flex: 1,
  },
  heading: {
    fontSize: 32,
    fontFamily: baloo2Fonts.extra,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -6,
    justifyContent: "space-between",
  },
  amount: {
    fontSize: 20,
    fontFamily: baloo2Fonts.semi,
  },
  commentWrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingVertical: 4,
    marginTop: 4,
    justifyContent: "center",
    gap: 4,
  },
});
