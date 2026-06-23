import React from "react";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FONTS } from "@/shared/constants/colors";
import { useAppTheme } from "@/core/providers/ThemeProvider";

const countdownStats = [
  { label: "Study Streak", value: "2" },
  { label: "Daily Progress", value: "0%" },
  { label: "Topics Covered", value: "--" },
  { label: "Questions", value: "0 min" },
];

export default function DashboardCountdownCard() {
  const { colors } = useAppTheme();

  return (
    <View
      className="rounded-[30px] border px-5 py-5"
      style={{ borderColor: colors.border, backgroundColor: colors.surface }}
    >
      <Text
        className="text-[11px] uppercase tracking-[3px]"
        style={{ color: colors.secondary, fontFamily: FONTS.bodyMedium }}
      >
        Exam Countdown
      </Text>

      <View className="mt-4 flex-row items-center justify-between">
        <View>
          <Text
            className="text-[38px]"
            style={{ color: colors.text, fontFamily: FONTS.heading }}
          >
            351
          </Text>
          <Text style={{ color: colors.muted, fontFamily: FONTS.body }}>days left</Text>
        </View>
        <View
          className="h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: colors.input }}
        >
          <MaterialIcons name="calendar-month" size={28} color={colors.secondary} />
        </View>
      </View>

      <View className="mt-5 flex-row flex-wrap justify-between">
        {countdownStats.map((item) => (
          <View
            key={item.label}
            className="mb-3 w-[48.5%] rounded-[20px] border px-4 py-4"
            style={{ borderColor: colors.softBorder, backgroundColor: colors.card }}
          >
            <Text style={{ color: colors.secondary, fontFamily: FONTS.bodyMedium }}>
              {item.value}
            </Text>
            <Text
              className="mt-2 text-[12px]"
              style={{ color: colors.dim, fontFamily: FONTS.body }}
            >
              {item.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

