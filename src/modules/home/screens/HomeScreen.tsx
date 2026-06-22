import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CourseCard from "@/modules/home/components/CourseCard";
import { getFeaturedCourses } from "@/modules/courses/services/course.service";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { COLORS } from "@/shared/constants/colors";
import ScreenShell from "@/shared/components/ScreenShell";
import { formatRole } from "@/shared/utils/helpers";

const quickLinks = [
  { label: "Courses", icon: "menu-book", route: "Courses" },
  { label: "AI Chat", icon: "forum", route: "AiChat" },
  { label: "Profile", icon: "person", route: "Profile" },
];

export default function HomeScreen({ navigation }) {
  const user = useAuthStore((state) => state.user);
  const featuredCourses = getFeaturedCourses(user);

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
          <View className="rounded-[32px] border border-edge-soft bg-panel px-6 py-6 shadow-neon-md">
            <Text className="text-[12px] uppercase tracking-[5px] text-cyan-300">
              ReadyMe Pulse
            </Text>
            <Text className="mt-3 text-[34px] font-black leading-[40px] text-white">
              Smart learning. Real impact.
            </Text>
            <Text className="mt-4 text-[15px] leading-7 text-slate-300">
              Your dashboard is tailored around level, subjects, and a cleaner study rhythm.
            </Text>
          </View>

          <View className="mt-6 flex-row items-center justify-between">
            {quickLinks.map((item) => (
              <Pressable
                key={item.label}
                onPress={() => navigation.navigate(item.route)}
                className="w-[31.5%] rounded-[26px] border border-edge-soft bg-panel px-4 py-5 shadow-neon-sm"
              >
                <View className="h-11 w-11 items-center justify-center rounded-2xl border border-edge-cyan bg-brand-blue/15 shadow-neon-sm">
                  <MaterialIcons name={item.icon as any} size={20} color={COLORS.cyan} />
                </View>
                <Text className="mt-5 text-[17px] font-bold text-white">{item.label}</Text>
                <Text className="mt-1 text-[12px] text-slate-400">Open</Text>
              </Pressable>
            ))}
          </View>

          <View className="mt-8 flex-row items-center justify-between">
            <Text className="text-[30px] font-black tracking-[-0.8px] text-white">
              Featured Courses
            </Text>
            <Pressable onPress={() => navigation.navigate("Courses")}>
              <Text className="font-semibold text-blue-300">See all</Text>
            </Pressable>
          </View>

          <View className="mt-4 pb-2">
            {featuredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onPress={() => navigation.navigate("CourseDetail", { courseId: course.id })}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenShell>
  );
}
