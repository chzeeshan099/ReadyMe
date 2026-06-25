import React from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import { FONTS } from "@/shared/constants/colors";
import type {
  McqQuestion,
  PaperSection,
  PaperVariant,
  SubjectItem,
  SubjectSession,
  WrittenQuestion,
} from "@/modules/yearly-past-paper/data/yearlyPastPaperData";

type GradientPair = readonly [string, string];

function alpha(hexColor: string, opacity: string) {
  return `${hexColor}${opacity}`;
}

function cardGradient(isDark: boolean): GradientPair {
  return isDark
    ? ["rgba(255,255,255,0.06)", "rgba(255,255,255,0.01)"]
    : ["rgba(255,255,255,0.98)", "rgba(245,239,255,0.92)"];
}

export function FilterChip({ label, active, onPress }) {
  const { colors, isDark } = useAppTheme();

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
            : "rgba(255,255,255,0.74)",
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

export function SearchCard({ value, onChangeText }) {
  const { colors, isDark } = useAppTheme();

  return (
    <View
      className="mt-5 rounded-[24px] border px-4 py-1"
      style={{
        borderColor: colors.softBorder,
        backgroundColor: isDark ? colors.card : "rgba(255,255,255,0.88)",
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
          value={value}
          onChangeText={onChangeText}
          placeholder="Search by subject name or code"
          placeholderTextColor={colors.dim}
          // className="ml-3 flex-1 py-4"
          style={{ color: colors.text, fontFamily: FONTS.body }}
        />
      </View>
    </View>
  );
}

export function SubjectHeroCard() {
  const { colors, isDark } = useAppTheme();

  return (
    <LinearGradient
      colors={cardGradient(isDark)}
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
        // elevation: 6,
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
          backgroundColor: isDark ? "rgba(244, 183, 255, 0.12)" : "rgba(142, 97, 255, 0.08)",
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
        Filter se book wise subjects dekhein aur search box se subject name ya code se jaldi
        find karein.
      </Text>
    </LinearGradient>
  );
}

export function SubjectCard({ subject, onPress }: { subject: SubjectItem; onPress: () => void }) {
  const { colors, isDark } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      className="mb-4 overflow-hidden rounded-[28px] border"
      style={{
        borderColor: subject.palette.edge,
        backgroundColor: isDark ? "rgba(14, 12, 19, 0.94)" : "#FFFDFC",
        shadowColor: subject.palette.edge,
        shadowOpacity: isDark ? 0.24 : 0.14,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 12 },
        // elevation: 8,
      }}
    >
      <LinearGradient colors={cardGradient(isDark)} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <View className="px-4 py-4">
          <View
            pointerEvents="none"
            style={{
              position: "absolute",
              top: -38,
              right: -18,
              width: 120,
              height: 120,
              borderRadius: 999,
              backgroundColor: isDark ? subject.palette.orb : alpha(subject.palette.edge, "12"),
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
              backgroundColor: isDark ? subject.palette.glow : alpha(subject.palette.edge, "10"),
            }}
          />
          <View className="flex-row items-start justify-between">
            <View
              className="h-11 w-11 items-center justify-center rounded-2xl border"
              style={{
                borderColor: subject.palette.edge,
                backgroundColor: isDark ? "rgba(255,255,255,0.05)" : alpha(subject.palette.edge, "14"),
              }}
            >
              <MaterialIcons name={subject.icon} size={22} color={subject.palette.edge} />
            </View>
            <View
              className="rounded-full px-3 py-1"
              style={{
                backgroundColor: isDark ? "rgba(255,255,255,0.06)" : alpha(subject.palette.edge, "18"),
              }}
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
            <Text className="text-[21px]" style={{ color: colors.text, fontFamily: FONTS.heading }}>
              {subject.name}
            </Text>
            <Text
              className="mt-2 text-[14px]"
              style={{ color: isDark ? "#E8DAFF" : "#6E5C84", fontFamily: FONTS.bodyMedium }}
            >
              Code: {subject.code}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

export function SessionCard({
  subject,
  session,
  onPress,
}: {
  subject: SubjectItem;
  session: SubjectSession;
  onPress: () => void;
}) {
  const { colors, isDark } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      className="mb-4 overflow-hidden rounded-[30px] border"
      style={{
        borderColor: session.accent,
        backgroundColor: isDark ? "rgba(11, 10, 16, 0.97)" : "#FFFDFC",
        shadowColor: session.accent,
        shadowOpacity: isDark ? 0.18 : 0.1,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 12 },
      }}
    >
      <LinearGradient colors={cardGradient(isDark)} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <View className="px-5 py-5">
          <View
            pointerEvents="none"
            style={{
              position: "absolute",
              right: -24,
              bottom: -24,
              width: 130,
              height: 130,
              borderRadius: 999,
              backgroundColor: isDark ? alpha(session.accent, "16") : alpha(session.accent, "10"),
            }}
          />
          <View className="flex-row items-start justify-between">
            <View>
              <Text className="text-[26px]" style={{ color: session.accent, fontFamily: FONTS.heading }}>
                {session.year}
              </Text>
              <Text
                className="mt-2 text-[14px]"
                style={{ color: isDark ? colors.headerMuted : colors.muted, fontFamily: FONTS.bodyMedium }}
              >
                {subject.name} {subject.code}
              </Text>
            </View>
            <View
              className="rounded-full border px-3 py-2"
              style={{
                borderColor: session.accent,
                backgroundColor: isDark ? alpha(session.accent, "22") : alpha(session.accent, "12"),
              }}
            >
              <Text style={{ color: session.accent, fontFamily: FONTS.bodyMedium }}>
                {session.difficulty}
              </Text>
            </View>
          </View>
          <View className="mt-8 flex-row items-end justify-between">
            <Text className="text-[33px]" style={{ color: colors.text, fontFamily: FONTS.heading }}>
              {session.session}
            </Text>
            <View
              className="rounded-[16px] border px-4 py-2"
              style={{
                borderColor: subject.palette.edge,
                backgroundColor: isDark ? "rgba(255,255,255,0.05)" : alpha(subject.palette.edge, "12"),
              }}
            >
              <Text
                style={{
                  color: isDark ? subject.palette.edge : "#5A3A88",
                  fontFamily: FONTS.bodyMedium,
                }}
              >
                {session.paperGroups.length} Parts
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

export function SessionHero({
  subject,
  session,
  onBack,
}: {
  subject: SubjectItem;
  session: SubjectSession;
  onBack: () => void;
}) {
  const { colors, isDark } = useAppTheme();

  return (
    <LinearGradient
      colors={cardGradient(isDark)}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="overflow-hidden rounded-[28px] border p-5"
      style={{
        borderColor: subject.palette.edge,
        backgroundColor: isDark ? colors.surfaceAlt : "#FFFDFE",
      }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-2xl" style={{ color: colors.text, fontFamily: FONTS.heading }}>
            {subject.code} {subject.name}
          </Text>
          <Text
            className="mt-2 text-[15px]"
            style={{ color: isDark ? colors.headerMuted : colors.muted, fontFamily: FONTS.bodyMedium }}
          >
            {session.session} {session.year} Question Paper and Mark Scheme
          </Text>
        </View>
        <View
          className="h-14 w-14 items-center justify-center rounded-[20px] border"
          style={{
            borderColor: subject.palette.edge,
            backgroundColor: isDark ? alpha(subject.palette.edge, "20") : alpha(subject.palette.edge, "14"),
          }}
        >
          <MaterialIcons name={subject.icon} size={28} color={subject.palette.edge} />
        </View>
      </View>

      <View className="mt-5 flex-row gap-3">
        <ActionPill icon="download" label="Download All" wide />
        <ActionPill icon="west" label="Back" onPress={onBack} />
      </View>

      <View className="mt-5 flex-row items-center">
        <Text style={{ color: colors.muted, fontFamily: FONTS.bodyMedium }}>Difficulty:</Text>
        <DifficultyBadge label={session.difficulty} />
      </View>
    </LinearGradient>
  );
}

function DifficultyBadge({ label }: { label: string }) {
  const { isDark } = useAppTheme();
  const colorMap = {
    Easy: "#3EA86A",
    Moderate: "#B49349",
    Hard: "#C96B52",
  };

  return (
    <View
      className="ml-3 rounded-full px-4 py-2"
      style={{
        backgroundColor: isDark
          ? alpha(colorMap[label] || "#7B4DFF", "22")
          : alpha(colorMap[label] || "#7B4DFF", "16"),
      }}
    >
      <Text style={{ color: colorMap[label] || "#7B4DFF", fontFamily: FONTS.bodyMedium }}>{label}</Text>
    </View>
  );
}

export function ActionPill({
  icon,
  label,
  onPress = () => {},
  wide = false,
}: {
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  label: string;
  onPress?: () => void;
  wide?: boolean;
}) {
  const { colors, isDark } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      className={`rounded-[18px] border px-4 py-3 ${wide ? "flex-1" : ""}`}
      style={{
        borderColor: colors.softBorder,
        backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.82)",
      }}
    >
      <View className="flex-row items-center justify-center">
        <MaterialIcons name={icon} size={18} color={colors.text} />
        <Text className="ml-2" style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

export function PaperSectionBlock({
  section,
  onOpenVariant,
}: {
  section: PaperSection;
  onOpenVariant: (variant: PaperVariant) => void;
}) {
  const { colors } = useAppTheme();

  return (
    <View className="mt-8">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-[18px]" style={{ color: colors.text, fontFamily: FONTS.heading }}>
          {section.title}
        </Text>
        <Pressable
          className="rounded-[18px] border px-4 py-3"
          style={{ borderColor: colors.softBorder, backgroundColor: colors.card }}
        >
          <View className="flex-row items-center">
            <MaterialIcons name="push-pin" size={16} color={colors.text} />
            <Text className="ml-2" style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}>
              Pin
            </Text>
          </View>
        </Pressable>
      </View>

      <View className="flex-row flex-wrap justify-between">
        {section.variants.map((variant) => (
          <PaperVariantCard
            key={variant.id}
            variant={variant}
            accent={section.accent}
            onPress={() => onOpenVariant(variant)}
          />
        ))}
      </View>
    </View>
  );
}

export function PaperVariantCard({
  variant,
  accent,
  onPress,
}: {
  variant: PaperVariant;
  accent: string;
  onPress: () => void;
}) {
  const { colors, isDark } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      className="mb-4 w-[48.5%] overflow-hidden rounded-[22px] border p-3"
      style={{
        borderColor: accent,
        backgroundColor: isDark ? alpha(accent, "22") : alpha(accent, "10"),
      }}
    >
      <Text style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}>{variant.grade}</Text>
      <View className="mt-3 flex-row items-center justify-between">
        <Text className="text-[18px]" style={{ color: colors.text, fontFamily: FONTS.heading }}>
          {variant.label}
        </Text>
        <View className="h-4 w-4 rounded-full bg-white" />
      </View>
      <View className="mt-4 flex-row flex-wrap">
        {variant.badges.map((badge) => (
          <View
            key={badge}
            className="mr-2 rounded-[12px] border px-2 py-1"
            style={{ borderColor: alpha(accent, "66"), backgroundColor: alpha(accent, "18") }}
          >
            <Text style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}>{badge}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}

export function ResourceBlock({ label, fileName }: { label: string; fileName: string }) {
  const { colors } = useAppTheme();

  return (
    <View className="mt-8">
      <Text className="text-[28px]" style={{ color: colors.text, fontFamily: FONTS.heading }}>
        Resources & other documents
      </Text>
      <View className="mt-4">
        <Text className="text-[21px]" style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}>
          {label}
        </Text>
        <View className="mt-3 flex-row items-center">
          <MaterialIcons name="download" size={18} color={colors.secondary} />
          <Text className="ml-2 underline" style={{ color: colors.secondary, fontFamily: FONTS.body }}>
            {fileName}
          </Text>
        </View>
      </View>
    </View>
  );
}

export function ViewerHeader({
  title,
  subtitle,
  actions,
  onBack,
}: {
  title: string;
  subtitle?: string;
  actions: { icon: React.ComponentProps<typeof MaterialIcons>["name"]; label: string; onPress?: () => void }[];
  onBack: () => void;
}) {
  const { colors, isDark } = useAppTheme();

  return (
    <View
      className="rounded-[26px] border p-4"
      style={{
        borderColor: colors.softBorder,
        backgroundColor: isDark ? "#1D2637" : "#EEF3FF",
      }}
    >
      <View className="flex-row items-start justify-between">
        <Pressable
          onPress={onBack}
          className="rounded-[18px] border px-4 py-3"
          style={{ borderColor: colors.softBorder, backgroundColor: isDark ? "#151C2A" : "#FFFFFF" }}
        >
          <View className="flex-row items-center">
            <MaterialIcons name="west" size={18} color={colors.text} />
            <Text className="ml-2" style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}>
              Back
            </Text>
          </View>
        </Pressable>

        <View className="ml-3 flex-1">
          <Text className="text-[30px]" style={{ color: colors.text, fontFamily: FONTS.heading }}>
            {title}
          </Text>
          {subtitle ? (
            <Text className="mt-1" style={{ color: colors.muted, fontFamily: FONTS.body }}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>

      <View className="mt-4 flex-row flex-wrap">
        {actions.map((action) => (
          <Pressable
            key={action.label}
            onPress={action.onPress}
            className="mb-2 mr-2 rounded-[16px] border px-4 py-3"
            style={{
              borderColor: colors.softBorder,
              backgroundColor: isDark ? "#151C2A" : "#FFFFFF",
            }}
          >
            <View className="flex-row items-center">
              <MaterialIcons name={action.icon} size={18} color={colors.text} />
              <Text className="ml-2" style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}>
                {action.label}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export function PdfCanvas({
  title,
  children,
  topActions,
}: {
  title: string;
  children: React.ReactNode;
  topActions: { icon: React.ComponentProps<typeof MaterialIcons>["name"]; onPress?: () => void }[];
}) {
  const { colors, isDark } = useAppTheme();

  return (
    <View
      className="mt-4 overflow-hidden rounded-[28px] border"
      style={{
        borderColor: colors.softBorder,
        backgroundColor: isDark ? "#FCFCFE" : "#FFFFFF",
      }}
    >
      <View
        className="flex-row items-center justify-between border-b px-4 py-3"
        style={{ borderColor: isDark ? "#EAE8F5" : "#EEE8F7" }}
      >
        <Text style={{ color: "#1F1A2B", fontFamily: FONTS.bodyMedium }}>{title}</Text>
        <View className="flex-row">
          {topActions.map((action, index) => (
            <Pressable key={`${action.icon}-${index}`} onPress={action.onPress} className="ml-3">
              <MaterialIcons name={action.icon} size={24} color="#4B5563" />
            </Pressable>
          ))}
        </View>
      </View>
      <View className="bg-white px-5 py-6">{children}</View>
    </View>
  );
}

export function FakeMcqPdf({
  questions,
  currentQuestionId,
}: {
  questions: McqQuestion[];
  currentQuestionId?: string;
}) {
  return (
    <View>
      <Text className="text-right text-[38px]" style={{ color: "#C6C6D0", fontFamily: FONTS.heading }}>
        2
      </Text>
      <Text className="mt-1 text-[14px]" style={{ color: "#6B7280", fontFamily: FONTS.bodyMedium }}>
        Multiple Choice Paper Preview
      </Text>
      <View className="mt-5">
        {questions.map((question, index) => {
          const isActive = question.id === currentQuestionId;

          return (
            <View
              key={question.id}
              className="mb-5 rounded-[18px] px-3 py-3"
              style={{ backgroundColor: isActive ? "#F7E9D8" : "transparent" }}
            >
              <Text
                className="text-[19px]"
                style={{ color: "#1B1B22", fontFamily: FONTS.bodyMedium }}
              >
                {index + 1}. {question.prompt}
              </Text>
              <View className="mt-4">
                {question.options.map((option) => (
                  <View key={option.key} className="mb-3 flex-row">
                    <Text
                      className="mr-3 text-[18px]"
                      style={{ color: "#111827", fontFamily: FONTS.bodyMedium }}
                    >
                      {option.key}
                    </Text>
                    <Text
                      className="flex-1 text-[17px] leading-7"
                      style={{ color: "#1F2937", fontFamily: FONTS.body }}
                    >
                      {option.text}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export function FakeWrittenPdf({
  subjectName,
  paperLabel,
  questions,
  activeQuestionId,
}: {
  subjectName: string;
  paperLabel: string;
  questions: WrittenQuestion[];
  activeQuestionId?: string;
}) {
  return (
    <View>
      <Text className="text-right text-[38px]" style={{ color: "#C6C6D0", fontFamily: FONTS.heading }}>
        2
      </Text>
      <Text className="mt-1 text-[14px]" style={{ color: "#6B7280", fontFamily: FONTS.bodyMedium }}>
        {subjectName} {paperLabel}
      </Text>
      {questions.map((question) => {
        const isActive = question.id === activeQuestionId;

        return (
          <View
            key={question.id}
            className="mt-6 rounded-[18px] px-3 py-3"
            style={{ backgroundColor: isActive ? "#EEF3FF" : "transparent" }}
          >
            <Text className="text-[22px]" style={{ color: "#111827", fontFamily: FONTS.heading }}>
              {question.label}
            </Text>
            <Text className="mt-3 text-[17px] leading-7" style={{ color: "#1F2937", fontFamily: FONTS.body }}>
              {question.prompt}
            </Text>
            <View className="mt-5 rounded-[18px] border px-4 py-4" style={{ borderColor: "#E5E7EB" }}>
              <Text style={{ color: "#6B7280", fontFamily: FONTS.bodyMedium }}>
                Answer space preview
              </Text>
              <Text
                className="mt-3 text-[16px] leading-7"
                style={{ color: "#4B5563", fontFamily: FONTS.body }}
              >
               Students can mentally prepare their answers here. Click the Explanation button for AI guidance.
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
}

export function McqAnswerDock({
  currentNumber,
  total,
  selectedOption,
  revealAnswer,
  question,
  onSelect,
  onToggleReveal,
  onNext,
  containerStyle,
  fixed = false,
}: {
  currentNumber: number;
  total: number;
  selectedOption: string | null;
  revealAnswer: boolean;
  question: McqQuestion;
  onSelect: (option: string) => void;
  onToggleReveal: () => void;
  onNext: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  fixed?: boolean;
}) {
  const { colors, isDark } = useAppTheme();

  function getOptionColors(optionKey: string) {
    const isSelected = selectedOption === optionKey;
    const isCorrect = question.correctOption === optionKey;

    if (revealAnswer && isCorrect) {
      return { backgroundColor: "#D6F5DF", borderColor: "#22A45D", textColor: "#166534" };
    }

    if (revealAnswer && isSelected && !isCorrect) {
      return { backgroundColor: "#FBE0E0", borderColor: "#DC2626", textColor: "#991B1B" };
    }

    if (isSelected) {
      return {
        backgroundColor: isDark ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.92)",
        borderColor: colors.primary,
        textColor: colors.text,
      };
    }

    return {
      backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.72)",
      borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(96,81,131,0.12)",
      textColor: colors.text,
    };
  }

  return (
    <View
      className={`${fixed ? "" : "mt-4"} rounded-[28px] border p-4 `}
      style={[
        {
          borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(96,81,131,0.10)",
          backgroundColor: isDark ? "#5D3A2D" : "#7B4DFF",
        },
        containerStyle,
      ]}
    >
      <View className="flex-row items-center justify-between">
        <View className="rounded-[16px] bg-black/70 px-4 py-3">
          <Text className="text-xs text-white" style={{ fontFamily: FONTS.heading }}>
            {currentNumber}
          </Text>
        </View>
        <View className="flex-row items-center">
          <Pressable
            onPress={onToggleReveal}
            className="mr-3 rounded-[16px] border px-2 py-2"
            style={{ borderColor: "rgba(255,255,255,0.18)", backgroundColor: "rgba(0,0,0,0.24)" }}
          >
            <MaterialIcons name={revealAnswer ? "visibility-off" : "visibility"} size={12} color="#FFFFFF" />
          </Pressable>
          <Pressable
            onPress={onNext}
            className="rounded-[16px] border px-2 py-2"
            style={{ borderColor: "rgba(255,255,255,0.18)", backgroundColor: "rgba(0,0,0,0.24)" }}
          >
            <MaterialIcons name="east" size={12} color="#FFFFFF" />
          </Pressable>
        </View>
      </View>

      <View className="mt-2 flex-row flex-wrap justify-between">
        {question.options.map((option) => {
          const optionColors = getOptionColors(option.key);

          return (
            <Pressable
              key={option.key}
              onPress={() => onSelect(option.key)}
              className="mb-2 h-[30px] w-[20%] items-center justify-center rounded-[20px] border"
              style={{
                backgroundColor: optionColors.backgroundColor,
                borderColor: optionColors.borderColor,
              }}
            >
              <Text className="text-base" style={{ color: optionColors.textColor, fontFamily: FONTS.heading }}>
                {option.key}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View className="mt-1 flex-row items-center justify-between">
        <Text style={{ color: "#FFFFFF", fontFamily: FONTS.body }}>
          {selectedOption ? `Selected: ${selectedOption}` : "Choose an option"}
        </Text>
        <Text style={{ color: "#FFFFFF", fontFamily: FONTS.bodyMedium }}>
          {currentNumber}/{total}
        </Text>
      </View>

      {revealAnswer ? (
        <View className="mt-3 rounded-[18px] bg-black/20 px-4 py-4">
          <Text style={{ color: "#FFFFFF", fontFamily: FONTS.bodyMedium }}>
            Answer: {question.correctOption}
          </Text>
          <Text className="mt-2 leading-6" style={{ color: "#F8F5FF", fontFamily: FONTS.body }}>
            {question.answerNote}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

export function ExplanationModal({
  visible,
  questions,
  onClose,
  onSelectQuestion,
}: {
  visible: boolean;
  questions: WrittenQuestion[];
  onClose: () => void;
  onSelectQuestion: (question: WrittenQuestion) => void;
}) {
  const { colors, isDark } = useAppTheme();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center px-5" style={{ backgroundColor: colors.overlay }}>
        <View
          className="max-h-[80%] w-full rounded-[28px] border p-5"
          style={{
            borderColor: colors.softBorder,
            backgroundColor: isDark ? colors.surface : "#FFFFFF",
          }}
        >
          <View className="flex-row items-center justify-between">
            <Text className="text-[26px]" style={{ color: colors.text, fontFamily: FONTS.heading }}>
              Explanation
            </Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" size={24} color={colors.text} />
            </Pressable>
          </View>
          <Text className="mt-2 leading-6" style={{ color: colors.muted, fontFamily: FONTS.body }}>
            Kaunsa question explain karwana chahte hain? Neeche list mein se choose karein.
          </Text>

          <ScrollView className="mt-4" showsVerticalScrollIndicator={false}>
            {questions.map((question) => (
              <Pressable
                key={question.id}
                onPress={() => onSelectQuestion(question)}
                className="mb-3 rounded-[20px] border px-4 py-4"
                style={{ borderColor: colors.softBorder, backgroundColor: colors.card }}
              >
                <Text style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}>{question.label}</Text>
                <Text className="mt-1" style={{ color: colors.muted, fontFamily: FONTS.body }}>
                  {question.prompt}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
