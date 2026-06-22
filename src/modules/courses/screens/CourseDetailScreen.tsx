import React from "react";
import { ScrollView, Text, View } from "react-native";
import { getCourseById } from "@/modules/courses/services/course.service";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import ScreenShell from "@/shared/components/ScreenShell";
import Button from "@/shared/components/Button";

export default function CourseDetailScreen({ route, navigation }) {
  const course = getCourseById(route.params?.courseId);
  const user = useAuthStore((state) => state.user);

  return (
    <ScreenShell
      navigation={navigation}
      activeRoute="Courses"
      role={user?.role}
      title={course.title}
      subtitle={course.description}
      showBack
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="pb-4">
          <View className="rounded-[30px] border border-edge-soft bg-white/6 p-5 shadow-neon-sm">
            <Text className="text-sm uppercase tracking-[3px] text-blue-300">
              {course.level}
            </Text>

            <View className="mt-6 rounded-[24px] border border-edge-cyan bg-panel p-4">
              <Text className="text-lg font-semibold text-white">Course Snapshot</Text>
              <Text className="mt-3 text-slate-300">Duration: {course.duration}</Text>
              <Text className="mt-1 text-slate-300">
                AI companion support available with revision prompts and study breakdowns.
              </Text>
            </View>

            <View className="mt-6">
              <Text className="text-lg font-semibold text-white">Syllabus</Text>
              {course.syllabus.map((item) => (
                <View
                  key={item}
                  className="mt-3 rounded-2xl border border-edge-soft bg-white/6 px-4 py-3"
                >
                  <Text className="text-slate-200">{item}</Text>
                </View>
              ))}
            </View>

            <View className="mt-8">
              <Button
                title="Ask AI About This Course"
                onPress={() => navigation.navigate("AiChat", { courseTitle: course.title })}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenShell>
  );
}
