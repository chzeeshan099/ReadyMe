import React from "react";
import { ScrollView } from "react-native";
import AnimatedEntrance from "@/shared/components/AnimatedEntrance";
import ScreenShell from "@/shared/components/ScreenShell";
import { TopicSubjectCard, TopicsSectionHeading } from "@/modules/topics-past-paper/components/TopicsPastPaperUI";
import { TOPIC_PAST_PAPER_SUBJECTS } from "@/modules/topics-past-paper/data/topicsPastPaperData";

export default function TopicsPastPaperScreen({ navigation }) {
  return (
    <ScreenShell navigation={navigation} activeRoute="TopicsPastPaper" title="" subtitle="">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <TopicsSectionHeading
          title="Pin Your Subjects"
          subtitle="Select a subject to view available papers"
        />

        {TOPIC_PAST_PAPER_SUBJECTS.map((subject, index) => (
          <AnimatedEntrance key={subject.id} delay={50 + index * 50}>
            <TopicSubjectCard
              subject={subject}
              onPress={() =>
                navigation.navigate("TopicPastPaperTopic", {
                  subjectId: subject.id,
                })
              }
            />
          </AnimatedEntrance>
        ))}
      </ScrollView>
    </ScreenShell>
  );
}
