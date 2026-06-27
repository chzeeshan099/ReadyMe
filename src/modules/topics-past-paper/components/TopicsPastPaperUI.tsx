import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import type {
  TopicPaperItem,
  TopicPaperSection,
  TopicPastPaperPaper,
  TopicPastPaperSubject,
} from "@/modules/topics-past-paper/data/topicsPastPaperData";
import { FONTS } from "@/shared/constants/colors";

function panelColors(isDark: boolean) {
  return isDark
    ? (["rgba(255,255,255,0.05)", "rgba(255,255,255,0.02)"] as const)
    : (["rgba(255,255,255,0.98)", "rgba(248,248,252,0.92)"] as const);
}

export function TopicsSectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  const { colors } = useAppTheme();

  return (
    <View className="items-center px-2 pb-6 pt-2">
      <Text className="text-center text-[23px]" style={{ color: colors.text, fontFamily: FONTS.heading }}>
        {title}
      </Text>
      <Text className="mt-2 text-center text-[14px]" style={{ color: colors.muted, fontFamily: FONTS.body }}>
        {subtitle}
      </Text>
    </View>
  );
}

export function TopicSubjectCard({
  subject,
  onPress,
}: {
  subject: TopicPastPaperSubject;
  onPress: () => void;
}) {
  const { colors, isDark } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      className="mb-5 overflow-hidden rounded-[26px] border"
      style={{
        borderColor: subject.palette.edge,
        backgroundColor: subject.palette.soft,
        shadowColor: subject.palette.edge,
        shadowOpacity: isDark ? 0.18 : 0.1,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 10 },
      }}
    >
      <LinearGradient colors={panelColors(isDark)} className="px-4 py-5">
        <View className="flex-row justify-between">
          <View
            className="h-9 w-9 items-center justify-center rounded-xl"
            style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
          >
            <MaterialIcons name="push-pin" size={18} color={colors.headerMuted} />
          </View>
        </View>

        <View className="items-center">
          <View
            className="h-20 w-20 items-center justify-center rounded-full"
            style={{ backgroundColor: "rgba(203, 228, 196, 0.7)" }}
          >
            <MaterialIcons name={subject.icon} size={34} color="#18201B" />
          </View>
          <Text
            className="mt-5 text-center text-[19px]"
            style={{ color: subject.palette.edge, fontFamily: FONTS.heading }}
          >
            {subject.name}
          </Text>
          <Text className="mt-2 text-[14px]" style={{ color: colors.text, fontFamily: FONTS.body }}>
            Code: {subject.code}
          </Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

