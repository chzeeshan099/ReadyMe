import React from "react";
import { ScrollView, View } from "react-native";
import CourseCard from "@/modules/home/components/CourseCard";
import { getCourses } from "@/modules/courses/services/course.service";
import ScreenShell from "@/shared/components/ScreenShell";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import AnimatedEntrance from "@/shared/components/AnimatedEntrance";

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
          {courses.map((course, index) => (
            <AnimatedEntrance key={course.id} delay={60 + index * 70}>
              <CourseCard
                course={course}
                onPress={() => navigation.navigate("CourseDetail", { courseId: course.id })}
              />
            </AnimatedEntrance>
          ))}
        </View>
      </ScrollView>
    </ScreenShell>
  );
}

