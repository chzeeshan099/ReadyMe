import React from "react";
import { ScrollView, Text, View } from "react-native";
import AnimatedEntrance from "@/shared/components/AnimatedEntrance";
import ScreenShell from "@/shared/components/ScreenShell";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import { FONTS } from "@/shared/constants/colors";
import { getSubjectById } from "@/modules/yearly-past-paper/data/yearlyPastPaperData";
import { SessionCard } from "@/modules/yearly-past-paper/components/YearlyPastPaperUI";

export default function YearlyPastPaperSubjectScreen({ navigation, route }) {
  const { colors } = useAppTheme();
  const subject = getSubjectById(route.params?.subjectId);

  if (!subject) {
    return (
      <ScreenShell
        navigation={navigation}
        activeRoute="YearlyPastPaper"
        title="Subject Missing"
        subtitle="Requested subject data available nahi hai."
      >
        <View className="flex-1 items-center justify-center">
          <Text style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}>
            Subject not found.
          </Text>
        </View>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell
      navigation={navigation}
      activeRoute="YearlyPastPaper"
      title={subject.name}
      subtitle={`Code ${subject.code} yearly sessions open any paper.`}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        {subject.sessions.map((session, index) => (
          <AnimatedEntrance key={session.id} delay={60 + index * 70}>
            <SessionCard
              subject={subject}
              session={session}
              onPress={() =>
                navigation.navigate("YearlyPastPaperSession", {
                  subjectId: subject.id,
                  sessionId: session.id,
                })
              }
            />
          </AnimatedEntrance>
        ))}
      </ScrollView>
    </ScreenShell>
  );
}
