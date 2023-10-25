import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Pressable,
  SafeAreaView,
  Animated,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect, useRef, useCallback, memo } from "react";
import styles from "./style";
import { Video as VideoPlayer, ResizeMode, AVPlaybackStatus } from "expo-av";
import FullScreen from "../../../assets/icons/FullScreen";
import PlayIcon from "../../../assets/icons/PlayIcon";
import PauseIcon from "../../../assets/icons/PauseIcon";
import ForWardIcon from "../../../assets/icons/ForWardIcon";
import BackWardIcon from "../../../assets/icons/BackWardIcon";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import { colors } from "../../../constants";
import ChapterTime from "../../components/ChapterTime";
import reviewDuyNen from "../../../assets/videos";
const fakeData = [
  {
    uri: "https://media.istockphoto.com/id/516449022/vi/anh/qu%C3%BD-b%C3%A0-v%E1%BB%9Bi-thuy%E1%BB%81n-kayak.jpg?s=2048x2048&w=is&k=20&c=Nd4zm-2C08g9MFeqDLd-K1ajzU0jEk0awf5A-4UjL1w=",
    time: 0,
  },
  {
    uri: "https://media.istockphoto.com/id/1096035138/vi/anh/c%E1%BA%B7p-v%E1%BB%A3-ch%E1%BB%93ng-tr%E1%BA%BB-xinh-%C4%91%E1%BA%B9p-th%C6%B0-gi%C3%A3n-sau-khi-%C4%91i-b%E1%BB%99-%C4%91%C6%B0%E1%BB%9Dng-d%C3%A0i-v%C3%A0-ngh%E1%BB%89-ng%C6%A1i.jpg?s=2048x2048&w=is&k=20&c=Afu8GGrImDYZ-MzvKgCgl2uaUohvoJLHcYokxBaIcGo=",
    time: 100,
  },
  {
    uri: "https://media.istockphoto.com/id/909195692/vi/anh/c%E1%BA%B7p-v%E1%BB%A3-ch%E1%BB%93ng-th%E1%BB%A3-l%E1%BA%B7n-d%C5%A9ng-c%E1%BA%A3m-tr%E1%BA%BB-nh%E1%BA%A3y-kh%E1%BB%8Fi-v%C3%A1ch-%C4%91%C3%A1-xu%E1%BB%91ng-bi%E1%BB%83n.jpg?s=2048x2048&w=is&k=20&c=s7zyX8j_A4PWfqAGAnRzrGbgUgbMxb52oTSG-Bcyyww=",
    time: 200,
  },
];
interface VideoProps {
  toggleFullscreen: any;
  isFullscreen: boolean;
}
const Video = ({ toggleFullscreen, isFullscreen }: VideoProps) => {
  const { width, height } = useWindowDimensions();
  const vidRef = useRef<VideoPlayer>(null);
  const [status, setStatus] = useState(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isTouchStart, setIsTouchStart] = useState(false);
  const [isTouchEnd, setIsTouchEnd] = useState(false);
  const [isChapters, setIsChapters] = useState(true);
  const timeOutRef: { current: NodeJS.Timeout | null } = useRef(null);
  const intervalRef: { current: NodeJS.Timeout | null } = useRef(null);

  const onLoad = () => {
    if (status) {
      setDuration(status.durationMillis);
    }
  };

  const onPlay = () => {
    if (isPlaying) {
      vidRef.current.pauseAsync();
    } else {
      vidRef.current.playAsync();
    }
    setIsPlaying((isPlaying) => !isPlaying);
  };

  const onBackWard = () => {
    if (status) {
      let newPosition = status.positionMillis - 10000;
      if (newPosition <= 0) {
        newPosition = 0;
      }
      vidRef.current.setPositionAsync(newPosition);
      setCurrentTime(newPosition);
    }
  };

  const onForWard = () => {
    if (status) {
      let newPosition = status.positionMillis + 10000;
      if (newPosition >= status.durationMillis) {
        newPosition = status.durationMillis;
      }
      vidRef.current.setPositionAsync(newPosition);
      setCurrentTime(newPosition);
    }
  };

  const onSeek = (currentTime) => {
    setCurrentTime(currentTime);
    if (vidRef && !isSeeking) {
      vidRef.current.setPositionAsync(currentTime);
    }
  };

  const seekingEvent = (isSeeking: boolean) => {
    setIsSeeking(isSeeking);
  };

  const onChapter = useCallback(
    (time: number) => {
      if (vidRef.current) {
        vidRef.current.setPositionAsync(time);
        setCurrentTime(time);
      }
    },
    [fakeData]
  );
  // Effect

  useEffect(() => {
    if (status) {
      if ((status.isBuffering && !status.isPlaying) !== isBuffering) {
        setIsBuffering((isBuffering) => !isBuffering);
      }
    }
  }, [status]);

  // useEffect(() => {
  //   // auto play
  //   (async () => {
  //     if (vidRef.current) {
  //       try {
  //         await vidRef.current.playAsync();
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    const updateCurrentTime = async () => {
      if (vidRef.current) {
        const status = await vidRef.current.getStatusAsync();
        if (status.isLoaded && !isSeeking) {
          setCurrentTime(status.positionMillis);
        }
      }
    };
    intervalRef.current = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(intervalRef.current as NodeJS.Timeout);
  }, []);

  useEffect(() => {
    if (isTouchEnd) {
      timeOutRef.current = setTimeout(() => {
        setIsTouchStart(false);
      }, 1000);
    }
    return () => clearTimeout(timeOutRef.current as NodeJS.Timeout);
  }, [isTouchEnd]);
  return (
    <>
      <View
        style={[
          styles.vidWarpper,
          {
            flex: isFullscreen ? 1 : 0,
            marginTop: isFullscreen ? 0 : 64,
          },
        ]}
        onTouchStart={() => {
          setIsTouchStart(true);
          setIsTouchEnd(false);
        }}
        onTouchEnd={() => setIsTouchEnd(true)}
      >
        <VideoPlayer
          ref={vidRef}
          usePoster={true}
          posterSource={{
            uri: "https://i.ytimg.com/vi/UsWhOcx0Zd4/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AHUBoAC4AOKAgwIABABGGUgRyhHMA8=&rs=AOn4CLAfyoph2lAgX61QUpDfYpI55ptIUQ",
          }}
          source={reviewDuyNen}
          resizeMode={ResizeMode.CONTAIN}
          style={{
            width: "100%",
            height: "100%",
          }}
          isLooping
          onLoad={onLoad}
          onPlaybackStatusUpdate={(status) => {
            setStatus(() => status);
          }}
        ></VideoPlayer>
        {isBuffering && !isTouchStart && (
          <ActivityIndicator
            size="large"
            color="#fff"
            style={{
              position: "absolute",
              width: "100%",
              top: "48%",
              left: 0,
              alignItems: "center",
            }}
          ></ActivityIndicator>
        )}
        {isTouchStart && (
          <Pressable
            style={styles.vidControl}
            onTouchStart={() => {
              setIsTouchStart(true);
              setIsTouchEnd(false);
            }}
            onTouchEnd={() => setIsTouchEnd(true)}
          >
            <TouchableOpacity activeOpacity={0.5} onPress={onBackWard}>
              <BackWardIcon></BackWardIcon>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.btnPlay,
                {
                  paddingLeft: isPlaying ? 2 : 4,
                  backgroundColor: isPlaying ? "transparent" : "#fff",
                },
              ]}
              onPress={onPlay}
            >
              {!isPlaying && <PlayIcon fill size={28}></PlayIcon>}
              {isPlaying && <PauseIcon fill size={28} color="#fff"></PauseIcon>}
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={onForWard}>
              <ForWardIcon></ForWardIcon>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.fullScreenIcon}
              onPress={toggleFullscreen}
            >
              <FullScreen size={28} color="white"></FullScreen>
            </TouchableOpacity>
            <View style={styles.progressBar}>
              <ProgressBar
                currentTime={currentTime}
                duration={duration}
                onSeek={onSeek}
                seekingEvent={seekingEvent}
                isSeeking={isSeeking}
              ></ProgressBar>
            </View>
          </Pressable>
        )}
      </View>
      {/* {!isFullscreen && (
        <View style={[styles.contentWrapper]}>
          <View style={styles.navBar}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setIsChapters(true)}
              style={styles.tabItem}
            >
              <View
                style={[
                  styles.textWrapper,
                  { borderColor: isChapters ? colors.primary : "transparent" },
                ]}
              >
                <Text
                  style={[
                    styles.text,
                    { color: !isChapters ? colors.gray : "black" },
                  ]}
                >
                  Chapters
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => setIsChapters(false)}
              style={styles.tabItem}
            >
              <View
                style={[
                  styles.textWrapper,
                  { borderColor: !isChapters ? colors.primary : "transparent" },
                ]}
              >
                <Text
                  style={[
                    styles.text,
                    { color: isChapters ? colors.gray : "black" },
                  ]}
                >
                  Comments
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.contentContainer}>
            {isChapters && (
              <ChapterTime onChapter={onChapter} data={fakeData}></ChapterTime>
            )}
          </View>
        </View>
      )} */}
    </>
  );
};

export default memo(Video);
