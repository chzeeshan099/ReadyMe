import React from "react";
import { Easing } from "react-native";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import LoginScreen from "@/modules/auth/screens/LoginScreen";
import RegisterScreen from "@/modules/auth/screens/RegisterScreen";
import ForgotPasswordScreen from "@/modules/auth/screens/ForgotPasswordScreen";

const Stack = createStackNavigator<any>();

export default function AuthNavigator() {
  const { colors } = useAppTheme();

  return (
    <Stack.Navigator
      id="auth-stack"
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: colors.background },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        transitionSpec: {
          open: {
            animation: "timing",
            config: {
              duration: 260,
              easing: Easing.out(Easing.poly(4)),
            },
          },
          close: {
            animation: "timing",
            config: {
              duration: 220,
              easing: Easing.out(Easing.poly(4)),
            },
          },
        },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
