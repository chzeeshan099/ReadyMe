import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "@/core/navigation/AppNavigator";
import AuthNavigator from "@/core/navigation/AuthNavigator";
import { SupabaseProvider } from "@/core/providers/SupabaseProvider";
import { ThemeProvider, useAppTheme } from "@/core/providers/ThemeProvider";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import "./global.css";

function RootNavigation() {
  const user = useAuthStore((state) => state.user);

  return user ? <AppNavigator /> : <AuthNavigator />;
}

function ThemedAppFrame() {
  const { colors, isDark } = useAppTheme();

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
      primary: colors.primary,
    },
  };

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar
        style={isDark ? "light" : "dark"}
        translucent={false}
        backgroundColor={colors.header}
      />
      <RootNavigation />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <SupabaseProvider>
          <ThemedAppFrame />
        </SupabaseProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
