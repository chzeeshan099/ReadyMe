import React from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getCourseById } from "../services/course.service";
import { COLORS } from "../../../shared/constants/colors";

export default function CourseDetailScreen({ route, navigation }) {
  const course = getCourseById(route.params?.courseId);

  return (
    <LinearGradient colors={COLORS.bgGradient} style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1 px-5 pt-5" showsVerticalScrollIndicator={false}>
          <View className="rounded-[30px] border border-white/10 bg-white/6 p-5">
            <Text className="text-sm uppercase tracking-[3px] text-blue-300">
              {course.level}
            </Text>
            <Text className="mt-3 text-3xl font-black text-white">{course.title}</Text>
            <Text className="mt-4 text-base leading-7 text-slate-300">
              {course.description}
            </Text>

            <View className="mt-6 rounded-[24px] bg-[#071224] p-4">
              <Text className="text-lg font-semibold text-white">Course Snapshot</Text>
              <Text className="mt-3 text-slate-300">Duration: {course.duration}</Text>
              <Text className="mt-1 text-slate-300">
                AI companion support available with revision prompts and study breakdowns.
              </Text>
            </View>

            <View className="mt-6">
              <Text className="text-lg font-semibold text-white">Syllabus</Text>
              {course.syllabus.map((item) => (
                <View key={item} className="mt-3 rounded-2xl bg-white/6 px-4 py-3">
                  <Text className="text-slate-200">{item}</Text>
                </View>
              ))}
            </View>

            <Pressable
              onPress={() => navigation.navigate("AiChat", { courseTitle: course.title })}
              className="mt-8 rounded-2xl bg-blue-500 px-5 py-4"
            >
              <Text className="text-center text-base font-bold text-white">
                Ask AI About This Course
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
