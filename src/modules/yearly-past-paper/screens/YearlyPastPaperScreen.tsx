import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AnimatedEntrance from "@/shared/components/AnimatedEntrance";
import ScreenShell from "@/shared/components/ScreenShell";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import { FONTS } from "@/shared/constants/colors";

type MaterialIconName = React.ComponentProps<typeof MaterialIcons>["name"];

type SubjectGroup = {
  id: string;
  label: string;
};

type PaperItem = {
  id: string;
  year: string;
  session: string;
  accent: string;
};

type GradientPair = readonly [string, string];

type SubjectItem = {
  id: string;
  name: string;
  code: string;
  group: string;
  icon: MaterialIconName;
  palette: {
    edge: string;
    glow: string;
    orb: string;
  };
  papers: PaperItem[];
};

function withAlpha(hexColor: string, alpha: string) {
  return `${hexColor}${alpha}`;
}

function getSubjectCardTheme(subject: SubjectItem, isDark: boolean) {
  return {
    background: isDark ? "rgba(14, 12, 19, 0.94)" : "#FFFDFC",
    innerBackground: isDark ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.82)",
    badgeBackground: isDark ? "rgba(255,255,255,0.06)" : withAlpha(subject.palette.edge, "18"),
    iconBackground: isDark ? "rgba(255,255,255,0.05)" : withAlpha(subject.palette.edge, "14"),
    subtitle: isDark ? "#E8DAFF" : "#6E5C84",
    shadowOpacity: isDark ? 0.24 : 0.14,
    orbTop: isDark ? subject.palette.orb : withAlpha(subject.palette.edge, "12"),
    orbBottom: isDark ? subject.palette.glow : withAlpha(subject.palette.edge, "10"),
    gradient: (isDark
      ? ["rgba(255,255,255,0.06)", "rgba(255,255,255,0.01)"]
      : ["rgba(255,255,255,0.96)", "rgba(248,241,255,0.92)"]) as GradientPair,
  };
}

function getPaperCardTheme(subject: SubjectItem, paper: PaperItem, isDark: boolean) {
  return {
    background: isDark ? "rgba(11, 10, 16, 0.97)" : "#FFFDFC",
    iconBackground: isDark ? withAlpha(paper.accent, "24") : withAlpha(paper.accent, "14"),
    codeBackground: isDark ? "rgba(255,255,255,0.05)" : withAlpha(subject.palette.edge, "12"),
    codeText: isDark ? subject.palette.edge : "#5A3A88",
    subtitle: isDark ? "#E3D8F8" : "#725E88",
    shadowOpacity: isDark ? 0.18 : 0.12,
    orbLarge: isDark ? withAlpha(paper.accent, "16") : withAlpha(paper.accent, "10"),
    orbSmall: isDark ? withAlpha(paper.accent, "2A") : withAlpha(paper.accent, "16"),
    gradient: (isDark
      ? ["rgba(255,255,255,0.05)", "rgba(255,255,255,0.01)"]
      : ["rgba(255,255,255,0.98)", "rgba(247,241,255,0.94)"]) as GradientPair,
  };
}

const SUBJECT_GROUPS: SubjectGroup[] = [
  { id: "all", label: "All Subjects" },
  { id: "commerce", label: "Commerce Book" },
  { id: "mathematics", label: "Mathematics Book" },
  { id: "languages", label: "Languages Book" },
  { id: "science", label: "Science Book" },
  { id: "humanities", label: "Humanities Book" },
];

