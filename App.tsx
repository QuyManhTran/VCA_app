import React from "react";
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

const Stack = createNativeStackNavigator();
export default function App() {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
