import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Pressable,
  ActivityIndicator,
  GestureResponderEvent,
} from "react-native";
import { useState, useEffect, useRef, memo } from "react";
import * as Animatable from "react-native-animatable";
import { Video as VideoPlayer, ResizeMode } from "expo-av";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./style";
import FullScreen from "../../../assets/icons/FullScreen";
import PlayIcon from "../../../assets/icons/PlayIcon";
import PauseIcon from "../../../assets/icons/PauseIcon";
import ForWardIcon from "../../../assets/icons/ForWardIcon";
import BackWardIcon from "../../../assets/icons/BackWardIcon";
import ProgressBar, {
  formatTime,
} from "../../components/ProgressBar/ProgressBar";
import reviewDuyNen from "../../../assets/videos";
import { banhMyThumbnail } from "../../../assets/img/thumbnail";
interface VideoProps {
  toggleFullscreen: any;
  isFullscreen: boolean;
  video?: string;
  thumbnail: any;
}
const rotateAnimation = { 0: { rotate: "0deg" }, 1: { rotate: "360deg" } };
const rotateReverseAnimation = {
  0: { rotate: "0deg" },
  1: { rotate: "-360deg" },
};
const Video = ({
  toggleFullscreen,
  isFullscreen,
  video,
  thumbnail,
}: VideoProps) => {
  const { width, height } = useWindowDimensions();
  const vidRef = useRef<VideoPlayer>(null);
  const backwardRef = useRef(null);
  const forwardRef = useRef(null);
  const [status, setStatus] = useState(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [lastPress, setLastPress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(true);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isTouchStart, setIsTouchStart] = useState(false);
  const [isTouchEnd, setIsTouchEnd] = useState(false);
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

  const handleDoubleTab = (e: GestureResponderEvent) => {
    const delta = new Date().getTime() - lastPress;
    if (delta < 200) {
      if (e.nativeEvent.locationX / width > 0.5) {
        onForWard();
        if (forwardRef.current) {
          forwardRef.current.animate(rotateAnimation);
        }
      } else {
        onBackWard();
        if (backwardRef.current) {
          backwardRef.current.animate(rotateReverseAnimation);
        }
      }
    }
    setLastPress(new Date().getTime());
  };
  // Effect

  useEffect(() => {
    if (status) {
      if ((status.isBuffering && !status.isPlaying) !== isBuffering) {
        setIsBuffering((isBuffering) => !isBuffering);
      }
    }
  }, [status]);

  useEffect(() => {
    // auto play
    (async () => {
      if (vidRef.current) {
        try {
          await vidRef.current.playAsync();
          setIsPlaying(true);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, []);

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
      timeOutRef.current = setTimeout(
        () => {
          setIsTouchStart(false);
        },
        isFullscreen ? 2500 : 1000
      );
    }
    return () => clearTimeout(timeOutRef.current as NodeJS.Timeout);
  }, [isTouchEnd]);

  useEffect(() => {
    if (!isSeeking) {
      setIsTouchEnd(true);
    } else {
      setIsTouchEnd(false);
    }
  }, [isSeeking]);
  return (
    <>
      <Pressable
        style={[
          styles.vidWarpper,
          {
            flex: isFullscreen ? 1 : 0,
            marginTop: isFullscreen ? 0 : width < 400 ? 64 : 72,
          },
        ]}
        onTouchStart={() => {
          setIsTouchStart(true);
          setIsTouchEnd(false);
        }}
        onTouchEnd={() => {
          if (!isSeeking) {
            setIsTouchEnd(true);
          }
        }}
        onPress={handleDoubleTab}
      >
        <VideoPlayer
          ref={vidRef}
          usePoster={true}
          posterSource={{ uri: thumbnail }}
          source={{
            uri: video,
          }}
          resizeMode={ResizeMode.CONTAIN}
          style={{
            width: "100%",
            height: "100%",
          }}
          isMuted={isMute}
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
        {isTouchStart && duration !== 0 && (
          <Pressable
            style={styles.vidControl}
            onTouchStart={() => {
              setIsTouchStart(true);
              setIsTouchEnd(false);
            }}
            onTouchEnd={() => {
              if (!isSeeking) {
                setIsTouchEnd(true);
              }
            }}
            onPress={handleDoubleTab}
          >
            <TouchableOpacity activeOpacity={0.5} onPress={onBackWard}>
              <Animatable.View duration={200} ref={backwardRef}>
                <BackWardIcon></BackWardIcon>
              </Animatable.View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.btnPlay,
                {
                  paddingLeft: isPlaying ? 2 : 4,
                  // backgroundColor: isPlaying ? "transparent" : "#fff",
                },
              ]}
              onPress={onPlay}
            >
              {!isPlaying && <PlayIcon fill size={48} color="#fff"></PlayIcon>}
              {isPlaying && <PauseIcon fill size={48} color="#fff"></PauseIcon>}
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={onForWard}>
              <Animatable.View duration={200} ref={forwardRef}>
                <ForWardIcon></ForWardIcon>
              </Animatable.View>
            </TouchableOpacity>
            <View
              style={[
                styles.timeWrapper,
                {
                  bottom: isFullscreen ? "20%" : 12,
                  left: isFullscreen ? 12 : 0,
                  paddingRight: isFullscreen ? 24 : 0,
                },
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: 4,
                  alignItems: "center",
                  marginLeft: 4,
                }}
              >
                <Text style={styles.time}>{formatTime(currentTime)}</Text>
                <Text style={styles.time}>/</Text>
                <Text style={styles.time}>{formatTime(duration)}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => setIsMute(!isMute)}
                >
                  {isMute && (
                    <MaterialIcons name="volume-off" size={24} color="white" />
                  )}
                  {!isMute && (
                    <MaterialIcons name="volume-up" size={24} color="white" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={toggleFullscreen}
                >
                  {!isFullscreen && (
                    <FullScreen size={32} color="white"></FullScreen>
                  )}
                  {isFullscreen && (
                    <MaterialIcons
                      name="fullscreen-exit"
                      size={32}
                      color="white"
                    ></MaterialIcons>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        )}
      </Pressable>
      {duration !== 0 && (!isFullscreen || (isFullscreen && isTouchStart)) && (
        <View
          style={[
            styles.progressBar,
            {
              marginLeft: isFullscreen ? 0 : -20,
              top: !isFullscreen ? (width < 400 ? 220 + 64 : 220 + 72) : "84%",
              width: !isFullscreen ? width + 32 : width,
              justifyContent: isFullscreen ? "center" : "flex-start",
            },
          ]}
        >
          <ProgressBar
            isFullScreen={isFullscreen}
            currentTime={currentTime}
            duration={duration}
            onSeek={onSeek}
            seekingEvent={seekingEvent}
            isSeeking={isSeeking}
          ></ProgressBar>
        </View>
      )}
    </>
  );
};

export default memo(Video);