const SUBJECTS: SubjectItem[] = [
  {
    id: "acc-7707",
    name: "Accounting",
    code: "7707",
    group: "commerce",
    icon: "calculate",
    palette: {
      edge: "#F2C08D",
      glow: "rgba(242, 192, 141, 0.22)",
      orb: "rgba(242, 192, 141, 0.14)",
    },
    papers: [
      { id: "2025-oct", year: "2025", session: "Oct/Nov", accent: "#D9DEE8" },
      { id: "2025-may", year: "2025", session: "May/June", accent: "#D9DEE8" },
      { id: "2024-oct", year: "2024", session: "Oct/Nov", accent: "#D8B4FE" },
      { id: "2024-may", year: "2024", session: "May/June", accent: "#D8B4FE" },
      { id: "2023-oct", year: "2023", session: "Oct/Nov", accent: "#F2C08D" },
      { id: "2023-may", year: "2023", session: "May/June", accent: "#F2C08D" },
      { id: "2022-oct", year: "2022", session: "Oct/Nov", accent: "#7AE7D5" },
      { id: "2022-may", year: "2022", session: "May/June", accent: "#7AE7D5" },
      { id: "2021-oct", year: "2021", session: "Oct/Nov", accent: "#8CB7FF" },
      { id: "2021-may", year: "2021", session: "May/June", accent: "#8CB7FF" },
    ],
  },
  {
    id: "add-math-4037",
    name: "Additional Mathematics",
    code: "4037",
    group: "mathematics",
    icon: "functions",
    palette: {
      edge: "#CDA4FF",
      glow: "rgba(205, 164, 255, 0.22)",
      orb: "rgba(205, 164, 255, 0.14)",
    },
    papers: [
      { id: "2025-oct", year: "2025", session: "Oct/Nov", accent: "#D9DEE8" },
      { id: "2025-may", year: "2025", session: "May/June", accent: "#D9DEE8" },
      { id: "2024-oct", year: "2024", session: "Oct/Nov", accent: "#CDA4FF" },
      { id: "2024-may", year: "2024", session: "May/June", accent: "#CDA4FF" },
      { id: "2023-oct", year: "2023", session: "Oct/Nov", accent: "#7AE7D5" },
      { id: "2023-may", year: "2023", session: "May/June", accent: "#7AE7D5" },
    ],
  },
  {
    id: "agri-5038",
    name: "Agriculture",
    code: "5038",
    group: "science",
    icon: "spa",
    palette: {
      edge: "#88D4A5",
      glow: "rgba(136, 212, 165, 0.22)",
      orb: "rgba(136, 212, 165, 0.14)",
    },
    papers: [
      { id: "2025-oct", year: "2025", session: "Oct/Nov", accent: "#D9DEE8" },
      { id: "2024-oct", year: "2024", session: "Oct/Nov", accent: "#88D4A5" },
      { id: "2024-may", year: "2024", session: "May/June", accent: "#88D4A5" },
      { id: "2023-oct", year: "2023", session: "Oct/Nov", accent: "#F2C08D" },
    ],
  },
  {
    id: "arabic-3180",
    name: "Arabic",
    code: "3180",
    group: "languages",
    icon: "translate",
    palette: {
      edge: "#B48FFF",
      glow: "rgba(180, 143, 255, 0.22)",
      orb: "rgba(180, 143, 255, 0.14)",
    },
    papers: [
      { id: "2025-oct", year: "2025", session: "Oct/Nov", accent: "#D9DEE8" },
      { id: "2025-may", year: "2025", session: "May/June", accent: "#D9DEE8" },
      { id: "2024-oct", year: "2024", session: "Oct/Nov", accent: "#D8B4FE" },
      { id: "2023-may", year: "2023", session: "May/June", accent: "#F2C08D" },
    ],
  },
  {
    id: "arabic-first-3184",
    name: "Arabic - First Language (9-1)",
    code: "3184",
    group: "languages",
    icon: "menu-book",
    palette: {
      edge: "#7AE7D5",
      glow: "rgba(122, 231, 213, 0.22)",
      orb: "rgba(122, 231, 213, 0.14)",
    },
    papers: [
      { id: "2025-oct", year: "2025", session: "Oct/Nov", accent: "#D9DEE8" },
      { id: "2024-oct", year: "2024", session: "Oct/Nov", accent: "#7AE7D5" },
      { id: "2024-may", year: "2024", session: "May/June", accent: "#7AE7D5" },
      { id: "2023-oct", year: "2023", session: "Oct/Nov", accent: "#8CB7FF" },
    ],
  },
  {
    id: "biology-5090",
    name: "Biology",
    code: "5090",
    group: "science",
    icon: "biotech",
    palette: {
      edge: "#9DD18B",
      glow: "rgba(157, 209, 139, 0.22)",
      orb: "rgba(157, 209, 139, 0.14)",
    },
    papers: [
      { id: "2025-oct", year: "2025", session: "Oct/Nov", accent: "#D9DEE8" },
      { id: "2025-may", year: "2025", session: "May/June", accent: "#D9DEE8" },
      { id: "2024-oct", year: "2024", session: "Oct/Nov", accent: "#9DD18B" },
      { id: "2024-may", year: "2024", session: "May/June", accent: "#9DD18B" },
      { id: "2023-oct", year: "2023", session: "Oct/Nov", accent: "#7AE7D5" },
      { id: "2023-may", year: "2023", session: "May/June", accent: "#7AE7D5" },
    ],
  },
  {
    id: "business-7115",
    name: "Business Studies",
    code: "7115",
    group: "commerce",
    icon: "business-center",
    palette: {
      edge: "#A6DCAD",
      glow: "rgba(166, 220, 173, 0.22)",
      orb: "rgba(166, 220, 173, 0.14)",
    },
    papers: [
      { id: "2025-oct", year: "2025", session: "Oct/Nov", accent: "#D9DEE8" },
      { id: "2025-may", year: "2025", session: "May/June", accent: "#D9DEE8" },
      { id: "2024-oct", year: "2024", session: "Oct/Nov", accent: "#A6DCAD" },
      { id: "2023-oct", year: "2023", session: "Oct/Nov", accent: "#F2C08D" },
    ],
  },
  {
    id: "bengali-3204",
    name: "Bengali",
    code: "3204",
    group: "languages",
    icon: "auto-stories",
    palette: {
      edge: "#7CA7FF",
      glow: "rgba(124, 167, 255, 0.22)",
      orb: "rgba(124, 167, 255, 0.14)",
    },
    papers: [
      { id: "2025-oct", year: "2025", session: "Oct/Nov", accent: "#D9DEE8" },
      { id: "2024-oct", year: "2024", session: "Oct/Nov", accent: "#7CA7FF" },
      { id: "2024-may", year: "2024", session: "May/June", accent: "#7CA7FF" },
      { id: "2023-may", year: "2023", session: "May/June", accent: "#CDA4FF" },
    ],
  },
  {
    id: "bangladesh-2094",
    name: "Bangladesh Studies",
    code: "2094",
    group: "humanities",
    icon: "public",
    palette: {
      edge: "#67D9D0",
      glow: "rgba(103, 217, 208, 0.22)",
      orb: "rgba(103, 217, 208, 0.14)",
    },
    papers: [
      { id: "2025-oct", year: "2025", session: "Oct/Nov", accent: "#D9DEE8" },
      { id: "2025-may", year: "2025", session: "May/June", accent: "#D9DEE8" },
      { id: "2024-oct", year: "2024", session: "Oct/Nov", accent: "#67D9D0" },
      { id: "2023-oct", year: "2023", session: "Oct/Nov", accent: "#F2C08D" },
    ],
  },
  {
    id: "biblical-2035",
    name: "Biblical Studies",
    code: "2035",
    group: "humanities",
    icon: "account-balance",
    palette: {
      edge: "#7ADDDD",
      glow: "rgba(122, 221, 221, 0.22)",
      orb: "rgba(122, 221, 221, 0.14)",
    },
    papers: [
      { id: "2025-oct", year: "2025", session: "Oct/Nov", accent: "#D9DEE8" },
      { id: "2024-oct", year: "2024", session: "Oct/Nov", accent: "#7ADDDD" },
      { id: "2024-may", year: "2024", session: "May/June", accent: "#7ADDDD" },
      { id: "2023-may", year: "2023", session: "May/June", accent: "#8CB7FF" },
    ],
  },
  {
    id: "communication-7048",
    name: "CDT: Design & Communication",
    code: "7048",
    group: "science",
    icon: "design-services",
    palette: {
      edge: "#8CB7FF",
      glow: "rgba(140, 183, 255, 0.22)",
      orb: "rgba(140, 183, 255, 0.14)",
    },
    papers: [
      { id: "2025-oct", year: "2025", session: "Oct/Nov", accent: "#D9DEE8" },
      { id: "2025-may", year: "2025", session: "May/June", accent: "#D9DEE8" },
      { id: "2024-oct", year: "2024", session: "Oct/Nov", accent: "#8CB7FF" },
      { id: "2024-may", year: "2024", session: "May/June", accent: "#8CB7FF" },
    ],
  },
];

