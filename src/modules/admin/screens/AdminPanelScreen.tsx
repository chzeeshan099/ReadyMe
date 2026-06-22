import React from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuthStore } from "../../auth/store/auth.store";
import { COLORS } from "../../../shared/constants/colors";

const adminMetrics = [
  { label: "Users Online", value: "386" },
  { label: "New Signups", value: "54" },
  { label: "Support Flags", value: "6" },
  { label: "Teacher Requests", value: "11" },
];

export default function AdminPanelScreen({ navigation }) {
  const user = useAuthStore((state) => state.user);

  return (
    <LinearGradient colors={COLORS.bgGradient} style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1 px-5 pt-5" showsVerticalScrollIndicator={false}>
          <Text className="text-3xl font-black text-white">Admin Control</Text>
          <Text className="mt-3 text-base leading-6 text-slate-300">
            Welcome {user?.fullName}. This panel is separate from student and teacher areas so admins can monitor growth, moderation, and content operations.
          </Text>

          <View className="mt-6 flex-row flex-wrap justify-between">
            {adminMetrics.map((metric) => (
              <View
                key={metric.label}
                className="mb-4 w-[48%] rounded-[24px] border border-white/10 bg-white/6 p-4"
              >
                <Text className="text-xs uppercase tracking-[2px] text-blue-300">
                  {metric.label}
                </Text>
                <Text className="mt-2 text-2xl font-black text-white">{metric.value}</Text>
              </View>
            ))}
          </View>

          <View className="rounded-[28px] border border-white/10 bg-[#071224] p-5">
            <Text className="text-lg font-semibold text-white">Admin Actions</Text>
            <Text className="mt-3 leading-6 text-slate-300">
              Review registrations by role, inspect course quality, and manage educator onboarding from a cleaner control center.
            </Text>

            <View className="mt-5 gap-3">
              <Pressable
                onPress={() => navigation.navigate("Courses")}
                className="rounded-2xl bg-blue-500 px-4 py-4"
              >
                <Text className="text-center font-bold text-white">Review Courses</Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate("Profile")}
                className="rounded-2xl bg-white/10 px-4 py-4"
              >
                <Text className="text-center font-bold text-white">Admin Profile</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
