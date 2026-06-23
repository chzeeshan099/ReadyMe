import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, View } from "react-native";
import AppDrawer from "@/shared/components/AppDrawer";
import TopBar from "@/shared/components/TopBar";
import { COLORS } from "@/shared/constants/colors";

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

  return (
    <LinearGradient colors={COLORS.bgGradient} className="flex-1">
      <SafeAreaView className="flex-1">
        <View className={`flex-1 ${padded ? "px-5 pt-4" : "pt-4"}`}>
          <View className={padded ? "" : "px-5"}>
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
