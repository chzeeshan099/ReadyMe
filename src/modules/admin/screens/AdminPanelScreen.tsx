import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import ScreenShell from "@/shared/components/ScreenShell";
import Button from "@/shared/components/Button";

const adminMetrics = [
  { label: "Users Online", value: "386" },
  { label: "New Signups", value: "54" },
  { label: "Support Flags", value: "6" },
  { label: "Teacher Requests", value: "11" },
];

export default function AdminPanelScreen({ navigation }) {
  const user = useAuthStore((state) => state.user);

  return (
    <ScreenShell
      navigation={navigation}
      activeRoute="AdminPanel"
      role={user?.role}
      title="Admin Control"
      subtitle={`Welcome ${user?.fullName}. Monitor growth, moderation, and content operations from one control panel.`}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="pb-4">
          <View className="mt-1 flex-row flex-wrap justify-between">
            {adminMetrics.map((metric) => (
              <View
                key={metric.label}
                className="mb-4 w-[48%] rounded-[24px] border bg-white/6 p-4"
                style={{ borderColor: "rgba(77,145,255,0.18)" }}
              >
                <Text className="text-xs uppercase tracking-[2px] text-blue-300">
                  {metric.label}
                </Text>
                <Text className="mt-2 text-2xl font-black text-white">{metric.value}</Text>
              </View>
            ))}
          </View>

          <View
            className="rounded-[28px] border bg-[#071224] p-5"
            style={{
              borderColor: "rgba(77,145,255,0.18)",
              shadowColor: "#0B6DFF",
              shadowOpacity: 0.16,
              shadowRadius: 16,
              elevation: 7,
            }}
          >
            <Text className="text-lg font-semibold text-white">Admin Actions</Text>
            <Text className="mt-3 leading-6 text-slate-300">
              Review registrations by role, inspect course quality, and manage educator onboarding from a cleaner control center.
            </Text>
            <View className="mt-5 gap-3">
              <Button title="Review Courses" onPress={() => navigation.navigate("Courses")} />
              <Button
                title="Admin Profile"
                onPress={() => navigation.navigate("Profile")}
                variant="secondary"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </ScreenShell>
  );
}
