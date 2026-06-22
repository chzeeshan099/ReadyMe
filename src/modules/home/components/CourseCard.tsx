import React from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/shared/constants/colors";

export default function CourseCard({ course, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      className="mb-4 rounded-[28px] border border-edge-soft bg-panel px-5 py-5 shadow-neon-sm"
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-[18px] font-black leading-7 text-white">{course.title}</Text>
          <Text className="mt-3 text-[15px] leading-7 text-slate-300">
            {course.description}
          </Text>
        </View>
        <View className="h-14 w-14 items-center justify-center rounded-[18px] border border-edge-cyan bg-brand-blue/15 shadow-neon-cyan">
          <MaterialIcons name="auto-stories" size={24} color={COLORS.primary} />
        </View>
      </View>

      <View className="mt-5 flex-row items-center justify-between">
        <View className="rounded-full border border-edge-cyan px-3 py-2">
          <Text className="text-[13px] font-semibold text-cyan-300">{course.level}</Text>
        </View>
        <Text className="text-[15px] font-semibold text-blue-300">View details</Text>
      </View>
    </Pressable>
  );
}
