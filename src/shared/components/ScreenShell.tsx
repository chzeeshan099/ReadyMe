import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppDrawer from "@/shared/components/AppDrawer";
import TopBar from "@/shared/components/TopBar";
import { useAppTheme } from "@/core/providers/ThemeProvider";

export default function ScreenShell({
  children,
  navigation,
  activeRoute,
  role = "student",
  title,
  subtitle,
  showBack = false,
  rightLabel = "",
  onRightPress = () => {},
  padded = true,
}) {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { colors, isDark } = useAppTheme();

  return (
    <LinearGradient colors={colors.bgGradient} className="flex-1">
      <SafeAreaView className="flex-1" edges={["top", "left", "right"]}>
        <StatusBar
          backgroundColor={colors.header}
          barStyle={isDark ? "light-content" : "dark-content"}
        />
        <View className={`flex-1 ${padded ? "px-4 pt-3" : "pt-3"}`}>
          <View className={padded ? "" : "px-4"}>
            <TopBar
              title={title}
              subtitle={subtitle}
              showBack={showBack}
              onBack={() => navigation.goBack()}
              rightLabel={rightLabel}
              onRightPress={onRightPress}
              onMenuPress={() => setDrawerVisible(true)}
            />
          </View>
          <View className="flex-1">{children}</View>
        </View>
        <AppDrawer
          visible={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          navigation={navigation}
          activeRoute={activeRoute}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
