import React from "react";
import { Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FONTS } from "@/shared/constants/colors";
import { useAppTheme } from "@/core/providers/ThemeProvider";

const stats = [
  { label: "Completed", value: "0%" },
  { label: "Papers Done", value: "0/0" },
];

const rows = [
  { topic: "English Language", p1: "0", p2: "0" },
  { topic: "Reading Skills", p1: "0", p2: "0" },
];

export default function DashboardPracticeCard() {
  const { colors } = useAppTheme();

  return (
    <View
      className="rounded-[30px] border px-5 py-5"
      style={{ borderColor: colors.border, backgroundColor: colors.surfaceAlt }}
    >
      <Text
        className="text-[12px] uppercase tracking-[3px]"
        style={{ color: colors.secondary, fontFamily: FONTS.bodyMedium }}
      >
        Topical practice
      </Text>

      <View
        className="mt-4 rounded-[22px] border px-4 py-4"
        style={{ borderColor: colors.softBorder, backgroundColor: colors.card }}
      >
        <Text style={{ color: colors.success, fontFamily: FONTS.bodyMedium }}>
          Browse topical
        </Text>
      </View>

      <View
        className="mt-4 flex-row items-center justify-between rounded-[22px] border px-4 py-4"
        style={{ borderColor: colors.softBorder, backgroundColor: colors.surface }}
      >
        <Text style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}>
          English Language (1123)
        </Text>
        <MaterialIcons name="keyboard-arrow-down" size={22} color={colors.dim} />
      </View>

      <View className="mt-4 flex-row justify-between">
        {stats.map((item) => (
          <View
            key={item.label}
            className="w-[48.5%] rounded-[22px] border px-4 py-4"
            style={{ borderColor: colors.softBorder, backgroundColor: colors.surface }}
          >
            <Text
              className="text-[11px] uppercase tracking-[2px]"
              style={{ color: colors.dim, fontFamily: FONTS.body }}
            >
              {item.label}
            </Text>
            <Text
              className="mt-3 text-[24px]"
              style={{ color: colors.text, fontFamily: FONTS.heading }}
            >
              {item.value}
            </Text>
          </View>
        ))}
      </View>

      <View className="mt-5">
        <View className="flex-row border-b pb-3" style={{ borderColor: colors.softBorder }}>
          <Text className="flex-1" style={{ color: colors.dim, fontFamily: FONTS.bodyMedium }}>
            Topic
          </Text>
          <Text className="w-10 text-center" style={{ color: colors.dim, fontFamily: FONTS.bodyMedium }}>
            P1
          </Text>
          <Text className="w-10 text-center" style={{ color: colors.dim, fontFamily: FONTS.bodyMedium }}>
            P2
          </Text>
        </View>

        {rows.map((row) => (
          <View key={row.topic} className="flex-row py-4">
            <Text className="flex-1" style={{ color: colors.text, fontFamily: FONTS.body }}>
              {row.topic}
            </Text>
            <Text className="w-10 text-center" style={{ color: colors.muted, fontFamily: FONTS.bodyMedium }}>
              {row.p1}
            </Text>
            <Text className="w-10 text-center" style={{ color: colors.muted, fontFamily: FONTS.bodyMedium }}>
              {row.p2}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

