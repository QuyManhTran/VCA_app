import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Pressable,
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
const Video = () => {
  const { width, height } = useWindowDimensions();
  const vidRef = useRef<VideoPlayer>(null);
  const [status, setStatus] = useState(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTouchStart, setIsTouchStart] = useState(false);
  const [isTouchEnd, setIsTouchEnd] = useState(false);
  const timeOutRef: { current: NodeJS.Timeout | null } = useRef(null);
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
      const newPosition = status.positionMillis - 10000;
      if (newPosition > 0) {
        vidRef.current.setPositionAsync(newPosition);
      } else {
        vidRef.current.setPositionAsync(0);
      }
    }
  };

  const onForWard = () => {
    if (status) {
      const newPosition = status.positionMillis + 10000;
      if (newPosition < status.durationMillis) {
        vidRef.current.setPositionAsync(newPosition);
      } else {
        vidRef.current.setPositionAsync(status.durationMillis);
      }
    }
  };
  // Effect
  useEffect(() => {
    // auto play
    (async () => {
      if (vidRef.current) {
        await vidRef.current.playAsync();
      }
    })();
  }, []);

  useEffect(() => {
    if (isTouchEnd) {
      timeOutRef.current = setTimeout(() => {
        setIsTouchStart(false);
      }, 3000);
    }
    return () => clearTimeout(timeOutRef.current as NodeJS.Timeout);
  }, [isTouchEnd]);
  return (
    <View style={styles.container}>
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
          source={{
            uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
          }}
          resizeMode={ResizeMode.STRETCH}
          style={{
            width: "100%",
            height: "100%",
          }}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          onTouchStart={() => {
            setIsTouchStart(true);
            setIsTouchEnd(false);
          }}
          onTouchEnd={() => setIsTouchEnd(true)}
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
              style={[styles.btnPlay, { paddingLeft: isPlaying ? 2 : 4 }]}
              onPress={onPlay}
            >
              {!isPlaying && <PlayIcon fill size={28}></PlayIcon>}
              {isPlaying && <PauseIcon fill size={28}></PauseIcon>}
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
    </View>
  );
};

export default Video;
