import React from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FONTS } from "@/shared/constants/colors";
import { useAppTheme } from "@/core/providers/ThemeProvider";

const chips = [
  { label: "Yearly", icon: "history", route: "YearlyPastPaper" },
  { label: "Topical", icon: "topic", route: "TopicsPastPaper" },
  { label: "Notes", icon: "sticky-note-2", route: "Notes" },
  { label: "AI Usage", icon: "smart-toy", route: "AiAssistant" },
  { label: "Trends", icon: "insights", route: "Dashboard" },
  { label: "Leaderboard", icon: "leaderboard", route: "Dashboard" },
  { label: "Feedback", icon: "rate-review", route: "Feedback" },
];

export default function DashboardHubChips({ navigation }) {
  const { colors } = useAppTheme();

  return (
    <View
      className="rounded-[28px] border px-5 py-5"
      style={{ borderColor: colors.softBorder, backgroundColor: colors.card }}
    >
      <Text
        className="text-[11px] uppercase tracking-[3px]"
        style={{ color: colors.dim, fontFamily: FONTS.bodyMedium }}
      >
        Your Study Hub
      </Text>

      <View className="mt-4 flex-row flex-wrap">
        {chips.map((chip) => (
          <Pressable
            key={chip.label}
            onPress={() => navigation.navigate(chip.route)}
            className="mb-3 mr-3 flex-row items-center rounded-full border px-4 py-3"
            style={{ borderColor: colors.border, backgroundColor: colors.surface }}
          >
            <MaterialIcons name={chip.icon as any} size={16} color={colors.secondary} />
            <Text
              className="ml-2 text-[13px]"
              style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}
            >
              {chip.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

