import React, { useEffect, useRef } from "react";
import { Animated, Pressable, ScrollView, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CourseCard from "../components/CourseCard";
import { getFeaturedCourses } from "../../courses/services/course.service";
import { useAuthStore } from "../../auth/store/auth.store";
import { COLORS, GLOW } from "../../../shared/constants/colors";
import ScreenShell from "../../../shared/components/ScreenShell";
import { formatRole } from "../../../shared/utils/helpers";

const quickLinks = [
  { label: "Courses", icon: "menu-book", route: "Courses" },
  { label: "AI Chat", icon: "forum", route: "AiChat" },
  { label: "Profile", icon: "person", route: "Profile" },
];

export default function HomeScreen({ navigation }) {
  const user = useAuthStore((state) => state.user);
  const featuredCourses = getFeaturedCourses(user);
  const float = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: 1,
          duration: 2600,
          useNativeDriver: true,
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 2600,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [float]);

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
          <Animated.View
            style={{
              borderColor: "rgba(77,145,255,0.22)",
              shadowColor: "#0B6DFF",
              shadowOpacity: 0.2,
              shadowRadius: 18,
              elevation: 8,
              transform: [
                {
                  translateY: float.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -8],
                  }),
                },
              ],
            }}
            className="rounded-[32px] border bg-[#071224] px-6 py-6"
          >
            <Text className="text-[12px] uppercase tracking-[5px] text-cyan-300">
              ReadyMe Pulse
            </Text>
            <Text className="mt-3 text-[34px] font-black leading-[40px] text-white">
              Smart learning. Real impact.
            </Text>
            <Text className="mt-4 text-[15px] leading-7 text-slate-300">
              Your dashboard is tailored around level, subjects, and a cleaner study rhythm.
            </Text>
          </Animated.View>

          <View className="mt-6 flex-row items-center justify-between">
            {quickLinks.map((item) => (
              <Pressable
                key={item.label}
                onPress={() => navigation.navigate(item.route)}
                className="w-[31.5%] rounded-[26px] border px-4 py-5"
                style={{
                  borderColor: "rgba(77,145,255,0.16)",
                  backgroundColor: "rgba(8,20,40,0.9)",
                  shadowColor: "#0B6DFF",
                  shadowOpacity: 0.12,
                  shadowRadius: 8,
                  elevation: 3,
                }}
              >
                <View
                  className="h-11 w-11 items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: COLORS.primarySoft,
                    borderWidth: 1,
                    borderColor: "rgba(77,226,255,0.14)",
                    ...GLOW.panel,
                  }}
                >
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
