import React, { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import ScreenShell from "@/shared/components/ScreenShell";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import { FONTS } from "@/shared/constants/colors";
import {
  ExplanationModal,
  FakeWrittenPdf,
  PdfCanvas,
  ViewerHeader,
} from "@/modules/yearly-past-paper/components/YearlyPastPaperUI";
import {
  getTopicItemById,
} from "@/modules/topics-past-paper/data/topicsPastPaperData";
import type { WrittenQuestion } from "@/modules/yearly-past-paper/data/yearlyPastPaperData";

export default function TopicWrittenPaperScreen({ navigation, route }) {
  const { colors } = useAppTheme();
  const paperData = getTopicItemById(
    route.params?.subjectId,
    route.params?.paperId,
    route.params?.itemId,
  );
  const [modalVisible, setModalVisible] = useState(false);
  const questions = paperData?.item.writtenQuestions ?? [];
  const [activeQuestion, setActiveQuestion] = useState<WrittenQuestion | null>(questions[0] ?? null);

  const paperLabel = useMemo(() => {
    if (!paperData) {
      return "Topic Paper";
    }

    return paperData.item.type === "theory" ? "Structured Paper" : "Topic Practice";
  }, [paperData]);

  if (!paperData || !activeQuestion) {
    return (
      <ScreenShell
        navigation={navigation}
        activeRoute="TopicsPastPaper"
        title="Paper Missing"
        subtitle="The requested topic written paper is not available."
      >
        <></>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell navigation={navigation} activeRoute="TopicsPastPaper" title="" subtitle="" padded={false}>
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <ViewerHeader
          title={paperLabel}
          subtitle={paperData.item.pdfTitle}
          onBack={() => navigation.goBack()}
          actions={[
            { icon: "download", label: "Download" },
            { icon: "lightbulb", label: "Answers", onPress: () => setModalVisible(true) },
          ]}
        />

        <View
          className="mt-4 rounded-[22px] border px-4 py-4"
          style={{ borderColor: colors.softBorder, backgroundColor: colors.card }}
        >
          <Text style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}>
            Active answer guide: {activeQuestion.label}
          </Text>
          <Text className="mt-2 leading-6" style={{ color: colors.muted, fontFamily: FONTS.body }}>
            {activeQuestion.explanation}
          </Text>
        </View>

        <PdfCanvas
          title={paperData.item.pdfTitle}
          topActions={[
            { icon: "download" },
            { icon: "search" },
            { icon: "more-horiz" },
            { icon: "open-in-full" },
          ]}
        >
          <FakeWrittenPdf
            subjectName={paperData.item.title}
            paperLabel={paperData.paper.title}
            questions={questions}
            activeQuestionId={activeQuestion.id}
          />
        </PdfCanvas>
      </ScrollView>

      <ExplanationModal
        visible={modalVisible}
        questions={questions}
        onClose={() => setModalVisible(false)}
        onSelectQuestion={(question) => {
          setActiveQuestion(question);
          setModalVisible(false);
        }}
      />
    </ScreenShell>
  );
}
