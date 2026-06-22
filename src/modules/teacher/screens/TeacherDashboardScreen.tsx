import React from "react";
import { Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuthStore } from "../../auth/store/auth.store";
import { COLORS } from "../../../shared/constants/colors";

const teacherCards = [
  { label: "Active Classes", value: "7" },
  { label: "Pending Reviews", value: "18" },
  { label: "Live Sessions", value: "2 today" },
];

export default function TeacherDashboardScreen({ navigation }) {
  const user = useAuthStore((state) => state.user);

  return (
    <LinearGradient colors={COLORS.bgGradient} style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1 px-5 pt-5" showsVerticalScrollIndicator={false}>
          <Text className="text-3xl font-black text-white">Teacher Dashboard</Text>
          <Text className="mt-3 text-base leading-6 text-slate-300">
            Welcome {user?.fullName}. Track your classes, course content, and learner engagement from one place.
          </Text>

          <View className="mt-6 flex-row flex-wrap justify-between">
            {teacherCards.map((card) => (
              <View
                key={card.label}
                className="mb-4 w-[31%] rounded-[22px] border border-white/10 bg-white/6 px-3 py-4"
              >
                <Text className="text-xs uppercase tracking-[2px] text-cyan-300">
                  {card.label}
                </Text>
                <Text className="mt-2 text-lg font-bold text-white">{card.value}</Text>
              </View>
            ))}
          </View>

          <View className="rounded-[28px] border border-white/10 bg-[#071224] p-5">
            <Text className="text-lg font-semibold text-white">Priority Actions</Text>
            <Text className="mt-3 leading-6 text-slate-300">
              Review student doubts, update weekly lesson plans, and launch AI-powered revision prompts for your classes.
            </Text>
            <View className="mt-5 flex-row gap-3">
              <Pressable
                onPress={() => navigation.navigate("Courses")}
                className="flex-1 rounded-2xl bg-blue-500 px-4 py-4"
              >
                <Text className="text-center font-bold text-white">Manage Courses</Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate("AiChat")}
                className="flex-1 rounded-2xl bg-white/10 px-4 py-4"
              >
                <Text className="text-center font-bold text-white">Use AI Tools</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
