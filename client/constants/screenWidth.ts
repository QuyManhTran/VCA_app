import { useState } from "react";
import { useWindowDimensions } from "react-native";
const screenWidth = () => {
  const { width } = useWindowDimensions();
  const [screenWidth, setScreenWidth] = useState(width);
  return screenWidth;
};

export default screenWidth;
