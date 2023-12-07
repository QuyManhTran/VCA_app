import { useEffect, useLayoutEffect, useState } from "react";
import { LogBox } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import Video from "./src/screens/Video";
import Search from "./src/screens/Search";
import SingleList from "./src/screens/Explore/SingleList";
import GlobalContext from "./src/utilies/GlobalContext";
import Setting from "./src/screens/Account/Setting/Setting";
import EditInfor from "./src/screens/Account/Setting/EditInfor";
import Notification from "./src/screens/Notification";
import Blog from "./src/screens/Blog";
import ShowFullImage from "./src/screens/Account/ShowFullImage";
import Display from "./src/screens/Account/Display";
import Password from "./src/screens/Account/Password";
import TermsOfService from "./src/screens/Account/Setting/TermsOfService";
import PrivacyPolicy from "./src/screens/Account/Setting/PrivacyPolicy";
import Language from "./src/screens/Account/Setting/Language";
import History from "./src/screens/Account/History";
import TrendingList from "./src/screens/TrendingList";
import PlayList from "./src/screens/PlayList";
import customeFont from "./constants/customeFont";
import Waiting from "./src/screens/Waiting";
import "expo-dev-client";
import ExpoGoogle from "./src/screens/ExpoGoogle";
import AskLogin from "./src/screens/AskAccount/AskLogin";
import AskRegister from "./src/screens/AskAccount/AskRegister";
import Model3d from "./src/screens/Blog/CustomerExperience/Model3d";

const Stack = createNativeStackNavigator();

export default function App() {
  const isFont = customeFont();
  const [storageData, setStorageData] = useState<object | null>();
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const onGetDataFromStorage = async () => {
    try {
      setIsLoading(true);
      const storageValue = await AsyncStorage.getItem(
        process.env.EXPO_PUBLIC_STORAGE_KEY
      );
      console.log("storage:----", storageValue);
      if (storageValue !== null) {
        setStorageData(JSON.parse(storageValue));
      } else {
        setStorageData(null);
      }
    } catch (error) {
      console.log("cannot get data from storage");
    }
  };
  useEffect(() => {
    LogBox.ignoreLogs([
      'Scripts "build/three.js" and "build/three.min.js" are deprecated with r150+, and will be removed with r160. Please use ES Modules or alternatives: https://threejs.org/docs/index.html#manual/en/introduction/Installation',
      "new NativeEventEmitter()",
      "Non-serializable values were found in the navigation state",
    ]);
  }, []);

  useLayoutEffect(() => {
    onGetDataFromStorage();
  }, []);

  useEffect(() => {
    if (storageData === null || storageData !== undefined) {
      setIsLoading(false);
    }
  }, [storageData]);

  if (isLoading || isLoading === null) {
    return <Waiting></Waiting>;
  }

  return (
    <>
      {isLoading === false && isFont && (
        <GlobalContext
          storageData={storageData === null ? "" : JSON.stringify(storageData)}
        >
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName={storageData === null ? "Splash" : "Navbar"}
            >
              <Stack.Screen name="ExpoGoogle" component={ExpoGoogle} />
              <Stack.Screen name="Splash" component={Splash} />
              <Stack.Screen name="Navbar" component={Navbar} />
              <Stack.Screen name="AskAccount" component={AskAccount} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="AskLogin" component={AskLogin} />
              <Stack.Screen name="AskRegister" component={AskRegister} />
              <Stack.Screen
                name="EmailRequirement"
                component={EmailRequirement}
              />
              <Stack.Screen name="CodeVerifying" component={CodeVerifying} />
              <Stack.Screen name="ResetPassword" component={ResetPassword} />
              <Stack.Screen
                name="SuccessfullyChange"
                component={SuccessfullyChange}
              />
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="Search" component={Search} />
              <Stack.Screen name="SingleList" component={SingleList} />
              <Stack.Screen name="Notification" component={Notification} />
              <Stack.Screen name="Video" component={Video} />

              <Stack.Screen name="Setting" component={Setting} />
              <Stack.Screen name="EditInfor" component={EditInfor} />
              <Stack.Screen name="Blog" component={Blog} />
              <Stack.Screen name="showImage" component={ShowFullImage} />
              <Stack.Screen name="Display" component={Display} />
              <Stack.Screen name="Password" component={Password} />
              <Stack.Screen name="TermsOfService" component={TermsOfService} />
              <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
              <Stack.Screen name="Language" component={Language} />
              <Stack.Screen name="History" component={History} />
              <Stack.Screen name="Trending" component={TrendingList} />
              <Stack.Screen name="PlayList" component={PlayList} />
              <Stack.Screen name="Model3d" component={Model3d} />
            </Stack.Navigator>
          </NavigationContainer>
        </GlobalContext>
      )}
    </>
  );
}
