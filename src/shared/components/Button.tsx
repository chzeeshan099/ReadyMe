import React from "react";
import { Pressable, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FONTS } from "@/shared/constants/colors";
import { useAppTheme } from "@/core/providers/ThemeProvider";

export default function Button({ title, onPress, disabled = false, variant = "primary" }) {
  const { colors, isDark } = useAppTheme();
  const isPrimary = variant === "primary";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`overflow-hidden rounded-2xl ${isPrimary ? "shadow-neon-cyan" : "shadow-neon-sm"} ${disabled ? "opacity-60" : ""}`}
    >
      <LinearGradient
        colors={
          isPrimary
            ? colors.primaryGradient
            : isDark
              ? ["rgba(255,255,255,0.12)", "rgba(255,255,255,0.05)"]
              : ["rgba(123,77,255,0.12)", "rgba(123,77,255,0.05)"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="border px-5 py-4"
        style={{
          borderColor: isPrimary ? colors.border : colors.softBorder,
        }}
      >
        <Text
          className="text-center text-base font-bold"
          style={{ color: isPrimary || isDark ? "#FFFFFF" : colors.primaryDeep, fontFamily: FONTS.bodyMedium }}
        >
          {title}
        </Text>
      </LinearGradient>
    </Pressable>
  );
}
