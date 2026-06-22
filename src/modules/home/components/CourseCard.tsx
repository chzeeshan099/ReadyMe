import React from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, GLOW } from "../../../shared/constants/colors";

export default function CourseCard({ course, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        ...GLOW.panel,
        borderColor: "rgba(77,145,255,0.15)",
        backgroundColor: "rgba(7,18,36,0.92)",
        shadowOpacity: 0.14,
        shadowRadius: 12,
        elevation: 5,
      }}
      className="mb-4 rounded-[28px] border px-5 py-5"
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-[18px] font-black leading-7 text-white">{course.title}</Text>
          <Text className="mt-3 text-[15px] leading-7 text-slate-300">
            {course.description}
          </Text>
        </View>
        <View
          className="h-14 w-14 items-center justify-center rounded-[18px]"
          style={{
            backgroundColor: "rgba(11,109,255,0.14)",
            borderWidth: 1,
            borderColor: "rgba(77,226,255,0.14)",
            ...GLOW.strong,
          }}
        >
          <MaterialIcons name="auto-stories" size={24} color={COLORS.primary} />
        </View>
      </View>

      <View className="mt-5 flex-row items-center justify-between">
        <View
          className="rounded-full border px-3 py-2"
          style={{ borderColor: "rgba(77,226,255,0.16)" }}
        >
          <Text className="text-[13px] font-semibold text-cyan-300">{course.level}</Text>
        </View>
        <Text className="text-[15px] font-semibold text-blue-300">View details</Text>
      </View>
    </Pressable>
  );
}
