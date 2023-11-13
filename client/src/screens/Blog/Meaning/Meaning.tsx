import { View, Text } from "react-native";
import { colors } from "../../../../constants";
import MeaningItem from "./MeaningItem";
import { baloo2Fonts } from "../../../../constants/fontFamiles";

export interface history {
  title: string;
  img: any;
  content: string;
}
interface MeaningProps {
  histories: history[];
  isDarkMode: boolean;
  width: number;
}
const Meaning = ({ histories, isDarkMode, width }: MeaningProps) => {
  return (
    <View
      style={{
        backgroundColor: isDarkMode ? colors.darkTheme : "#fff",
        flexDirection: "column",
        gap: 12,
        marginBottom: 12,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontFamily: baloo2Fonts.bold,
          marginBottom: -12,
          color: isDarkMode ? colors.whiteText : "black",
        }}
      >
        Các mốc lịch sử
      </Text>
      {histories.map((history, index) => (
        <MeaningItem
          key={index}
          {...history}
          isDarkMode={isDarkMode}
        ></MeaningItem>
      ))}
    </View>
  );
};

export default Meaning;
