import React from "react";
import { Pressable, Text, View } from "react-native";
import { FONTS } from "@/shared/constants/colors";
import { useAppTheme } from "@/core/providers/ThemeProvider";

export default function DashboardFeedbackCard({ navigation }) {
  const { colors } = useAppTheme();

  return (
    <View
      className="rounded-[28px] border px-5 py-5"
      style={{ borderColor: colors.softBorder, backgroundColor: colors.surface }}
    >
      <Text
        className="text-[22px]"
        style={{ color: colors.text, fontFamily: FONTS.heading }}
      >
        Help us improve - share your feedback
      </Text>
      <Text
        className="mt-3 text-[14px] leading-6"
        style={{ color: colors.muted, fontFamily: FONTS.body }}
      >
        Share quick feedback or report an issue. It takes under a minute.
      </Text>
      <Pressable
        onPress={() => navigation.navigate("Feedback")}
        className="mt-4 rounded-2xl border px-4 py-3"
        style={{ borderColor: colors.border, backgroundColor: colors.input }}
      >
        <Text style={{ color: colors.secondary, fontFamily: FONTS.bodyMedium }}>
          Leave feedback
        </Text>
      </Pressable>
    </View>
  );
}

