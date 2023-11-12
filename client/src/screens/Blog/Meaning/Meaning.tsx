import { View } from "react-native";
import { colors } from "../../../../constants";
import MeaningItem from "./MeaningItem";

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
        gap: 24,
        marginBottom: 12,
      }}
    >
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
