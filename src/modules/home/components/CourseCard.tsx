import React from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../../shared/constants/colors";

export default function CourseCard({ course, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      className="mb-4 rounded-[24px] border border-white/10 bg-white/6 p-4"
    >
      <View className="flex-row items-start justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-lg font-bold text-white">{course.title}</Text>
          <Text className="mt-2 text-sm leading-6 text-slate-300">
            {course.description}
          </Text>
        </View>
        <View
          className="h-12 w-12 items-center justify-center rounded-2xl"
          style={{ backgroundColor: COLORS.primarySoft }}
        >
          <MaterialIcons name="auto-stories" size={24} color={COLORS.primary} />
        </View>
      </View>

      <View className="mt-4 flex-row items-center justify-between">
        <Text className="text-sm text-cyan-300">{course.level}</Text>
        <Text className="text-sm font-semibold text-blue-300">
          View details
        </Text>
      </View>
    </Pressable>
  );
}
