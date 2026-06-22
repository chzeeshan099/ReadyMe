import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import ScreenShell from "@/shared/components/ScreenShell";
import Button from "@/shared/components/Button";

const teacherCards = [
  { label: "Active Classes", value: "7" },
  { label: "Pending Reviews", value: "18" },
  { label: "Live Sessions", value: "2 today" },
];

export default function TeacherDashboardScreen({ navigation }) {
  const user = useAuthStore((state) => state.user);

  return (
    <ScreenShell
      navigation={navigation}
      activeRoute="TeacherDashboard"
      role={user?.role}
      title="Teacher Dashboard"
      subtitle={`Welcome ${user?.fullName}. Track classes, course content, and learner engagement from one place.`}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="pb-4">
          <View className="mt-1 flex-row flex-wrap justify-between">
            {teacherCards.map((card) => (
              <View
                key={card.label}
                className="mb-4 w-[31%] rounded-[22px] border border-edge-soft bg-white/6 px-3 py-4"
              >
                <Text className="text-xs uppercase tracking-[2px] text-cyan-300">
                  {card.label}
                </Text>
                <Text className="mt-2 text-lg font-bold text-white">{card.value}</Text>
              </View>
            ))}
          </View>

          <View className="rounded-[28px] border border-edge-soft bg-panel p-5 shadow-neon-sm">
            <Text className="text-lg font-semibold text-white">Priority Actions</Text>
            <Text className="mt-3 leading-6 text-slate-300">
              Review student doubts, update weekly lesson plans, and launch AI-powered revision prompts for your classes.
            </Text>
            <View className="mt-5 flex-row gap-3">
              <View className="flex-1">
                <Button title="Manage Courses" onPress={() => navigation.navigate("Courses")} />
              </View>
              <View className="flex-1">
                <Button
                  title="Use AI Tools"
                  onPress={() => navigation.navigate("AiChat")}
                  variant="secondary"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenShell>
  );
}
