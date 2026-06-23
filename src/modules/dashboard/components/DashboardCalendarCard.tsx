import React from "react";
import { Text, View } from "react-native";
import { FONTS } from "@/shared/constants/colors";
import { useAppTheme } from "@/core/providers/ThemeProvider";

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
const days = ["", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30"];

export default function DashboardCalendarCard() {
  const { colors } = useAppTheme();

  return (
    <View
      className="rounded-[30px] border px-5 py-5"
      style={{ borderColor: colors.softBorder, backgroundColor: colors.surface }}
    >
      <Text style={{ color: colors.text, fontFamily: FONTS.heading, fontSize: 22 }}>
        June 2026
      </Text>

      <View className="mt-4 flex-row justify-between">
        {weekDays.map((day, index) => (
          <Text
            key={`${day}-${index}`}
            className="w-8 text-center"
            style={{ color: colors.dim, fontFamily: FONTS.bodyMedium }}
          >
            {day}
          </Text>
        ))}
      </View>

      <View className="mt-4 flex-row flex-wrap justify-between">
        {days.map((day, index) => {
          const active = day === "23";
          return (
            <View
              key={`${day}-${index}`}
              className="mb-3 h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: active ? colors.primary : "transparent" }}
            >
              <Text
                style={{
                  color: day ? (active ? "#FFFFFF" : colors.text) : "transparent",
                  fontFamily: active ? FONTS.bodyMedium : FONTS.body,
                }}
              >
                {day || "."}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
