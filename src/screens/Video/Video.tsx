import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Pressable,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import styles from "./style";
import { Video as VideoPlayer, ResizeMode, AVPlaybackStatus } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import FullScreen from "../../../assets/icons/FullScreen";
import PlayIcon from "../../../assets/icons/PlayIcon";
import PauseIcon from "../../../assets/icons/PauseIcon";
import ForWardIcon from "../../../assets/icons/ForWardIcon";
import BackWardIcon from "../../../assets/icons/BackWardIcon";
import ProgressBar from "../../components/ProgressBar/ProgressBar";
const Video = () => {
  const { width, height } = useWindowDimensions();
  const vidRef = useRef<VideoPlayer>(null);
  const [status, setStatus] = useState(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTouchStart, setIsTouchStart] = useState(false);
  const [isTouchEnd, setIsTouchEnd] = useState(false);
  const timeOutRef: { current: NodeJS.Timeout | null } = useRef(null);
  const intervalRef: { current: NodeJS.Timeout | null } = useRef(null);
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
  // Effect
  useEffect(() => {
    // console.log(currentTime, duration);
  }, [currentTime]);

  useEffect(() => {
    // auto play
    (async () => {
      if (vidRef.current) {
        await vidRef.current.playAsync();
        setIsPlaying(true);
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
      timeOutRef.current = setTimeout(() => {
        setIsTouchStart(false);
      }, 2000);
    }
    return () => clearTimeout(timeOutRef.current as NodeJS.Timeout);
  }, [isTouchEnd]);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.vidWarpper,
          {
            flex: isFullscreen ? 1 : 0,
          },
        ]}
      >
        <VideoPlayer
          ref={vidRef}
          usePoster={true}
          posterSource={{
            uri: "https://images.pexels.com/photos/50859/pexels-photo-50859.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          }}
          source={{
            uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
          }}
          resizeMode={ResizeMode.STRETCH}
          style={{
            width: "100%",
            height: "100%",
          }}
          isLooping
          //  onLoadStart={() => console.log(status.durationMillis)}
          onLoad={onLoad}
          onTouchStart={() => {
            setIsTouchStart(true);
            setIsTouchEnd(false);
          }}
          onTouchEnd={() => setIsTouchEnd(true)}
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        ></VideoPlayer>
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
        {/* <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => vidRef.current.pauseAsync()}
        >
          <NavButton>Stop</NavButton>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => vidRef.current.playAsync()}
        >
          <NavButton>Play</NavButton>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default Video;
