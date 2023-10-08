import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";
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
import Video from "./src/screens/Video";
import Search from "./src/screens/Search";
import SingleList from "./src/screens/Explore/SingleList";
import { list } from "./assets/img/foods";
const Stack = createNativeStackNavigator();
const fakeData = [
  { img: list, name: "Món ngon Hà Nội" },
  { img: list, name: "Gỏi các loại" },
  { img: list, name: "Bún with love" },
  { img: list, name: "Xem sau" },
];
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHomeScrollDown, setIsHomeScrollDown] = useState(false);
  const [personalLists, setPersonalLists] = useState(fakeData);
  const setHomeNavbar = (isScrollDown: boolean) => {
    if (isScrollDown !== isHomeScrollDown) {
      setIsHomeScrollDown(isScrollDown);
    }
  };
  const onAddList = (name: string) => {
    setPersonalLists((prevLists) => [...prevLists, { img: list, name: name }]);
  };
  const onRemoveList = (index: number) => {
    setPersonalLists((prevLists) => {
      prevLists.splice(index, 1);
      return prevLists;
    });
  };
  useEffect(() => {
    LogBox.ignoreLogs([
      "new NativeEventEmitter()",
      "Non-serializable values were found in the navigation state",
    ]);
  }, []);
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
      value={{
        isDarkMode,
        isHomeScrollDown,
        personalLists,
        setHomeNavbar,
        onAddList,
        onRemoveList,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Splash"
        >
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
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen name="SingleList" component={SingleList} />
          <Stack.Screen name="Video" component={Video} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
