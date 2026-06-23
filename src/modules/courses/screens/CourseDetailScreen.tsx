import React from "react";
import { ScrollView, Text, View } from "react-native";
import { getCourseById } from "@/modules/courses/services/course.service";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import ScreenShell from "@/shared/components/ScreenShell";
import Button from "@/shared/components/Button";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import { FONTS } from "@/shared/constants/colors";
import AnimatedEntrance from "@/shared/components/AnimatedEntrance";

export default function CourseDetailScreen({ route, navigation }) {
  const course = getCourseById(route.params?.courseId);
  const user = useAuthStore((state) => state.user);
  const { colors } = useAppTheme();

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
          <AnimatedEntrance delay={70}>
            <View
              className="rounded-[30px] border p-5 shadow-neon-sm"
              style={{ borderColor: colors.softBorder, backgroundColor: colors.card }}
            >
              <Text
                className="text-sm uppercase tracking-[3px]"
                style={{ color: colors.primary, fontFamily: FONTS.bodyMedium }}
              >
                {course.level}
              </Text>

              <View
                className="mt-6 rounded-[24px] border p-4"
                style={{ borderColor: colors.border, backgroundColor: colors.surface }}
              >
                <Text
                  className="text-lg"
                  style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}
                >
                  Course Snapshot
                </Text>
                <Text className="mt-3" style={{ color: colors.muted, fontFamily: FONTS.body }}>
                  Duration: {course.duration}
                </Text>
                <Text className="mt-1" style={{ color: colors.muted, fontFamily: FONTS.body }}>
                  AI companion support available with revision prompts and study breakdowns.
                </Text>
              </View>

              <View className="mt-6">
                <Text
                  className="text-lg"
                  style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}
                >
                  Syllabus
                </Text>
                {course.syllabus.map((item, index) => (
                  <AnimatedEntrance key={item} delay={120 + index * 60}>
                    <View
                      className="mt-3 rounded-2xl border px-4 py-3"
                      style={{ borderColor: colors.softBorder, backgroundColor: colors.surface }}
                    >
                      <Text style={{ color: colors.text, fontFamily: FONTS.body }}>{item}</Text>
                    </View>
                  </AnimatedEntrance>
                ))}
              </View>

              <View className="mt-8">
                <Button
                  title="Ask AI About This Course"
                  onPress={() => navigation.navigate("AiChat", { courseTitle: course.title })}
                />
              </View>
            </View>
          </AnimatedEntrance>
        </View>
      </ScrollView>
    </ScreenShell>
  );
}

