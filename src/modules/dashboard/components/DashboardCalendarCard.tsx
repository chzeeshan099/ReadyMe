import React, { useState } from "react";
import { Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import { FONTS } from "@/shared/constants/colors";

export default function DashboardCalendarCard() {
  const { colors, isDark } = useAppTheme();

  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const calendarBackground = isDark ? colors.surface : colors.surfaceAlt;
  const calendarTheme = {
    backgroundColor: calendarBackground,
    calendarBackground: calendarBackground,
    monthTextColor: colors.primary,
    textSectionTitleColor: colors.dim,
    dayTextColor: colors.text,
    selectedDayTextColor: "#FFFFFF",
    textDisabledColor: colors.dim,
    arrowColor: colors.dim,
    textDayFontFamily: FONTS.body,
    textMonthFontFamily: FONTS.heading,
    textDayHeaderFontFamily: FONTS.bodyMedium,
    textDayFontSize: 14,
    textMonthFontSize: 24,
    textDayHeaderFontSize: 16,
    "stylesheet.calendar.header": {
      week: {
        marginTop: 14,
        marginBottom: 8,
        flexDirection: "row",
        justifyContent: "space-between",
      },
    },
  };

  return (
    <View
      className="rounded-[30px] border px-5 py-5"
      style={{
        borderColor: colors.softBorder,
        backgroundColor: calendarBackground,
      }}
    >
      <Calendar
        key={`dashboard-calendar-${isDark ? "dark" : "light"}`}
        current={today}
        enableSwipeMonths
        hideExtraDays
        style={{
          borderRadius: 24,
          backgroundColor: calendarBackground,
        }}
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
                color: colors.primary,
                fontFamily: FONTS.heading,
                fontSize: 24,
              }}
            >
              {month} {year}
            </Text>
          );
        }}
        dayComponent={({ date, state }) => {
          const isSelected = date?.dateString === selectedDate;
          const isDisabled = state === "disabled";

          return (
            <View
              style={{
                width: 34,
                height: 34,
                borderRadius: 17,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: isSelected ? colors.primary : "transparent",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: FONTS.body,
                  color: isDisabled ? colors.dim : isSelected ? "#FFFFFF" : colors.text,
                  opacity: isDisabled ? 0.55 : 1,
                }}
              >
                {date?.day}
              </Text>
            </View>
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
            {direction === "left" ? "\u2039" : "\u203A"}
          </Text>
        )}
        theme={calendarTheme}
      />
    </View>
  );
}
