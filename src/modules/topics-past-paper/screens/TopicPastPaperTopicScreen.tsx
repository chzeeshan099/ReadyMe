import React from "react";
import { ScrollView, Text, View } from "react-native";
import AnimatedEntrance from "@/shared/components/AnimatedEntrance";
import ScreenShell from "@/shared/components/ScreenShell";
import { TopicPaperCard, TopicsSectionHeading } from "@/modules/topics-past-paper/components/TopicsPastPaperUI";
import { getTopicSubjectById } from "@/modules/topics-past-paper/data/topicsPastPaperData";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import { FONTS } from "@/shared/constants/colors";

const paperIcons = {
  "paper-1": "shuffle",
  "paper-2": "shuffle",
  "paper-3": "shuffle",
  "paper-4": "shuffle",
} as const;

export default function TopicPastPaperTopicScreen({ navigation, route }) {
  const { colors } = useAppTheme();
  const subject = getTopicSubjectById(route.params?.subjectId);

  if (!subject) {
    return (
      <ScreenShell navigation={navigation} activeRoute="TopicsPastPaper" title="Subject Missing" subtitle="">
        <View className="flex-1 items-center justify-center">
          <Text style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}>Subject not found.</Text>
        </View>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell navigation={navigation} activeRoute="TopicsPastPaper" title="" subtitle="" showBack>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <TopicsSectionHeading
          title="Choose Paper"
          subtitle={`Available papers for ${subject.code}`}
        />

        {subject.papers.map((paper, index) => (
          <AnimatedEntrance key={paper.id} delay={50 + index * 50}>
            <TopicPaperCard
              paper={paper}
              icon={paperIcons[paper.id] ?? "menu-book"}
              onPress={() =>
                navigation.navigate("TopicPastPaperCollection", {
                  subjectId: subject.id,
                  paperId: paper.id,
                })
              }
            />
          </AnimatedEntrance>
        ))}
      </ScrollView>
    </ScreenShell>
  );
}
