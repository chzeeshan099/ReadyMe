import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FONTS } from "@/shared/constants/colors";
import { useAppTheme } from "@/core/providers/ThemeProvider";

const CATEGORY_STYLES = {
  Task: {
    dark: {
      border: "#8E61FF",
      background: "rgba(142,97,255,0.16)",
      activeBackground: "#8E61FF",
      text: "#D9CAFF",
    },
    light: {
      border: "#8E61FF",
      background: "#F1E9FF",
      activeBackground: "#8E61FF",
      text: "#6A3FF0",
    },
  },
  Revision: {
    dark: {
      border: "#FFCC87",
      background: "rgba(255,204,135,0.14)",
      activeBackground: "#C98B35",
      text: "#FFE7BE",
    },
    light: {
      border: "#E4A550",
      background: "#FFF3DF",
      activeBackground: "#E4A550",
      text: "#9D641F",
    },
  },
  "Past Papers": {
    dark: {
      border: "#7EF0B8",
      background: "rgba(126,240,184,0.14)",
      activeBackground: "#2FAA72",
      text: "#C9FFE2",
    },
    light: {
      border: "#54BF89",
      background: "#E7FFF1",
      activeBackground: "#54BF89",
      text: "#218255",
    },
  },
  Notes: {
    dark: {
      border: "#7BCFFF",
      background: "rgba(123,207,255,0.14)",
      activeBackground: "#3498DB",
      text: "#D6F0FF",
    },
    light: {
      border: "#5DAEF0",
      background: "#E8F5FF",
      activeBackground: "#5DAEF0",
      text: "#276A9D",
    },
  },
  Goal: {
    dark: {
      border: "#F4B7FF",
      background: "rgba(244,183,255,0.14)",
      activeBackground: "#B36BE2",
      text: "#FBE1FF",
    },
    light: {
      border: "#D889EA",
      background: "#FBEAFF",
      activeBackground: "#D889EA",
      text: "#9543AA",
    },
  },
};

const DEFAULT_FORM = {
  title: "",
  category: "Task",
  date: "24/06/2026",
  allDay: false,
  fromTime: "9:00 AM",
  toTime: "10:00 AM",
  notes: "",
};

function FieldLabel({ children }) {
  const { colors } = useAppTheme();

  return (
    <Text
      className="mb-3 text-[12px] uppercase tracking-[2.8px]"
      style={{ color: colors.dim, fontFamily: FONTS.bodyMedium }}
    >
      {children}
    </Text>
  );
}

