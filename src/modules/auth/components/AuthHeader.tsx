import React from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import { FONTS } from "@/shared/constants/colors";

export default function AuthHeader({
  title,
  subtitle,
  badge,
  showBack = false,
  onBack = () => {},
}) {
  const { colors } = useAppTheme();

  return (
    <LinearGradient
      colors={colors.headerGradient}
      className="rounded-[32px] px-5 py-5"
      style={{ shadowColor: colors.primary }}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-4">
          {showBack ? (
            <Pressable
              onPress={onBack}
              className="mb-4 h-11 w-11 items-center justify-center rounded-2xl border"
              style={{
                borderColor: "rgba(255,255,255,0.16)",
                backgroundColor: "rgba(255,255,255,0.10)",
              }}
            >
              <MaterialIcons name="arrow-back-ios-new" size={18} color="#FFFFFF" />
            </Pressable>
          ) : null}

          <Text
            className="text-[12px] uppercase tracking-[4px]"
            style={{ color: "#F8EDFF", fontFamily: FONTS.bodyMedium }}
          >
            {badge}
          </Text>
          <Text
            className="mt-3 text-[34px] leading-[40px]"
            style={{ color: "#FFFFFF", fontFamily: FONTS.heading }}
          >
            {title}
          </Text>
          <Text
            className="mt-3 text-[15px] leading-7"
            style={{ color: "#F1E8FF", fontFamily: FONTS.body }}
          >
            {subtitle}
          </Text>
        </View>

        <View
          className="h-14 w-14 items-center justify-center rounded-[20px]"
          style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
        >
          <MaterialIcons name="school" size={26} color="#FFFFFF" />
        </View>
      </View>
    </LinearGradient>
  );
}
