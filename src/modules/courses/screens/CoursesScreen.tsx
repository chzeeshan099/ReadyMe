import React from "react";
import { ScrollView, View } from "react-native";
import CourseCard from "../../home/components/CourseCard";
import { getCourses } from "../services/course.service";
import ScreenShell from "../../../shared/components/ScreenShell";
import { useAuthStore } from "../../auth/store/auth.store";

export default function CoursesScreen({ navigation }) {
  const courses = getCourses();
  const user = useAuthStore((state) => state.user);

  return (
    <ScreenShell
      navigation={navigation}
      activeRoute="Courses"
      role={user?.role}
      title="Courses"
      subtitle="Structured learning paths for school, college, and exam-focused progress."
      showBack
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="pb-3">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onPress={() => navigation.navigate("CourseDetail", { courseId: course.id })}
            />
          ))}
        </View>
      </ScrollView>
    </ScreenShell>
  );
}