function FilterChip({ label, active, onPress, colors, isDark }) {
  return (
    <Pressable
      onPress={onPress}
      className="mr-3 rounded-[18px] border px-4 py-3"
      style={{
        borderColor: active ? colors.primary : colors.softBorder,
        backgroundColor: active
          ? isDark
            ? "rgba(142, 97, 255, 0.22)"
            : "rgba(123, 77, 255, 0.14)"
          : isDark
            ? "rgba(255,255,255,0.04)"
            : "rgba(255,255,255,0.72)",
      }}
    >
      <Text
        style={{
          color: active ? colors.text : colors.muted,
          fontFamily: active ? FONTS.bodyMedium : FONTS.body,
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function SubjectCard({ subject, onPress, colors, isDark }) {
  const theme = getSubjectCardTheme(subject, isDark);

  return (
    <Pressable
      onPress={onPress}
      className="mb-4 overflow-hidden rounded-[28px] border"
      style={{
        borderColor: subject.palette.edge,
        backgroundColor: theme.background,
        shadowColor: subject.palette.edge,
        shadowOpacity: theme.shadowOpacity,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 12 },
        // elevation: 8,
      }}
    >
      <LinearGradient
        colors={theme.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View
          className="px-4 py-4"
          style={{
            backgroundColor: theme.innerBackground,
            borderRadius: 28,
          }}
        >
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: -38,
            right: -18,
            width: 120,
            height: 120,
            borderRadius: 999,
            backgroundColor: theme.orbTop,
          }}
        />
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            bottom: -26,
            left: -10,
            width: 84,
            height: 84,
            borderRadius: 999,
            backgroundColor: theme.orbBottom,
          }}
        />
        {/* <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            right: 16,
            height: 1,
            backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(123,77,255,0.10)",
          }}
        /> */}
        <View className="flex-row items-start justify-between">
          <View
            className="h-11 w-11 items-center justify-center rounded-2xl border"
            style={{
              borderColor: subject.palette.edge,
              backgroundColor: theme.iconBackground,
            }}
          >
            <MaterialIcons name={subject.icon} size={22} color={subject.palette.edge} />
          </View>
          <View
            className="rounded-full px-3 py-1"
            style={{ backgroundColor: theme.badgeBackground }}
          >
            <Text
              className="text-[11px]"
              style={{ color: colors.muted, fontFamily: FONTS.bodyMedium }}
            >
              {subject.group.toUpperCase()}
            </Text>
          </View>
        </View>

        <View className="mt-8">
          <Text
            className="text-[21px]"
            style={{ color: colors.text, fontFamily: FONTS.heading }}
          >
            {subject.name}
          </Text>
          <Text
            className="mt-2 text-[14px]"
            style={{ color: theme.subtitle, fontFamily: FONTS.bodyMedium }}
          >
            Code: {subject.code}
          </Text>
        </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

function PaperCard({ paper, subject, colors, isDark }) {
  const theme = getPaperCardTheme(subject, paper, isDark);

  return (
    <LinearGradient
      colors={theme.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="mb-4 overflow-hidden rounded-[30px] border px-5 py-5"
      style={{
        borderColor: paper.accent,
        backgroundColor: theme.background,
        shadowColor: paper.accent,
        shadowOpacity: theme.shadowOpacity,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 12 },
        // elevation: 8,
      }}
    >
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          right: -26,
          bottom: -20,
          width: 132,
          height: 132,
          borderRadius: 999,
          backgroundColor: theme.orbLarge,
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          right: 22,
          top: 16,
          width: 46,
          height: 46,
          borderRadius: 23,
          backgroundColor: theme.orbSmall,
        }}
      />
      {/* <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 18,
          left: 18,
          right: 18,
          height: 1,
          backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(123,77,255,0.10)",
        }}
      /> */}
      <View className="flex-row items-start justify-between">
        <View>
          <Text
            className="text-[24px]"
            style={{ color: paper.accent, fontFamily: FONTS.heading }}
          >
            {paper.year}
          </Text>
          <Text
            className="mt-2 text-[15px]"
            style={{ color: theme.subtitle, fontFamily: FONTS.bodyMedium }}
          >
            {subject.name} {subject.code}
          </Text>
        </View>

        <View
          className="h-12 w-12 items-center justify-center rounded-2xl "
          style={{
            borderColor: paper.accent,
            // backgroundColor: theme.iconBackground,
          }}
        >
          <MaterialIcons className="-ml-3" name="description" size={22} color={paper.accent} />
        </View>
      </View>

      <View className="mt-8 flex-row items-end justify-between">
        <Text
          className="text-[34px]"
          style={{ color: colors.text, fontFamily: FONTS.heading }}
        >
          {paper.session}
        </Text>

        <View
          className="rounded-[16px] border px-4 py-2"
          style={{
            borderColor: subject.palette.edge,
            backgroundColor: theme.codeBackground,
          }}
        >
          <Text style={{ color: theme.codeText, fontFamily: FONTS.bodyMedium }}>
            {subject.code}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

export default function YearlyPastPaperScreen({ navigation }) {
  const { colors, isDark } = useAppTheme();
  const [selectedGroup, setSelectedGroup] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  const selectedSubject = useMemo(
    () => SUBJECTS.find((subject) => subject.id === selectedSubjectId) ?? null,
    [selectedSubjectId],
  );

  const visibleSubjects = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return SUBJECTS.filter((subject) => {
      const matchesGroup = selectedGroup === "all" || subject.group === selectedGroup;
      const matchesSearch =
        normalizedQuery.length === 0 ||
        subject.name.toLowerCase().includes(normalizedQuery) ||
        subject.code.toLowerCase().includes(normalizedQuery);

      return matchesGroup && matchesSearch;
    });
  }, [searchQuery, selectedGroup]);

  const screenTitle = selectedSubject ? selectedSubject.name : "Yearly Past Papers";
  const screenSubtitle = selectedSubject
    ? `Code ${selectedSubject.code} ke yearly papers ko session wise cards mein browse karein.`
    : "Har subject ke yearly past papers ko subject cards, filter aur search ke saath explore karein.";

  return (
    <ScreenShell
      navigation={navigation}
      activeRoute="YearlyPastPaper"
      title={screenTitle}
      subtitle={screenSubtitle}
      rightLabel={selectedSubject ? "All Subjects" : ""}
      onRightPress={() => setSelectedSubjectId(null)}
    >
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {selectedSubject ? (
          <>
            <AnimatedEntrance delay={60}>
              <Pressable
                onPress={() => setSelectedSubjectId(null)}
                className="mb-4 flex-row items-center self-start rounded-full border px-4 py-2"
                style={{
                  borderColor: colors.softBorder,
                  backgroundColor: isDark ? colors.card : "rgba(255,255,255,0.76)",
                }}
              >
                <MaterialIcons name="west" size={16} color={colors.text} />
                <Text
                  className="ml-2"
                  style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}
                >
                  Back to subjects
                </Text>
              </Pressable>
            </AnimatedEntrance>

            <AnimatedEntrance delay={120}>
              <LinearGradient
                colors={
                  isDark
                    ? ["rgba(255,255,255,0.08)", "rgba(255,255,255,0.02)"]
                    : ["rgba(255,255,255,0.96)", "rgba(243,236,255,0.9)"]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="mb-6 rounded-[28px] border p-5 overflow-hidden"
                style={{
                  borderColor: selectedSubject.palette.edge,
                  backgroundColor: isDark ? colors.surfaceAlt : "#FFFDFE",
                  shadowColor: selectedSubject.palette.edge,
                  shadowOpacity: isDark ? 0.18 : 0.1,
                  shadowRadius: 18,
                  shadowOffset: { width: 0, height: 12 },
                  // elevation: 8,
                }}
              >
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text
                      className="text-[20px]"
                      style={{ color: colors.text, fontFamily: FONTS.heading }}
                    >
                      {selectedSubject.name}
                    </Text>
                    <Text
                      className="mt-2 text-[15px]"
                      style={{
                        color: isDark ? colors.headerMuted : colors.muted,
                        fontFamily: FONTS.bodyMedium,
                      }}
                    >
                      Subject Code: {selectedSubject.code}
                    </Text>
                  </View>

                  <View
                    className="h-14 w-14 items-center justify-center rounded-[20px] border"
                    style={{
                      borderColor: selectedSubject.palette.edge,
                      backgroundColor: isDark
                        ? `${selectedSubject.palette.edge}20`
                        : `${selectedSubject.palette.edge}14`,
                    }}
                  >
                    <MaterialIcons
                      name={selectedSubject.icon}
                      size={28}
                      color={selectedSubject.palette.edge}
                    />
                  </View>
                </View>
              </LinearGradient>
            </AnimatedEntrance>

            {selectedSubject.papers.map((paper, index) => (
              <AnimatedEntrance key={paper.id} delay={180 + index * 70}>
                <PaperCard
                  paper={paper}
                  subject={selectedSubject}
                  colors={colors}
                  isDark={isDark}
                />
              </AnimatedEntrance>
            ))}
          </>
        ) : (
          <>
            <AnimatedEntrance delay={50}>
              <LinearGradient
                colors={
                  isDark
                    ? ["rgba(255,255,255,0.08)", "rgba(255,255,255,0.02)"]
                    : ["rgba(255,255,255,0.98)", "rgba(245,239,255,0.92)"]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="overflow-hidden rounded-[28px] border px-5 py-5"
                style={{
                  borderColor: colors.border,
                  backgroundColor: isDark ? colors.surfaceAlt : "#FFFDFE",
                  shadowColor: colors.primary,
                  shadowOpacity: isDark ? 0.14 : 0.08,
                  shadowRadius: 18,
                  shadowOffset: { width: 0, height: 10 },
                  elevation: 6,
                }}
              >
                <View
                  pointerEvents="none"
                  style={{
                    position: "absolute",
                    top: -24,
                    right: -12,
                    width: 100,
                    height: 100,
                    borderRadius: 999,
                    backgroundColor: isDark
                      ? "rgba(244, 183, 255, 0.12)"
                      : "rgba(142, 97, 255, 0.08)",
                  }}
                />
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text
                      className="text-[12px] uppercase tracking-[3px]"
                      style={{ color: colors.accent, fontFamily: FONTS.bodyMedium }}
                    >
                      Subject Library
                    </Text>
                    <Text
                      className="mt-2 text-[26px]"
                      style={{ color: colors.text, fontFamily: FONTS.heading }}
                    >
                      Pick Your Subject
                    </Text>
                  </View>
                  <View
                    className="h-12 w-12 items-center justify-center rounded-[18px]"
                    style={{ backgroundColor: colors.input }}
                  >
                    <MaterialIcons name="library-books" size={24} color={colors.primary} />
                  </View>
                </View>

                <Text
                  className="mt-3 text-[14px] leading-6"
                  style={{ color: colors.muted, fontFamily: FONTS.body }}
                >
                  Filter se book wise subjects dekhein aur search box se subject name ya code se
                  jaldi find karein.
                </Text>
              </LinearGradient>
            </AnimatedEntrance>

            <AnimatedEntrance delay={110}>
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
                      colors={colors}
                      isDark={isDark}
                    />
                  ))}
                </ScrollView>
              </View>
            </AnimatedEntrance>

            <AnimatedEntrance delay={140}>
              <View
                className="mt-5 rounded-[24px] border px-4 py-1"
                style={{
                  borderColor: colors.softBorder,
                  backgroundColor: isDark ? colors.card : "rgba(255,255,255,0.86)",
                  shadowColor: colors.primary,
                  shadowOpacity: isDark ? 0.08 : 0.06,
                  shadowRadius: 14,
                  shadowOffset: { width: 0, height: 8 },
                  elevation: 4,
                }}
              >
                <View className="flex-row items-center">
                  <MaterialIcons name="search" size={20} color={colors.dim} />
                  <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search by subject name or code"
                    placeholderTextColor={colors.dim}
                    // className="ml-3 flex-1 py-4"
                    style={{ color: colors.text, fontFamily: FONTS.body }}
                  />
                </View>
              </View>
            </AnimatedEntrance>

            <View className="mt-6">
              {visibleSubjects.length ? (
                visibleSubjects.map((subject, index) => (
                  <AnimatedEntrance key={subject.id} delay={180 + index * 60}>
                    <SubjectCard
                      subject={subject}
                      onPress={() => setSelectedSubjectId(subject.id)}
                      colors={colors}
                      isDark={isDark}
                    />
                  </AnimatedEntrance>
                ))
              ) : (
                <AnimatedEntrance delay={200}>
                  <View
                    className="rounded-[26px] border px-5 py-6"
                    style={{ borderColor: colors.softBorder, backgroundColor: colors.card }}
                  >
                    <Text
                      className="text-[20px]"
                      style={{ color: colors.text, fontFamily: FONTS.heading }}
                    >
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
          </>
        )}
      </ScrollView>
    </ScreenShell>
  );
}
