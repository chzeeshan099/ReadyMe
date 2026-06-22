import React from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, GLOW } from "../constants/colors";

export default function TopBar({
  title,
  subtitle,
  showBack = false,
  onBack,
  rightLabel,
  onRightPress,
}) {
  return (
    <View className="mb-6 flex-row items-start justify-between">
      <View className="flex-1 pr-3">
        {showBack ? (
          <Pressable
            onPress={onBack}
            className="mb-4 h-11 w-11 items-center justify-center rounded-2xl border bg-white/6"
            style={{ ...GLOW.panel, borderColor: "rgba(77,145,255,0.2)" }}
          >
            <MaterialIcons name="arrow-back-ios-new" size={18} color={COLORS.text} />
          </Pressable>
        ) : null}
        <Text className="text-[30px] font-black tracking-[-0.8px] text-white">
          {title}
        </Text>
        {subtitle ? (
          <Text className="mt-2 text-[15px] leading-7 text-slate-300">{subtitle}</Text>
        ) : null}
      </View>

      {rightLabel ? (
        <Pressable onPress={onRightPress} className="pt-2">
          <Text className="font-semibold text-blue-300">{rightLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
