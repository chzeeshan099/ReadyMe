import React, { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import CourseCard from "../components/CourseCard";
import { getFeaturedCourses } from "../../courses/services/course.service";
import { useAuthStore } from "../../auth/store/auth.store";
import { COLORS } from "../../../shared/constants/colors";
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
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 2500,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [float]);

  return (
    <LinearGradient colors={COLORS.bgGradient} style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
          <View className="pt-6 pb-10">
            <Text className="text-sm uppercase tracking-[4px] text-blue-300">
              ReadyMe Student Space
            </Text>
            <Text className="mt-3 text-4xl font-black text-white">
              The future of education, in your hands.
            </Text>
            <Text className="mt-4 text-base leading-7 text-slate-300">
              Welcome {user?.fullName}. You are signed in as a {formatRole(user?.role)}.
              Your dashboard is tailored around your level, subjects, and study rhythm.
            </Text>

            <Animated.View
              style={{
                transform: [
                  {
                    translateY: float.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, -12],
                    }),
                  },
                ],
              }}
              className="mt-8 rounded-[30px] border border-blue-400/20 bg-[#071224] p-5"
            >
              <Text className="text-xs uppercase tracking-[4px] text-cyan-300">
                ReadyMe Pulse
              </Text>
              <Text className="mt-3 text-2xl font-bold text-white">
                Smart learning. Real impact.
              </Text>
              <Text className="mt-3 text-sm leading-6 text-slate-300">
                Daily AI support, guided practice, and progress-friendly course
                design inspired by the visual direction you shared.
              </Text>
            </Animated.View>

            <View className="mt-8 flex-row flex-wrap justify-between">
              {quickLinks.map((item) => (
                <Pressable
                  key={item.label}
                  onPress={() => navigation.navigate(item.route)}
                  className="mb-4 w-[31%] rounded-[24px] border border-white/10 bg-white/6 p-4"
                >
                  <MaterialIcons name={item.icon as any} size={24} color={COLORS.primary} />
                  <Text className="mt-4 font-semibold text-white">{item.label}</Text>
                </Pressable>
              ))}
            </View>

            <View className="mt-4 flex-row items-center justify-between">
              <Text className="text-2xl font-bold text-white">Featured Courses</Text>
              <Pressable onPress={() => navigation.navigate("Courses")}>
                <Text className="font-semibold text-blue-300">See all</Text>
              </Pressable>
            </View>

            <View className="mt-4">
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
      </SafeAreaView>
    </LinearGradient>
  );
}
