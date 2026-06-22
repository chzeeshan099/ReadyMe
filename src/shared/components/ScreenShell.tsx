import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, View } from "react-native";
import BottomDock from "@/shared/components/BottomDock";
import TopBar from "@/shared/components/TopBar";
import { COLORS } from "@/shared/constants/colors";

export default function ScreenShell({
  children,
  navigation,
  activeRoute,
  role,
  title,
  subtitle,
  showBack = false,
  rightLabel = "",
  onRightPress = () => {},
  padded = true,
}) {
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
            />
          </View>
          <View className="flex-1">{children}</View>
        </View>
        <BottomDock navigation={navigation} activeRoute={activeRoute} role={role} />
      </SafeAreaView>
    </LinearGradient>
  );
}
