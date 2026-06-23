import React from "react";
import { ScrollView, View } from "react-native";
import AnimatedEntrance from "@/shared/components/AnimatedEntrance";
import ScreenShell from "@/shared/components/ScreenShell";
import {
  DashboardCalendarCard,
  DashboardCountdownCard,
  DashboardFeedbackCard,
  DashboardHero,
  DashboardHubChips,
  DashboardPlanCard,
  DashboardPracticeCard,
  DashboardTasksCard,
} from "@/modules/dashboard/components";

export default function DashboardScreen({ navigation }) {
  return (
    <ScreenShell
      navigation={navigation}
      activeRoute="Dashboard"
      title="Coordinate Assistant"
      subtitle="Your new study dashboard with cleaner focus and better flow."
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="pb-6">
          <AnimatedEntrance delay={40}>
            <DashboardHero />
          </AnimatedEntrance>

          <AnimatedEntrance delay={120} style={{ marginTop: 16 }}>
            <DashboardPlanCard />
          </AnimatedEntrance>

          <AnimatedEntrance delay={190} style={{ marginTop: 16 }}>
            <DashboardHubChips navigation={navigation} />
          </AnimatedEntrance>

          <AnimatedEntrance delay={250} style={{ marginTop: 16 }}>
            <DashboardFeedbackCard navigation={navigation} />
          </AnimatedEntrance>

          <AnimatedEntrance delay={320} style={{ marginTop: 16 }}>
            <DashboardPracticeCard />
          </AnimatedEntrance>

          <AnimatedEntrance delay={390} style={{ marginTop: 16 }}>
            <DashboardCountdownCard />
          </AnimatedEntrance>

          <AnimatedEntrance delay={460} style={{ marginTop: 16 }}>
            <DashboardCalendarCard />
          </AnimatedEntrance>

          <AnimatedEntrance delay={530} style={{ marginTop: 16 }}>
            <DashboardTasksCard />
          </AnimatedEntrance>
        </View>
      </ScrollView>
    </ScreenShell>
  );
}
