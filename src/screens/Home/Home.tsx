import {
  View,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react";
import ThemeContext, { darkTheme } from "../../utilies/theme";
import { Animated } from "react-native";
import { RouterProps } from "../Splash/Splash";
import { Video, ResizeMode } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import NavButton from "../../components/NavButton";

const Home = ({ route, navigation }: RouterProps) => {
  const { width, height } = useWindowDimensions();
  const vidRef = useRef<Video>(null);
  const [status, setStatus] = useState({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { isDarkMode, setHomeNavbar } = useContext(ThemeContext);
  const [prevOffSetY, setPrevOffSetY] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClampScrollY = Animated.diffClamp(scrollY, 0, 70);
  const headerBottom = diffClampScrollY.interpolate({
    inputRange: [0, 35],
    outputRange: [0, -70],
  });
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
    }
  }, []);

  const toggleFullscreen = async () => {
    if (isFullscreen) {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
      setIsFullscreen(false);
    } else {
      // Enter fullscreen mode
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
      setIsFullscreen(true);
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    (async () => {
      if (vidRef.current) {
        await vidRef.current.playAsync();
      }
    })();
  }, []);

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      if (value > prevOffSetY) {
        setHomeNavbar(true);
      } else {
        setHomeNavbar(false);
      }
    });
    return () => scrollY.removeAllListeners();
  });

  return (
    <View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        onScrollEndDrag={(e) => setPrevOffSetY(e.nativeEvent.contentOffset.y)}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ],
          {
            useNativeDriver: false,
          }
        )}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            backgroundColor: isDarkMode ? darkTheme.backGroundColor : undefined,
            height: 1000,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              // backgroundColor: "#000",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: isFullscreen ? height : 300,
            }}
          >
            <Video
              ref={vidRef}
              source={{
                uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
              }}
              resizeMode={ResizeMode.CONTAIN}
              useNativeControls
              style={{
                flex: 1,
                width: "100%",
                height: "100%",
                // transform: [{ rotate: "90deg" }],
              }}
              isLooping
              onPlaybackStatusUpdate={(status) => setStatus(() => status)}
            ></Video>
          </View>
          <View
            style={{
              width: "100%",
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            {/* <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => vidRef.current.playFromPositionAsync(5000)}
            >
              <NavButton>start at 5s</NavButton>
            </TouchableOpacity> */}
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => vidRef.current.playAsync()}
            >
              <NavButton>Play</NavButton>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={toggleFullscreen}>
              <NavButton>Full Screen</NavButton>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default Home;
