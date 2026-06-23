import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CourseCard from "@/modules/home/components/CourseCard";
import { getFeaturedCourses } from "@/modules/courses/services/course.service";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { FONTS } from "@/shared/constants/colors";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import ScreenShell from "@/shared/components/ScreenShell";
import { formatRole } from "@/shared/utils/helpers";
import AnimatedEntrance from "@/shared/components/AnimatedEntrance";

const quickLinks = [
  { label: "Courses", icon: "menu-book", route: "Courses" },
  { label: "AI Chat", icon: "forum", route: "AiChat" },
  { label: "Profile", icon: "person", route: "Profile" },
];

export default function HomeScreen({ navigation }) {
  const user = useAuthStore((state) => state.user);
  const featuredCourses = getFeaturedCourses(user);
  const { colors } = useAppTheme();

  return (
    <ScreenShell
      navigation={navigation}
      activeRoute="Home"
      role={user?.role}
      title="Future-ready learning."
      subtitle={`Welcome ${user?.fullName}. You are signed in as a ${formatRole(user?.role)}.`}
      rightLabel="Explore"
      onRightPress={() => navigation.navigate("Courses")}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="pb-4">
          <AnimatedEntrance delay={50}>
            <View
              className="rounded-[32px] border px-6 py-6 shadow-neon-md"
              style={{ borderColor: colors.border, backgroundColor: colors.surfaceAlt }}
            >
            <Text
              className="text-[12px] uppercase tracking-[5px]"
              style={{ color: colors.accent, fontFamily: FONTS.bodyMedium }}
            >
              ReadyMe Pulse
            </Text>
            <Text
              className="mt-3 text-[34px] leading-[40px]"
              style={{ color: colors.text, fontFamily: FONTS.heading }}
            >
              Smart learning. Real impact.
            </Text>
            <Text
              className="mt-4 text-[15px] leading-7"
              style={{ color: colors.muted, fontFamily: FONTS.body }}
            >
              Your dashboard is tailored around level, subjects, and a cleaner study rhythm.
            </Text>
            </View>
          </AnimatedEntrance>

          <View className="mt-6 flex-row items-center justify-between">
            {quickLinks.map((item, index) => (
              <AnimatedEntrance key={item.label} delay={120 + index * 70} style={{ width: "31.5%" }}>
                <Pressable
                  onPress={() => navigation.navigate(item.route)}
                  className="rounded-[26px] border px-4 py-5 shadow-neon-sm"
                  style={{ borderColor: colors.softBorder, backgroundColor: colors.surface }}
                >
                  <View
                    className="h-11 w-11 items-center justify-center rounded-2xl shadow-neon-sm"
                    style={{ backgroundColor: colors.input }}
                  >
                    <MaterialIcons name={item.icon as any} size={20} color={colors.primary} />
                  </View>
                  <Text
                    className="mt-5 text-[17px]"
                    style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}
                  >
                    {item.label}
                  </Text>
                  <Text
                    className="mt-1 text-[12px]"
                    style={{ color: colors.dim, fontFamily: FONTS.body }}
                  >
                    Open
                  </Text>
                </Pressable>
              </AnimatedEntrance>
            ))}
          </View>

          <View className="mt-8 flex-row items-center justify-between">
            <Text
              className="text-[30px] tracking-[-0.8px]"
              style={{ color: colors.text, fontFamily: FONTS.heading }}
            >
              Featured Courses
            </Text>
            <Pressable onPress={() => navigation.navigate("Courses")}>
              <Text style={{ color: colors.primary, fontFamily: FONTS.bodyMedium }}>See all</Text>
            </Pressable>
          </View>

          <View className="mt-4 pb-2">
            {featuredCourses.map((course, index) => (
              <AnimatedEntrance key={course.id} delay={220 + index * 70}>
                <CourseCard
                  course={course}
                  onPress={() => navigation.navigate("CourseDetail", { courseId: course.id })}
                />
              </AnimatedEntrance>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenShell>
  );
}
