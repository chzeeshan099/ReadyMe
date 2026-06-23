import React from "react";
import { Text, View } from "react-native";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import { FONTS } from "@/shared/constants/colors";

export default function AuthCard({ title, children }) {
  const { colors } = useAppTheme();

  return (
    <View
      className="mt-6 rounded-[30px] border p-5"
      style={{ borderColor: colors.softBorder, backgroundColor: colors.surface }}
    >
      {title ? (
        <Text
          className="mb-4 text-[12px] uppercase tracking-[3px]"
          style={{ color: colors.primary, fontFamily: FONTS.bodyMedium }}
        >
          {title}
        </Text>
      ) : null}
      {children}
    </View>
  );
}

