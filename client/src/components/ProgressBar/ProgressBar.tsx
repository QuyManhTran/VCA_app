import { useState, useEffect } from "react";
import Slider from "@react-native-community/slider";
import { colors } from "../../../constants";
interface ProGressBarProps {
  currentTime: number;
  duration: number;
  onSeek: any;
  seekingEvent: any;
  isSeeking: boolean;
  isFullScreen: boolean;
}
export const formatTime = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds - minutes * 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};
const ProgressBar = ({
  currentTime,
  duration,
  onSeek,
  seekingEvent,
  isSeeking,
  isFullScreen,
}: ProGressBarProps) => {
  const [value, setValue] = useState<number | null>(null);
  const onValueChange = (value: number) => {
    onSeek((value / 100) * duration);
  };
  useEffect(() => {
    if (!isSeeking) {
      setValue((currentTime / duration) * 100);
    }
  }, [currentTime]);
  return (
    <Slider
      style={{ width: "100%" }}
      minimumValue={0}
      maximumValue={100}
      step={1}
      value={value}
      minimumTrackTintColor={colors.primary}
      maximumTrackTintColor="#ccc"
      thumbTintColor={colors.primary}
      onValueChange={onValueChange}
      onSlidingStart={() => seekingEvent(true)}
      onSlidingComplete={(value) => {
        seekingEvent(false);
        setValue(value);
      }}
    />
  );
};
export default ProgressBar;
