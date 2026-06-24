import React, { useState } from "react";
import { Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { FONTS } from "@/shared/constants/colors";
import { useAppTheme } from "@/core/providers/ThemeProvider";

export default function DashboardCalendarCard() {
  const { colors } = useAppTheme();

  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);

  return (
    <View
      className="rounded-[30px] border px-5 py-5"
      style={{
        borderColor: colors.softBorder,
        backgroundColor: colors.surface,
      }}
    >
      <Calendar
        current={today}
        enableSwipeMonths
        hideExtraDays
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: colors.primary,
            selectedTextColor: "#FFFFFF",
          },
        }}
        renderHeader={(date) => {
          const month = date.toString("MMMM");
          const year = date.getFullYear();

          return (
            <Text
              style={{
                color: colors.text,
                fontFamily: FONTS.heading,
                fontSize: 24,
              }}
            >
              {month} {year}
            </Text>
          );
        }}
        renderArrow={(direction) => (
          <Text
            style={{
              color: colors.dim,
              fontSize: 34,
              fontFamily: FONTS.heading,
            }}
          >
            {direction === "left" ? "‹" : "›"}
          </Text>
        )}
        theme={{
          calendarBackground: colors.surface,
          textSectionTitleColor: colors.dim,
          dayTextColor: colors.text,
          todayTextColor: colors.primary,
          selectedDayBackgroundColor: colors.primary,
          selectedDayTextColor: "#FFFFFF",
          textDisabledColor: colors.dim,

          textDayFontFamily: FONTS.body,
          textMonthFontFamily: FONTS.heading,
          textDayHeaderFontFamily: FONTS.bodyMedium,

          textDayFontSize: 18,
          textMonthFontSize: 24,
          textDayHeaderFontSize: 16,
        }}
      />
    </View>
  );
}