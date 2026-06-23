import React from "react";
import { Pressable, Text } from "react-native";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import { FONTS } from "@/shared/constants/colors";

export default function AuthOptionChip({ active, label, onPress, rounded = "full" }) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      className={rounded === "large" ? "rounded-2xl px-4 py-3" : "rounded-full px-4 py-3"}
      style={{
        borderWidth: active ? 1 : 0,
        borderColor: colors.border,
        backgroundColor: active ? colors.primary : colors.input,
      }}
    >
      <Text
        style={{
          color: active ? "#FFFFFF" : colors.text,
          fontFamily: FONTS.bodyMedium,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

