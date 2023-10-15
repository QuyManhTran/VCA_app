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
import ThemeContext from "./src/utilies/theme";
import Video from "./src/screens/Video";
import Search from "./src/screens/Search";
import SingleList from "./src/screens/Explore/SingleList";
import GlobalContext from "./src/utilies/GlobalContext";
import Notification from "./src/screens/Notification";
import Blog from "./src/screens/Blog";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GlobalContext>
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
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="Video" component={Video} />
          <Stack.Screen name="Blog" component={Blog} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalContext>
  );
}
