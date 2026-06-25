import React, { useMemo, useState } from "react";
import { ScrollView, StatusBar, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import {
  FakeMcqPdf,
  McqAnswerDock,
  PdfCanvas,
  ViewerHeader,
} from "@/modules/yearly-past-paper/components/YearlyPastPaperUI";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import { getPaperVariantById, getSubjectById } from "@/modules/yearly-past-paper/data/yearlyPastPaperData";

export default function YearlyMcqPaperScreen({ navigation, route }) {
  const { colors, isDark } = useAppTheme();
  const insets = useSafeAreaInsets();
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
      <LinearGradient colors={colors.bgGradient} className="flex-1">
        <SafeAreaView className="flex-1">
          <View className="flex-1 items-center justify-center px-6">
            <StatusBar
              backgroundColor={colors.header}
              barStyle={isDark ? "light-content" : "dark-content"}
            />
            <ViewerHeader
              title="MCQ Missing"
              subtitle="Requested MCQ paper available nahi hai."
              onBack={() => navigation.goBack()}
              actions={[]}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
    );
  }

  const selectedOption = selectedAnswers[currentQuestion.id] ?? null;
  const revealAnswer = revealedAnswers[currentQuestion.id] ?? false;
  const correctCount = Object.entries(selectedAnswers).filter(([questionId, answer]) => {
    const item = mcqs.find((question) => question.id === questionId);
    return item?.correctOption === answer;
  }).length;

  return (
    <LinearGradient colors={colors.bgGradient} className="flex-1">
      <SafeAreaView className="flex-1" edges={["top", "left", "right", "bottom"]}>
        <StatusBar
          backgroundColor={colors.header}
          barStyle={isDark ? "light-content" : "dark-content"}
        />
        <View className="flex-1 pt-3">
          <View className="px-4">
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
          </View>

          <ScrollView
            className="flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 16,
              paddingBottom: 320 + Math.max(insets.bottom, 0),
            }}
          >
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
          </ScrollView>

        </View>
      </SafeAreaView>

      <View
        pointerEvents="box-none"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          justifyContent: "flex-end",
          paddingHorizontal: 16,
          paddingBottom: Math.max(insets.bottom, 8),
          zIndex: 2000,
          elevation: 40,
        }}
      >
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
          onNext={() =>
            setCurrentIndex((current) => (current + 1 < mcqs.length ? current + 1 : current))
          }
          fixed
          containerStyle={{
            marginTop: 0,
          }}
        />
      </View>
    </LinearGradient>
  );
}
