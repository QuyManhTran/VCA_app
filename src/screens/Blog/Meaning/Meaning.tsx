import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { baloo2Fonts } from "../../../../constants/fontFamiles";
interface MeaningProps {
  content: string;
  isDarkMode: boolean;
}
const Meaning = ({ content, isDarkMode }: MeaningProps) => {
  const [isSeeMore, setIsSeeMore] = useState(false);
  return (
    <View>
      <Text
        style={styles.text}
        numberOfLines={isSeeMore ? undefined : 8}
        ellipsizeMode="tail"
      >
        {content}
      </Text>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => setIsSeeMore(!isSeeMore)}
      >
        <Text style={[styles.text, { fontFamily: baloo2Fonts.bold }]}>
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
