import { View, Text, Switch } from "react-native";
import React, { useState, useContext } from "react";
import ThemeContext, { darkTheme } from "../../utilies/theme";
import { EventRegister } from "react-native-event-listeners";

const Account = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [darkMode, setDarkMode] = useState(isDarkMode);
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: darkMode ? darkTheme.backGroundColor : undefined,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "600",
          color: darkMode ? darkTheme.color : undefined,
        }}
      >
        ACCOUNT
      </Text>
      <Switch
        value={darkMode}
        onValueChange={(value) => {
          setDarkMode(value);
          EventRegister.emit("ChangeTheme", value);
        }}
        style={[{ transform: [{ scale: 1.5 }] }, { width: 30 }]}
      ></Switch>
    </View>
  );
};

export default Account;
