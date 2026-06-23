import React from "react";
import { Text, View } from "react-native";
import { FONTS } from "@/shared/constants/colors";
import { useAppTheme } from "@/core/providers/ThemeProvider";

export default function DashboardHero() {
  const { colors } = useAppTheme();

  return (
    <View
      className="rounded-[30px] border px-5 py-5"
      style={{ borderColor: colors.border, backgroundColor: colors.surface }}
    >
      <View className="flex-row items-center justify-between">
        <Text
          className="text-[12px] uppercase tracking-[4px]"
          style={{ color: colors.secondary, fontFamily: FONTS.bodyMedium }}
        >
          Tuesday 23 June
        </Text>
        <View
          className="rounded-full px-4 py-2"
          style={{ backgroundColor: colors.primaryDeep }}
        >
          <Text style={{ color: "#FFFFFF", fontFamily: FONTS.bodyMedium }}>2-day streak</Text>
        </View>
      </View>

      <Text
        className="mt-5 text-[34px] leading-[40px]"
        style={{ color: colors.text, fontFamily: FONTS.heading }}
      >
        Evening learner,{"\n"}Muhammad.
      </Text>

      <Text
        className="mt-4 text-[15px] leading-7"
        style={{ color: colors.muted, fontFamily: FONTS.body }}
      >
        Pick a focus below and track how you are doing across papers, notes, AI, and
        mock prep.
      </Text>
    </View>
  );
}

