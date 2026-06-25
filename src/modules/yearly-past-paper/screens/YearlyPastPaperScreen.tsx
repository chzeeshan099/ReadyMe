import React, { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import AnimatedEntrance from "@/shared/components/AnimatedEntrance";
import ScreenShell from "@/shared/components/ScreenShell";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import { FONTS } from "@/shared/constants/colors";
import {
  FilterChip,
  SearchCard,
  SubjectCard,
  SubjectHeroCard,
} from "@/modules/yearly-past-paper/components/YearlyPastPaperUI";
import {
  SUBJECT_GROUPS,
  YEARLY_SUBJECTS,
  type SubjectGroupId,
} from "@/modules/yearly-past-paper/data/yearlyPastPaperData";

export default function YearlyPastPaperScreen({ navigation }) {
  const { colors } = useAppTheme();
  const [selectedGroup, setSelectedGroup] = useState<SubjectGroupId>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const visibleSubjects = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return YEARLY_SUBJECTS.filter((subject) => {
      const matchesGroup = selectedGroup === "all" || subject.group === selectedGroup;
      const matchesSearch =
        normalizedQuery.length === 0 ||
        subject.name.toLowerCase().includes(normalizedQuery) ||
        subject.code.toLowerCase().includes(normalizedQuery);

      return matchesGroup && matchesSearch;
    });
  }, [searchQuery, selectedGroup]);

  return (
    <ScreenShell
      navigation={navigation}
      activeRoute="YearlyPastPaper"
      title="Yearly Past Papers"
      subtitle="Har subject ke yearly past papers ko subject cards, filter aur search ke saath explore karein."
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        <AnimatedEntrance delay={40}>
          <SubjectHeroCard />
        </AnimatedEntrance>

        <AnimatedEntrance delay={90}>
          <View className="mt-5">
            <Text
              className="mb-3 text-[13px] uppercase tracking-[2px]"
              style={{ color: colors.headerMuted, fontFamily: FONTS.bodyMedium }}
            >
              Filter by Book
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {SUBJECT_GROUPS.map((group) => (
                <FilterChip
                  key={group.id}
                  label={group.label}
                  active={selectedGroup === group.id}
                  onPress={() => setSelectedGroup(group.id)}
                />
              ))}
            </ScrollView>
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={130}>
          <SearchCard value={searchQuery} onChangeText={setSearchQuery} />
        </AnimatedEntrance>

        <View className="mt-6">
          {visibleSubjects.length ? (
            visibleSubjects.map((subject, index) => (
              <AnimatedEntrance key={subject.id} delay={170 + index * 60}>
                <SubjectCard
                  subject={subject}
                  onPress={() =>
                    navigation.navigate("YearlyPastPaperSubject", {
                      subjectId: subject.id,
                    })
                  }
                />
              </AnimatedEntrance>
            ))
          ) : (
            <AnimatedEntrance delay={190}>
              <View
                className="rounded-[26px] border px-5 py-6"
                style={{ borderColor: colors.softBorder, backgroundColor: colors.card }}
              >
                <Text className="text-[20px]" style={{ color: colors.text, fontFamily: FONTS.heading }}>
                  No subjects found
                </Text>
                <Text
                  className="mt-2 text-[14px] leading-6"
                  style={{ color: colors.muted, fontFamily: FONTS.body }}
                >
                  Search ya filter change karke dobara try karein.
                </Text>
              </View>
            </AnimatedEntrance>
          )}
        </View>
      </ScrollView>
    </ScreenShell>
  );
}
