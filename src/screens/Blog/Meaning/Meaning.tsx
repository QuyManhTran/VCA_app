import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { baloo2Fonts } from "../../../../constants/fontFamiles";
import { colors } from "../../../../constants";
interface MeaningProps {
  content: string;
  isDarkMode: boolean;
  width: number;
}
const Meaning = ({ content, isDarkMode, width }: MeaningProps) => {
  const [isSeeMore, setIsSeeMore] = useState(false);
  return (
    <View>
      <Text
        style={[
          styles.text,
          { color: isDarkMode ? colors.whiteText : "black" },
        ]}
        numberOfLines={isSeeMore ? undefined : 8}
        ellipsizeMode="tail"
      >
        {content}
      </Text>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => setIsSeeMore(!isSeeMore)}
        style={{ marginTop: isSeeMore ? (width > 400 ? -30 : 0) : 0 }}
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
    </View>
  );
};

export default Meaning;

const styles = StyleSheet.create({
  text: {
    fontFamily: baloo2Fonts.medium,
    fontSize: 20,
    textAlign: "justify",
    lineHeight: 30,
  },
});