export function TopicPaperCard({
  paper,
  icon,
  onPress,
}: {
  paper: TopicPastPaperPaper;
  icon: React.ComponentProps<typeof MaterialIcons>["name"];
  onPress: () => void;
}) {
  const { colors, isDark } = useAppTheme();

  return (
    <Pressable
      onPress={onPress}
      className="mb-5 overflow-hidden rounded-[26px] border"
      style={{
        borderColor: paper.accent,
        backgroundColor: isDark ? `${paper.accent}22` : `${paper.accent}12`,
      }}
    >
      <LinearGradient colors={panelColors(isDark)} className="px-4 py-5">
        <View className="flex-row justify-between">
          <View
            className="h-9 w-9 items-center justify-center rounded-xl"
            style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
          >
            <MaterialIcons name="push-pin" size={18} color={colors.headerMuted} />
          </View>
        </View>

        <View className="items-center">
          <View
            className="h-20 w-20 items-center justify-center rounded-full"
            style={{ backgroundColor: "rgba(197, 216, 255, 0.76)" }}
          >
            <MaterialIcons name={icon} size={34} color="#18201B" />
          </View>
          <Text className="mt-5 text-[19px]" style={{ color: colors.headerMuted, fontFamily: FONTS.heading }}>
            {paper.title}
          </Text>
          <View
            className="mt-4 rounded-full border px-4 py-2"
            style={{ borderColor: "rgba(255,255,255,0.12)", backgroundColor: "#12131A" }}
          >
            <Text style={{ color: colors.headerMuted, fontFamily: FONTS.bodyMedium }}>{paper.label}</Text>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

export function TopicProgressPanel({ totalQuestions }: { totalQuestions: number }) {
  const { colors, isDark } = useAppTheme();

  return (
    <View className="mb-4">
      <View className="rounded-[18px] border p-1" style={{ borderColor: "#6B4B24", backgroundColor: "#3A2A1A" }}>
        <View className="flex-row">
          <View className="flex-1 items-center rounded-[14px] px-4 py-3" style={{ backgroundColor: "#5A4024" }}>
            <Text style={{ color: "#FFFFFF", fontFamily: FONTS.bodyMedium }}>View bookmarks</Text>
          </View>
          <View className="ml-1 flex-1 items-center rounded-[14px] px-4 py-3" style={{ backgroundColor: "#3A312A" }}>
            <Text style={{ color: "#C8C0D0", fontFamily: FONTS.bodyMedium }}>No bookmarks</Text>
          </View>
        </View>
      </View>

      <View
        className="mt-4 rounded-[20px] border px-4 py-4"
        style={{ borderColor: isDark ? "#234552" : colors.softBorder, backgroundColor: isDark ? "#13202E" : colors.card }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <MaterialIcons name="check-circle-outline" size={18} color="#35D08A" />
            <Text className="ml-2" style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}>
              Progress
            </Text>
            <View className="ml-3 rounded-full px-2 py-1" style={{ backgroundColor: "#1F6B46" }}>
              <Text className="text-[11px]" style={{ color: "#CFFAE4", fontFamily: FONTS.bodyMedium }}>
                0%
              </Text>
            </View>
          </View>
          <Text style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}>0/{totalQuestions}</Text>
        </View>
      </View>
    </View>
  );
}

export function TopicOutlineSection({ index, section, onPressItem }: {
  index: number;
  section: TopicPaperSection;
  onPressItem: (item: TopicPaperItem) => void;
}) {
  const { colors, isDark } = useAppTheme();

  return (
    <View className="mb-5">
      <View className="flex-row items-start justify-between border-b pb-3" style={{ borderColor: colors.softBorder }}>
        <View className="flex-row flex-1 pr-3">
          <View
            className="mr-3 mt-1 h-6 w-6 items-center justify-center rounded-md"
            style={{ backgroundColor: isDark ? "#5B6678" : "#CBD5E1" }}
          >
            <Text className="text-[11px]" style={{ color: "#FFFFFF", fontFamily: FONTS.bodyMedium }}>
              {index}
            </Text>
          </View>
          <Text className="flex-1 text-[22px]" style={{ color: colors.text, fontFamily: FONTS.heading }}>
            {section.title}
          </Text>
        </View>
        <Text className="text-right text-[13px]" style={{ color: "#54B8D8", fontFamily: FONTS.bodyMedium }}>
          {section.totalQuestions} questions
        </Text>
      </View>

      {section.items.map((item) => (
        <TopicOutlineItem key={item.id} item={item} onPress={() => onPressItem(item)} />
      ))}
    </View>
  );
}

export function TopicOutlineItem({
  item,
  onPress,
}: {
  item: TopicPaperItem;
  onPress: () => void;
}) {
  const { colors } = useAppTheme();

  return (
    <Pressable onPress={onPress} className="flex-row items-start px-2 py-4">
      <View className="mr-3 mt-1 h-5 w-5 rounded-[4px] border" style={{ borderColor: "#707782" }} />
      <View className="mr-3 mt-1">
        <MaterialIcons name={item.icon} size={16} color={item.accent} />
      </View>
      <View className="flex-1 pr-2">
        <Text className="text-[20px] leading-8" style={{ color: colors.text, fontFamily: FONTS.heading }}>
          {item.title}
        </Text>
      </View>
      <View className="items-end">
        <View className="rounded-[10px] px-3 py-1" style={{ backgroundColor: "#275E78" }}>
          <Text style={{ color: "#D9F4FF", fontFamily: FONTS.bodyMedium }}>{item.questionCount} Qs</Text>
        </View>
        <View className="mt-2 h-6 w-6 items-center justify-center rounded-md" style={{ backgroundColor: "#0D6B6B" }}>
          <MaterialIcons name="navigate-next" size={16} color="#D9FFFB" />
        </View>
      </View>
    </Pressable>
  );
}
