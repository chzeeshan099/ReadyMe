import React from "react";
import { Pressable, Text, View } from "react-native";
import { FONTS } from "@/shared/constants/colors";
import { useAppTheme } from "@/core/providers/ThemeProvider";

export default function DashboardPlanCard() {
  const { colors } = useAppTheme();

  return (
    <View
      className="rounded-[28px] border px-5 py-4"
      style={{ borderColor: colors.border, backgroundColor: colors.surfaceAlt }}
    >
      <Text
        className="text-[11px] uppercase tracking-[3px]"
        style={{ color: colors.secondary, fontFamily: FONTS.bodyMedium }}
      >
        Next up
      </Text>
      <View className="mt-3 flex-row items-center justify-between gap-4">
        <Text
          className="flex-1 text-[16px] leading-6"
          style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}
        >
          No tasks planned for today
        </Text>
        <Pressable
          className="rounded-2xl px-4 py-3"
          style={{ backgroundColor: colors.primary }}
        >
          <Text style={{ color: "#FFFFFF", fontFamily: FONTS.bodyMedium }}>Plan your day</Text>
        </Pressable>
      </View>
    </View>
  );
}

