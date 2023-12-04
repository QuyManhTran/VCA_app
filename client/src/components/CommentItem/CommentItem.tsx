import { StyleSheet, Text, View, Image } from "react-native";
import { memo, useEffect, useState } from "react";
import { colors } from "../../../constants";
import { baloo2Fonts } from "../../../constants/fontFamiles";
import { avatar } from "../../../assets/img/avatars";
import { TimeStamp } from "../../screens/Blog/Comment/Comment";
import { Audio } from "expo-av";
import { FbSound } from "../../../assets/audios";
import { commentLikeService } from "../../services/commentService";
import { UserInforProps } from "../../utilies/GlobalContext";

interface CommentItemProps {
  blogId: string;
  avatar: any;
  name: string;
  content: string;
  time: TimeStamp;
  like: number;
  isDarkMode: boolean;
  width: number;
  onLiked: any;
  isLiked: boolean | null;
  pos: number;
}
const CommentItem = ({ ...props }: CommentItemProps) => {
  const [likeSound, setLikeSound] = useState<Audio.Sound>();
  const [validImage, setValidImage] = useState<boolean>(true);
  // sound new comment
  async function playSound() {
    try {
      const { sound } = await Audio.Sound.createAsync(FbSound);
      setLikeSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log(error);
    }
  }

  const onToggleLike = async () => {
    if (!props.isLiked) {
      playSound();
    }
    const response = await commentLikeService.onToggleLike(
      commentLikeService.commentLikePath,
      {
        food_id: props.blogId,
        content: props.content,
        isLike: !props.isLiked,
      }
    );
  };

  const timeConvert = () => {
    const newestTime = new Date();
    if (newestTime.getFullYear() === props.time.year) {
      if (newestTime.getMonth() + 1 === props.time.month) {
        if (newestTime.getDate() === props.time.day) {
          if (newestTime.getHours() === props.time.hour) {
            if (newestTime.getMinutes() === props.time.minute) {
              return `Vừa xong`;
            } else {
              return `${newestTime.getMinutes() - props.time.minute} phút`;
            }
          } else {
            return `${newestTime.getHours() - props.time.hour} giờ`;
          }
        } else {
          return `${newestTime.getDate() - props.time.day} ngày`;
        }
      } else {
        return `${newestTime.getMonth() + 1 - props.time.month} tháng`;
      }
    } else {
      return `${newestTime.getFullYear() - props.time.year} năm`;
    }
  };
  // Effect
  useEffect(() => {
    return likeSound
      ? () => {
          likeSound.unloadAsync();
        }
      : undefined;
  }, [likeSound]);

  return (
    <View style={styles.container}>
      <Image
        source={validImage ? { uri: props?.avatar } : avatar}
        resizeMode="cover"
        style={styles.img}
        onError={() => setValidImage(false)}
      ></Image>
      <View
        style={[
          styles.contentWrapper,
          {
            backgroundColor: props.isDarkMode ? colors.darkBg : colors.grayBg,
            maxWidth: props.width - 50 - 12 * 3,
          },
        ]}
      >
        <Text
          style={[
            styles.name,
            { color: props.isDarkMode ? colors.whiteText : "black" },
          ]}
        >
          {props.name}
        </Text>
        <Text
          style={[
            styles.content,
            { color: props.isDarkMode ? colors.whiteText : "black" },
          ]}
        >
          {props.content}
        </Text>
        <View style={styles.timeWrapper}>
          <Text
            style={[
              styles.timeText,
              {
                marginLeft: 0,
                color: props.isDarkMode ? colors.whiteText : "black",
              },
            ]}
          >
            {timeConvert()}
          </Text>
          <Text
            onPress={() => {
              onToggleLike();
              props.onLiked(props.pos);
            }}
            style={[
              styles.timeText,
              {
                color: props.isLiked
                  ? colors.primary
                  : props.isDarkMode
                  ? colors.whiteText
                  : "black",
              },
            ]}
          >
            Thích
          </Text>
          <Text
            style={[
              styles.timeText,
              { color: props.isDarkMode ? colors.whiteText : "black" },
            ]}
          >
            Phản hồi
          </Text>
          <Text
            style={[
              [
                styles.timeText,
                {
                  marginRight: 8,
                  color: props.isDarkMode ? colors.whiteText : "black",
                },
              ],
            ]}
          >
            {props.isLiked ? props.like + 1 : props.like}🥰
          </Text>
        </View>
      </View>
    </View>
  );
};

export default memo(CommentItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 36,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  contentWrapper: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 24,
    minWidth: 160,
  },
  name: {
    fontFamily: baloo2Fonts.bold,
    fontSize: 20,
    marginBottom: -8,
  },
  content: {
    fontFamily: baloo2Fonts.regular,
    fontSize: 18,
    lineHeight: 20,
    paddingTop: 8,
  },
  timeWrapper: {
    position: "absolute",
    top: "100%",
    transform: [{ translateY: 12 }],
    minWidth: "100%",
    marginLeft: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  timeText: {
    fontSize: 16,
    fontFamily: baloo2Fonts.semi,
    lineHeight: 22,
  },
});
