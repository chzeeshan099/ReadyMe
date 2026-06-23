import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import { FONTS } from "@/shared/constants/colors";

export default function Loader({ text = "Loading...", fullScreen = false }) {
  const { colors } = useAppTheme();

  return (
    <View
      className={`items-center justify-center ${fullScreen ? "flex-1" : "py-6"}`}
      style={{ backgroundColor: fullScreen ? colors.background : "transparent" }}
    >
      <ActivityIndicator size="large" color={colors.primary} />
      <Text
        className="mt-3 text-sm"
        style={{ color: colors.muted, fontFamily: FONTS.body }}
      >
        {text}
      </Text>
    </View>
  );
}
