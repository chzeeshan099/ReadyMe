import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import ScreenShell from "@/shared/components/ScreenShell";
import Button from "@/shared/components/Button";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import { FONTS } from "@/shared/constants/colors";
import AnimatedEntrance from "@/shared/components/AnimatedEntrance";

const adminMetrics = [
  { label: "Users Online", value: "386" },
  { label: "New Signups", value: "54" },
  { label: "Support Flags", value: "6" },
  { label: "Teacher Requests", value: "11" },
];

export default function AdminPanelScreen({ navigation }) {
  const user = useAuthStore((state) => state.user);
  const { colors } = useAppTheme();

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
            {adminMetrics.map((metric, index) => (
              <AnimatedEntrance key={metric.label} delay={50 + index * 70} style={{ width: "48%" }}>
                <View
                  className="mb-4 rounded-[24px] border p-4"
                  style={{ borderColor: colors.softBorder, backgroundColor: colors.card }}
                >
                  <Text
                    className="text-xs uppercase tracking-[2px]"
                    style={{ color: colors.primary, fontFamily: FONTS.bodyMedium }}
                  >
                    {metric.label}
                  </Text>
                  <Text
                    className="mt-2 text-2xl"
                    style={{ color: colors.text, fontFamily: FONTS.heading }}
                  >
                    {metric.value}
                  </Text>
                </View>
              </AnimatedEntrance>
            ))}
          </View>

          <AnimatedEntrance delay={240}>
            <View
              className="rounded-[28px] border p-5 shadow-neon-sm"
              style={{ borderColor: colors.softBorder, backgroundColor: colors.surface }}
            >
              <Text style={{ color: colors.text, fontFamily: FONTS.bodyMedium, fontSize: 18 }}>
                Admin Actions
              </Text>
              <Text
                className="mt-3 leading-6"
                style={{ color: colors.muted, fontFamily: FONTS.body }}
              >
                Review registrations by role, inspect course quality, and manage educator
                onboarding from a cleaner control center.
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
          </AnimatedEntrance>
        </View>
      </ScrollView>
    </ScreenShell>
  );
}
