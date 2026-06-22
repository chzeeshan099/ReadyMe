import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CourseCard from "../../home/components/CourseCard";
import { getCourses } from "../services/course.service";
import { COLORS } from "../../../shared/constants/colors";

export default function CoursesScreen({ navigation }) {
  const courses = getCourses();

  return (
    <LinearGradient colors={COLORS.bgGradient} style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1 px-5 pt-5" showsVerticalScrollIndicator={false}>
          <Text className="text-3xl font-black text-white">Courses</Text>
          <Text className="mt-3 text-base leading-6 text-slate-300">
            Structured learning paths for school, college, and exam-focused progress.
          </Text>

          <View className="mt-6">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onPress={() => navigation.navigate("CourseDetail", { courseId: course.id })}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
