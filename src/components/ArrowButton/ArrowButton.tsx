import { Animated, TouchableOpacity, View } from "react-native";
import React, { useRef, useEffect } from "react";
import { Svg, Circle, G } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";
import styles from "./style";

const ArrowButton = ({ percentage, onNext }) => {
  const size = 78;
  const strokeWidth = 4;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);
  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener((value) => {
      const strokeDashoffset =
        circumference - (circumference * value.value) / 100;
      if (progressRef?.current) {
        progressRef.current.setNativeProps({
          strokeDashoffset: strokeDashoffset,
        });
      }
    });
    return () => progressAnimation.removeAllListeners();
  }, [percentage]);
  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        <G rotation={"-90"} origin={center}>
          <Circle
            stroke={"rgba(0, 0, 0, 0.1)"}
            fill={"rgba(0, 0, 0, 0.1)"}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          ></Circle>
          <Circle
            stroke={"#fff"}
            fill={"rgba(0, 0, 0, 0.1)"}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            ref={progressRef}
          ></Circle>
        </G>
      </Svg>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.btn}
        onPress={onNext}
        touchSoundDisabled={true}
      >
        <AntDesign name="arrowright" size={32} color={"#fff"}></AntDesign>
      </TouchableOpacity>
    </View>
  );
};

export default ArrowButton;
