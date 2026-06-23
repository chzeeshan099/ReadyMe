import React from "react";
import { ScrollView, Text, View } from "react-native";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import ScreenShell from "@/shared/components/ScreenShell";
import Button from "@/shared/components/Button";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import { FONTS } from "@/shared/constants/colors";
import AnimatedEntrance from "@/shared/components/AnimatedEntrance";

const teacherCards = [
  { label: "Active Classes", value: "7" },
  { label: "Pending Reviews", value: "18" },
  { label: "Live Sessions", value: "2 today" },
];

export default function TeacherDashboardScreen({ navigation }) {
  const user = useAuthStore((state) => state.user);
  const { colors } = useAppTheme();

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
            {teacherCards.map((card, index) => (
              <AnimatedEntrance key={card.label} delay={50 + index * 70} style={{ width: "31%" }}>
                <View
                  className="mb-4 rounded-[22px] border px-3 py-4"
                  style={{ borderColor: colors.softBorder, backgroundColor: colors.card }}
                >
                  <Text
                    className="text-xs uppercase tracking-[2px]"
                    style={{ color: colors.secondary, fontFamily: FONTS.bodyMedium }}
                  >
                    {card.label}
                  </Text>
                  <Text
                    className="mt-2 text-lg"
                    style={{ color: colors.text, fontFamily: FONTS.heading }}
                  >
                    {card.value}
                  </Text>
                </View>
              </AnimatedEntrance>
            ))}
          </View>

          <AnimatedEntrance delay={220}>
            <View
              className="rounded-[28px] border p-5 shadow-neon-sm"
              style={{ borderColor: colors.softBorder, backgroundColor: colors.surface }}
            >
              <Text style={{ color: colors.text, fontFamily: FONTS.bodyMedium, fontSize: 18 }}>
                Priority Actions
              </Text>
              <Text
                className="mt-3 leading-6"
                style={{ color: colors.muted, fontFamily: FONTS.body }}
              >
                Review student doubts, update weekly lesson plans, and launch AI-powered
                revision prompts for your classes.
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
          </AnimatedEntrance>
        </View>
      </ScrollView>
    </ScreenShell>
  );
}

