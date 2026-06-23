import React from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import { FONTS } from "@/shared/constants/colors";

export default function CourseCard({ course, onPress }) {
  const { colors } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      className="mb-4 rounded-[28px] border px-5 py-5 shadow-neon-sm"
      style={{ borderColor: colors.softBorder, backgroundColor: colors.surface }}
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text
            className="text-[18px] leading-7"
            style={{ color: colors.text, fontFamily: FONTS.heading }}
          >
            {course.title}
          </Text>
          <Text
            className="mt-3 text-[15px] leading-7"
            style={{ color: colors.muted, fontFamily: FONTS.body }}
          >
            {course.description}
          </Text>
        </View>
        <View
          className="h-14 w-14 items-center justify-center rounded-[18px]"
          style={{ backgroundColor: colors.input }}
        >
          <MaterialIcons name="auto-stories" size={24} color={colors.primary} />
        </View>
      </View>

      <View className="mt-5 flex-row items-center justify-between">
        <View
          className="rounded-full border px-3 py-2"
          style={{ borderColor: colors.border, backgroundColor: colors.card }}
        >
          <Text style={{ color: colors.secondary, fontFamily: FONTS.bodyMedium }}>
            {course.level}
          </Text>
        </View>
        <Text style={{ color: colors.primary, fontFamily: FONTS.bodyMedium }}>
          View details
        </Text>
      </View>
    </Pressable>
  );
}

