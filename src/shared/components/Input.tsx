import React from "react";
import { Text, TextInput, View } from "react-native";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import { FONTS } from "@/shared/constants/colors";

export default function Input({ label, error, ...props }) {
  const { colors } = useAppTheme();

  return (
    <View>
      {label ? (
        <Text
          className="mb-2 text-sm"
          style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}
        >
          {label}
        </Text>
      ) : null}
      <TextInput
        placeholderTextColor={colors.dim}
        style={{
          borderRadius: 18,
          borderWidth: 1,
          borderColor: error ? colors.danger : colors.softBorder,
          backgroundColor: colors.input,
          color: colors.text,
          paddingHorizontal: 16,
          paddingVertical: 14,
          fontFamily: FONTS.body,
        }}
        {...props}
      />
      {error ? (
        <Text
          className="mt-2 text-sm"
          style={{ color: colors.danger, fontFamily: FONTS.body }}
        >
          {error}
        </Text>
      ) : null}
    </View>
  );
}
