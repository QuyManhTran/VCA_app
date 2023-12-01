import { View, ImageBackground } from "react-native";
import { waiting } from "../../../assets/img/splash";

const Waiting = () => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={waiting}
        resizeMode="cover"
        style={{ flex: 1 }}
      ></ImageBackground>
    </View>
  );
};

export default Waiting;
