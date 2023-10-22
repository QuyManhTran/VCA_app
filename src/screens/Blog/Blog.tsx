import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useCallback, useState, useContext } from "react";
import { RouterProps } from "../Splash/Splash";
import Video from "../Video";
import styles from "./style";
import { Ionicons } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";
import Header from "./Header";
import ThemeContext from "../../utilies/theme";

const Blog = ({ route, navigation }: RouterProps) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { name, img, like, rate, tag, isLiked } = route.params;
  const onBack = () => {
    navigation.goBack();
  };
  const toggleFullscreen = useCallback(async () => {
    if (isFullscreen) {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );
      setIsFullscreen(false);
    } else {
      // Enter fullscreen mode
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
      setIsFullscreen(true);
    }
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.backBtn}
        onPress={onBack}
      >
        <Ionicons name="arrow-back" size={30}></Ionicons>
      </TouchableOpacity>
      <Video
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
      ></Video>
      <View
        style={{
          display: isFullscreen ? "none" : "flex",
        }}
      >
        <Header
          name={name}
          like={like}
          rate={rate}
          img={img}
          isDarkMode={isDarkMode}
          isLiked={isLiked}
        ></Header>
      </View>
    </View>
  );
};

export default Blog;