function FieldBox({ children, style = undefined }) {
  const { colors, isDark } = useAppTheme();

  return (
    <View
      className="min-h-[58px] flex-row items-center rounded-[18px] border px-4"
      style={[
        {
          borderColor: colors.softBorder,
          backgroundColor: isDark ? colors.input : "#FFFDFB",
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export default function DashboardTaskModal({ visible, onClose }) {
  const { colors, isDark } = useAppTheme();
  const [form, setForm] = useState(DEFAULT_FORM);

  useEffect(() => {
    if (visible) {
      setForm(DEFAULT_FORM);
    }
  }, [visible]);

  const categoryPalette = useMemo(() => {
    return Object.entries(CATEGORY_STYLES).map(([name, palette]) => ({
      name,
      colors: isDark ? palette.dark : palette.light,
    }));
  }, [isDark]);

  const surfaceColor = isDark ? colors.surface : "#FFFEFC";
  const fieldColor = isDark ? colors.input : "#FFFDFB";
  const dividerColor = isDark ? colors.softBorder : "rgba(123, 77, 255, 0.10)";

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        className="flex-1 justify-center px-4"
        style={{ backgroundColor: isDark ? "rgba(7, 6, 12, 0.72)" : "rgba(37, 22, 54, 0.22)" }}
      >
        <View
          className="max-h-[92%] overflow-hidden rounded-[30px] border"
          style={{
            borderColor: dividerColor,
            backgroundColor: surfaceColor,
            shadowColor: isDark ? "#000000" : "#8E61FF",
            shadowOpacity: isDark ? 0.28 : 0.16,
            shadowRadius: 30,
            shadowOffset: { width: 0, height: 14 },
            elevation: 24,
          }}
        >
          <View className="flex-row items-start justify-between px-6 pb-5 pt-6">
            <View className="pr-4">
              <Text
                className="text-[20px]"
                style={{ color: colors.text, fontFamily: FONTS.heading }}
              >
                Add Task
              </Text>
              <Text
                className="mt-1 text-[14px]"
                style={{ color: colors.muted, fontFamily: FONTS.body }}
              >
                Schedule something to study
              </Text>
            </View>

            <Pressable
              onPress={onClose}
              className="h-10 w-10 items-center justify-center rounded-full"
              style={{ backgroundColor: fieldColor }}
            >
              <MaterialIcons name="close" size={22} color={colors.dim} />
            </Pressable>
          </View>

          <View style={{ height: 1, backgroundColor: dividerColor }} />

          <ScrollView
            className="px-6 py-5"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 12 }}
          >
            <FieldLabel>TITLE</FieldLabel>
            <FieldBox>
              <TextInput
                value={form.title}
                onChangeText={(title) => setForm((current) => ({ ...current, title }))}
                placeholder="What are you studying?"
                placeholderTextColor={colors.dim}
                style={{
                  flex: 1,
                  color: colors.text,
                  fontFamily: FONTS.body,
                  fontSize: 16,
                  paddingVertical: 16,
                }}
              />
            </FieldBox>

            <View className="mt-6">
              <FieldLabel>CATEGORY</FieldLabel>
              <View className="flex-row flex-wrap gap-3">
                {categoryPalette.map((item) => {
                  const isSelected = form.category === item.name;
                  return (
                    <Pressable
                      key={item.name}
                      onPress={() => setForm((current) => ({ ...current, category: item.name }))}
                      className="rounded-full border px-4 py-2"
                      style={{
                        borderColor: item.colors.border,
                        backgroundColor: isSelected
                          ? item.colors.activeBackground
                          : item.colors.background,
                      }}
                    >
                      <Text
                        style={{
                          color: isSelected ? "#FFFFFF" : item.colors.text,
                          fontFamily: FONTS.bodyMedium,
                          fontSize: 15,
                        }}
                      >
                        {item.name}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View className="mt-6">
              <FieldLabel>DATE</FieldLabel>
              <FieldBox style={{ justifyContent: "space-between" }}>
                <Text
                  style={{ flex: 1, color: colors.text, fontFamily: FONTS.body, fontSize: 16 }}
                >
                  {form.date}
                </Text>
                <MaterialIcons name="keyboard-arrow-down" size={22} color={colors.dim} />
              </FieldBox>
            </View>

            <View className="mt-5 flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <Switch
                  value={form.allDay}
                  onValueChange={(allDay) => setForm((current) => ({ ...current, allDay }))}
                  trackColor={{
                    false: isDark ? "rgba(255,255,255,0.14)" : "rgba(83, 63, 130, 0.18)",
                    true: colors.primary,
                  }}
                  thumbColor={form.allDay ? "#FFFFFF" : isDark ? "#ECE3FF" : "#FFFFFF"}
                />
                <Text
                  style={{ color: colors.text, fontFamily: FONTS.bodyMedium, fontSize: 16 }}
                >
                  All day
                </Text>
              </View>
            </View>

            {!form.allDay ? (
              <View className="mt-6">
                <FieldLabel>TIME</FieldLabel>
                <View className="flex-row items-center gap-3">
                  <FieldBox style={{ flex: 1, backgroundColor: fieldColor }}>
                    <Text
                      style={{ flex: 1, color: colors.text, fontFamily: FONTS.body, fontSize: 16 }}
                    >
                      {form.fromTime}
                    </Text>
                    <MaterialIcons name="schedule" size={19} color={colors.dim} />
                  </FieldBox>
                  <Text style={{ color: colors.dim, fontFamily: FONTS.body, fontSize: 18 }}>
                    to
                  </Text>
                  <FieldBox style={{ flex: 1, backgroundColor: fieldColor }}>
                    <Text
                      style={{ flex: 1, color: colors.text, fontFamily: FONTS.body, fontSize: 16 }}
                    >
                      {form.toTime}
                    </Text>
                    <MaterialIcons name="schedule" size={19} color={colors.dim} />
                  </FieldBox>
                </View>
              </View>
            ) : null}

            <View className="mt-6 mb-6">
              <FieldLabel>NOTES (optional)</FieldLabel>
              <FieldBox style={{ minHeight: 120, alignItems: "flex-start", paddingTop: 2 }}>
                <TextInput
                  value={form.notes}
                  onChangeText={(notes) => setForm((current) => ({ ...current, notes }))}
                  placeholder="Any notes..."
                  placeholderTextColor={colors.dim}
                  multiline
                  textAlignVertical="top"
                  style={{
                    flex: 1,
                    width: "100%",
                    minHeight: 96,
                    color: colors.text,
                    fontFamily: FONTS.body,
                    fontSize: 16,
                    paddingVertical: 16,
                  }}
                />
              </FieldBox>
            </View>
          </ScrollView>

          <View style={{ height: 1, backgroundColor: dividerColor }} />

          <View className="flex-row items-center justify-end gap-3 px-6 py-5">
            <Pressable
              onPress={onClose}
              className="rounded-full border px-6 py-3"
              style={{
                borderColor: colors.softBorder,
                backgroundColor: isDark ? colors.surfaceAlt : "#FFFFFF",
              }}
            >
              <Text
                style={{ color: colors.muted, fontFamily: FONTS.bodyMedium, fontSize: 16 }}
              >
                Cancel
              </Text>
            </Pressable>

            <Pressable
              onPress={onClose}
              className="rounded-full px-6 py-3"
              style={{ backgroundColor: colors.primary }}
            >
              <Text
                style={{ color: "#FFFFFF", fontFamily: FONTS.bodyMedium, fontSize: 16 }}
              >
                Add Task
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
