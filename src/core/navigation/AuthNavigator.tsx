import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../modules/auth/screens/LoginScreen";
import RegisterScreen from "../../modules/auth/screens/RegisterScreen";
import ForgotPasswordScreen from "../../modules/auth/screens/ForgotPasswordScreen";

const Stack = createNativeStackNavigator<any>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      id="auth-stack"
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
