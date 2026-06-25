import React, { useMemo, useState } from "react";
import { ScrollView, View, Text } from "react-native";
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
  getPaperVariantById,
  getSubjectById,
  type WrittenQuestion,
} from "@/modules/yearly-past-paper/data/yearlyPastPaperData";

export default function YearlyWrittenPaperScreen({ navigation, route }) {
  const { colors } = useAppTheme();
  const paperData = getPaperVariantById(
    route.params?.subjectId,
    route.params?.sessionId,
    route.params?.variantId,
  );
  const subject = getSubjectById(route.params?.subjectId);
  const [modalVisible, setModalVisible] = useState(false);
  const questions = paperData?.variant.writtenQuestions ?? [];
  const [activeQuestion, setActiveQuestion] = useState<WrittenQuestion | null>(questions[0] ?? null);

  const paperLabel = useMemo(() => {
    if (!paperData) {
      return "Paper";
    }

    if (paperData.variant.type === "practical") {
      return "Practical Test";
    }

    if (paperData.variant.type === "alternative") {
      return "Alternative to Practical";
    }

    return "Theory";
  }, [paperData]);

  if (!paperData || !subject || !activeQuestion) {
    return (
      <ScreenShell
        navigation={navigation}
        activeRoute="YearlyPastPaper"
        title="Paper Missing"
        subtitle="Requested written paper available nahi hai."
      >
        <></>
      </ScreenShell>
    );
  }

  return (
    <ScreenShell
      navigation={navigation}
      activeRoute="YearlyPastPaper"
      title=""
      subtitle=""
      padded={false}
    >
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <ViewerHeader
          title={paperLabel}
          subtitle={paperData.variant.pdfTitle}
          onBack={() => navigation.goBack()}
          actions={[
            { icon: "download", label: "Download" },
            { icon: "lightbulb", label: "Explanation", onPress: () => setModalVisible(true) },
          ]}
        />

        <View
          className="mt-4 rounded-[22px] border px-4 py-4"
          style={{ borderColor: colors.softBorder, backgroundColor: colors.card }}
        >
          <Text style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}>
            Active question: {activeQuestion.label}
          </Text>
          <Text className="mt-2 leading-6" style={{ color: colors.muted, fontFamily: FONTS.body }}>
            {activeQuestion.explanation}
          </Text>
        </View>

        <PdfCanvas
          title={paperData.variant.pdfTitle}
          topActions={[
            { icon: "download" },
            { icon: "search" },
            { icon: "more-horiz" },
            { icon: "open-in-full" },
          ]}
        >
          <FakeWrittenPdf
            subjectName={subject.name}
            paperLabel={paperData.variant.label}
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
