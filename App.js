import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./src/core/navigation/AppNavigator";
import AuthNavigator from "./src/core/navigation/AuthNavigator";
import { SupabaseProvider } from "./src/core/providers/SupabaseProvider";
import { useAuthStore } from "./src/modules/auth/store/auth.store";
import Loader from "./src/shared/components/Loader";
import { COLORS } from "./src/shared/constants/colors";
import "./global.css";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.background,
    card: COLORS.surface,
    text: COLORS.text,
    border: COLORS.border,
    primary: COLORS.primary,
  },
};

function RootNavigation() {
  const user = useAuthStore((state) => state.user);

  return user ? <AppNavigator /> : <AuthNavigator />;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SupabaseProvider>
        <NavigationContainer theme={navTheme}>
          <StatusBar style="light" />
          <RootNavigation />
        </NavigationContainer>
      </SupabaseProvider>
    </SafeAreaProvider>
  );
}
