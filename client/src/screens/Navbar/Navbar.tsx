import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Home";
import Explore from "../Explore";
import Account from "../Account";
import MyTabBar from "./MyNavbar";
import MyTabBarIcon from "./MyTabBarIcon";
import { RouterProps } from "../Splash/Splash";

const Tab = createBottomTabNavigator();
const Navbar = ({ route, navigation }: RouterProps) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBar={(props) => <MyTabBar {...props}></MyTabBar>}
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          left: 0,
          right: 0,
          paddingBottom: 20,
          backgroundColor: "#fff",
          height: 60,
          elevation: 2,
          shadowColor: "#171717",
          shadowOpacity: 0.5,
          shadowRadius: 8,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
        },
        tabBarIcon: ({ focused }) => (
          <MyTabBarIcon focused={focused} route={route}></MyTabBarIcon>
        ),
      })}
    >
      <Tab.Screen name="Library" component={Explore} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default Navbar;
