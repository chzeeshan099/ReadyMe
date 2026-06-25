import React, { useMemo, useState } from "react";
import { ScrollView } from "react-native";
import ScreenShell from "@/shared/components/ScreenShell";
import {
  FakeMcqPdf,
  McqAnswerDock,
  PdfCanvas,
  ViewerHeader,
} from "@/modules/yearly-past-paper/components/YearlyPastPaperUI";
import { getPaperVariantById, getSubjectById } from "@/modules/yearly-past-paper/data/yearlyPastPaperData";

export default function YearlyMcqPaperScreen({ navigation, route }) {
  const paperData = getPaperVariantById(
    route.params?.subjectId,
    route.params?.sessionId,
    route.params?.variantId,
  );
  const subject = getSubjectById(route.params?.subjectId);

  const mcqs = paperData?.variant.mcqs ?? [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  const currentQuestion = useMemo(() => mcqs[currentIndex], [currentIndex, mcqs]);

  if (!paperData || !subject || !currentQuestion) {
    return (
      <ScreenShell
        navigation={navigation}
        activeRoute="YearlyPastPaper"
        title="MCQ Missing"
        subtitle="Requested MCQ paper available nahi hai."
      >
        <></>
      </ScreenShell>
    );
  }

  const selectedOption = selectedAnswers[currentQuestion.id] ?? null;
  const revealAnswer = revealedAnswers[currentQuestion.id] ?? false;
  const correctCount = Object.entries(selectedAnswers).filter(([questionId, answer]) => {
    const item = mcqs.find((question) => question.id === questionId);
    return item?.correctOption === answer;
  }).length;

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
          title="Paper"
          subtitle={paperData.variant.pdfTitle}
          onBack={() => navigation.goBack()}
          actions={[
            { icon: "refresh", label: "Retake" },
            {
              icon: revealAnswer ? "visibility-off" : "visibility",
              label: "Answer",
              onPress: () =>
                setRevealedAnswers((current) => ({
                  ...current,
                  [currentQuestion.id]: !current[currentQuestion.id],
                })),
            },
            { icon: "check-circle", label: `${correctCount}` },
            { icon: "countertops", label: `${currentIndex + 1}/${mcqs.length}` },
          ]}
        />

        <PdfCanvas
          title={paperData.variant.pdfTitle}
          topActions={[
            { icon: "screen-rotation" },
            { icon: "search" },
            { icon: "download" },
          ]}
        >
          <FakeMcqPdf questions={mcqs} currentQuestionId={currentQuestion.id} />
        </PdfCanvas>

        <McqAnswerDock
          currentNumber={currentIndex + 1}
          total={mcqs.length}
          selectedOption={selectedOption}
          revealAnswer={revealAnswer}
          question={currentQuestion}
          onSelect={(option) =>
            setSelectedAnswers((current) => ({
              ...current,
              [currentQuestion.id]: option,
            }))
          }
          onToggleReveal={() =>
            setRevealedAnswers((current) => ({
              ...current,
              [currentQuestion.id]: !current[currentQuestion.id],
            }))
          }
          onNext={() => setCurrentIndex((current) => (current + 1 < mcqs.length ? current + 1 : current))}
        />
      </ScrollView>
    </ScreenShell>
  );
}
