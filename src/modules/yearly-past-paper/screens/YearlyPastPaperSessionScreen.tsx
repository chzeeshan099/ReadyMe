import React from "react";
import { ScrollView } from "react-native";
import AnimatedEntrance from "@/shared/components/AnimatedEntrance";
import ScreenShell from "@/shared/components/ScreenShell";
import {
  PaperSectionBlock,
  ResourceBlock,
  SessionHero,
} from "@/modules/yearly-past-paper/components/YearlyPastPaperUI";
import {
  getSessionById,
  getSubjectById,
  type PaperVariant,
} from "@/modules/yearly-past-paper/data/yearlyPastPaperData";

export default function YearlyPastPaperSessionScreen({ navigation, route }) {
  const subject = getSubjectById(route.params?.subjectId);
  const session = getSessionById(route.params?.subjectId, route.params?.sessionId);

  if (!subject || !session) {
    return (
      <ScreenShell
        navigation={navigation}
        activeRoute="YearlyPastPaper"
        title="Paper Set Missing"
        subtitle="Requested session data available nahi hai."
      >
        <></>
      </ScreenShell>
    );
  }

  function openVariant(variant: PaperVariant) {
    if (variant.type === "mcq") {
      navigation.navigate("YearlyMcqPaper", {
        subjectId: subject.id,
        sessionId: session.id,
        variantId: variant.id,
      });
      return;
    }

    navigation.navigate("YearlyWrittenPaper", {
      subjectId: subject.id,
      sessionId: session.id,
      variantId: variant.id,
    });
  }

  return (
    <ScreenShell
      navigation={navigation}
      activeRoute="YearlyPastPaper"
      title={`${session.session} ${session.year}`}
      subtitle={`${subject.name} four paper parts grouped cards available below.`}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <AnimatedEntrance delay={50}>
          <SessionHero subject={subject} session={session} onBack={() => navigation.goBack()} />
        </AnimatedEntrance>

        {session.paperGroups.map((group, index) => (
          <AnimatedEntrance key={group.id} delay={110 + index * 70}>
            <PaperSectionBlock section={group} onOpenVariant={openVariant} />
          </AnimatedEntrance>
        ))}

        {session.resources.map((resource, index) => (
          <AnimatedEntrance key={resource.id} delay={420 + index * 40}>
            <ResourceBlock label={resource.label} fileName={resource.fileName} />
          </AnimatedEntrance>
        ))}
      </ScrollView>
    </ScreenShell>
  );
}
