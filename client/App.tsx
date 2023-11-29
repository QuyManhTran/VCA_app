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
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalContext>
  );
}
