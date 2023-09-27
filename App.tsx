import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./src/screens/Splash";
import Login from "./src/screens/Login";
import AskAccount from "./src/screens/AskAccount";
import EmailRequirement from "./src/screens/ForgotPassword/EmailRequirement/EmailRequirement";
import CodeVerifying from "./src/screens/ForgotPassword/CodeVerifying";
import ResetPassword from "./src/screens/ForgotPassword/ResetPassword";
import SuccessfullyChange from "./src/screens/ForgotPassword/SuccessfullyChange";
import Register from "./src/screens/Register";
import Navbar from "./src/screens/Navbar";
import { EventRegister } from "react-native-event-listeners";
import ThemeContext from "./src/utilies/theme";
const Stack = createNativeStackNavigator();

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHomeScrollDown, setIsHomeScrollDown] = useState(false);
  const setHomeNavbar = (isScrollDown: boolean) => {
    if (isScrollDown !== isHomeScrollDown) {
      setIsHomeScrollDown(isScrollDown);
    }
  };
  useEffect(() => {
    const listener = EventRegister.addEventListener("ChangeTheme", (theme) => {
      setIsDarkMode(theme);
    });
    return () => {
      EventRegister.removeAllListeners();
    };
  }, [isDarkMode]);
  return (
    <ThemeContext.Provider
      value={{ isDarkMode, isHomeScrollDown, setHomeNavbar }}
    >
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="AskAccount" component={AskAccount} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="EmailRequirement" component={EmailRequirement} />
          <Stack.Screen name="CodeVerifying" component={CodeVerifying} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen
            name="SuccessfullyChange"
            component={SuccessfullyChange}
          />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Navbar" component={Navbar} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
