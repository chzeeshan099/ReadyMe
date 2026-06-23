import React from "react";
import { Pressable, Text, View } from "react-native";
import { FONTS } from "@/shared/constants/colors";
import { useAppTheme } from "@/core/providers/ThemeProvider";

export default function DashboardTasksCard() {
  const { colors } = useAppTheme();

  return (
    <View
      className="rounded-[30px] border px-5 py-5"
      style={{ borderColor: colors.softBorder, backgroundColor: colors.surfaceAlt }}
    >
      <View className="flex-row items-center justify-between">
        <Text style={{ color: colors.text, fontFamily: FONTS.heading, fontSize: 22 }}>
          Upcoming Tasks
        </Text>
        <Pressable
          className="rounded-full px-4 py-2"
          style={{ backgroundColor: colors.input }}
        >
          <Text style={{ color: colors.primary, fontFamily: FONTS.bodyMedium }}>Add Task</Text>
        </Pressable>
      </View>

      <View
        className="mt-4 items-center rounded-[24px] border px-5 py-6"
        style={{ borderColor: colors.softBorder, backgroundColor: colors.card }}
      >
        <Text style={{ color: colors.dim, fontFamily: FONTS.body }}>No upcoming tasks</Text>
        <Pressable
          className="mt-4 rounded-2xl px-4 py-3"
          style={{ backgroundColor: colors.primary }}
        >
          <Text style={{ color: "#FFFFFF", fontFamily: FONTS.bodyMedium }}>Plan your day</Text>
        </Pressable>
      </View>
    </View>
  );
}

