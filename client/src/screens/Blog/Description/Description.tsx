import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NativeSyntheticEvent,
  TextLayoutEventData,
} from "react-native";
import { useState } from "react";
import { baloo2Fonts } from "../../../../constants/fontFamiles";
import { colors } from "../../../../constants";
interface DescriptionProps {
  content: string;
  isDarkMode: boolean;
}

const Description = ({ content, isDarkMode }: DescriptionProps) => {
  const [isSeeMore, setIsSeeMore] = useState<boolean | null>(null);
  const onTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
    const numOfLines = e.nativeEvent.lines.length;
    if (numOfLines > 8 && isSeeMore === null) {
      setIsSeeMore(false);
    }
  };
  return (
    <View style={{ marginBottom: 12 }}>
      <Text
        onTextLayout={onTextLayout}
        style={[
          styles.text,
          { color: isDarkMode ? colors.whiteText : "black" },
        ]}
        numberOfLines={isSeeMore ? undefined : 8}
        ellipsizeMode="tail"
      >
        {content}
      </Text>
      {isSeeMore !== null && (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => setIsSeeMore(!isSeeMore)}
        >
          <Text
            style={[
              styles.text,
              {
                fontFamily: baloo2Fonts.bold,
                color: isDarkMode ? colors.primary : "black",
              },
            ]}
          >
            {!isSeeMore ? "Xem thêm" : "Ẩn bớt"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Description;

const styles = StyleSheet.create({
  text: {
    fontFamily: baloo2Fonts.medium,
    fontSize: 20,
    textAlign: "justify",
  },
});
