import React from "react";
import { ScrollView, Text, View } from "react-native";
import ScreenShell from "@/shared/components/ScreenShell";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import { FONTS } from "@/shared/constants/colors";
import {
  TopicOutlineSection,
  TopicProgressPanel,
} from "@/modules/topics-past-paper/components/TopicsPastPaperUI";
import {
  getTopicPaperById,
  getTopicSubjectById,
  type TopicPaperItem,
} from "@/modules/topics-past-paper/data/topicsPastPaperData";

export default function TopicPastPaperCollectionScreen({ navigation, route }) {
  const { colors } = useAppTheme();
  const subject = getTopicSubjectById(route.params?.subjectId);
  const paper = getTopicPaperById(route.params?.subjectId, route.params?.paperId);

  if (!subject || !paper) {
    return (
      <ScreenShell navigation={navigation} activeRoute="TopicsPastPaper" title="Paper Missing" subtitle="">
        <View className="flex-1 items-center justify-center">
          <Text style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}>Paper not found.</Text>
        </View>
      </ScreenShell>
    );
  }

  const totalQuestions = paper.sections.reduce((sum, section) => sum + section.totalQuestions, 0);

  function openItem(item: TopicPaperItem) {
    if (item.type === "mcq") {
      navigation.navigate("TopicMcqPaper", {
        subjectId: subject.id,
        paperId: paper.id,
        itemId: item.id,
      });
      return;
    }

    navigation.navigate("TopicWrittenPaper", {
      subjectId: subject.id,
      paperId: paper.id,
      itemId: item.id,
    });
  }

  return (
    <ScreenShell navigation={navigation} activeRoute="TopicsPastPaper" title="" subtitle="" showBack>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 28 }}>
        <TopicProgressPanel totalQuestions={totalQuestions} />

        {paper.sections.map((section, index) => (
          <TopicOutlineSection
            key={section.id}
            index={index + 1}
            section={section}
            onPressItem={openItem}
          />
        ))}
      </ScrollView>
    </ScreenShell>
  );
}
