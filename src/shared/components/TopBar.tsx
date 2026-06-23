import React from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import { FONTS } from "@/shared/constants/colors";

export default function TopBar({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightLabel,
  onRightPress,
  showMenu = true,
  onMenuPress,
}) {
  const { colors, isDark, toggleMode } = useAppTheme();

  return (
    <View
      className="mb-6 flex-row items-start justify-between rounded-[28px] px-4 py-4"
      style={{ backgroundColor: colors.header, shadowColor: colors.primary }}
    >
      <View className="flex-1 pr-3">
        {showBack ? (
          <Pressable
            onPress={onBack}
            className="mb-4 h-11 w-11 items-center justify-center rounded-2xl border shadow-neon-sm"
            style={{
              borderColor: "rgba(255,255,255,0.14)",
              backgroundColor: "rgba(255,255,255,0.12)",
            }}
          >
            <MaterialIcons name="arrow-back-ios-new" size={18} color="#FFFFFF" />
          </Pressable>
        ) : null}

        <Text
          className="text-[30px] font-black tracking-[-0.8px]"
          style={{ color: "#FFFFFF", fontFamily: FONTS.heading }}
        >
          {title}
        </Text>

        {subtitle ? (
          <Text
            className="mt-2 text-[15px] leading-7"
            style={{ color: colors.headerMuted, fontFamily: FONTS.body }}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>

      <View className="flex-row items-center gap-3 pt-2">
        {rightLabel ? (
          <Pressable onPress={onRightPress}>
            <Text style={{ color: "#FFFFFF", fontFamily: FONTS.bodyMedium }}>
              {rightLabel}
            </Text>
          </Pressable>
        ) : null}

        <Pressable
          onPress={toggleMode}
          className="h-11 w-11 items-center justify-center rounded-2xl border"
          style={{
            borderColor: "rgba(255,255,255,0.14)",
            backgroundColor: "rgba(255,255,255,0.12)",
          }}
        >
          <MaterialIcons name={isDark ? "light-mode" : "dark-mode"} size={22} color="#FFFFFF" />
        </Pressable>

        {showMenu ? (
          <Pressable
            onPress={onMenuPress}
            className="h-11 w-11 items-center justify-center rounded-2xl border shadow-neon-sm"
            style={{
              borderColor: "rgba(255,255,255,0.14)",
              backgroundColor: "rgba(255,255,255,0.12)",
            }}
          >
            <MaterialIcons name="menu" size={22} color="#FFFFFF" />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}
