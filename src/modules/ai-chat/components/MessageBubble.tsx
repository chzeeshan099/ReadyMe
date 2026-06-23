import React from "react";
import { Text, View } from "react-native";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import { FONTS } from "@/shared/constants/colors";

export default function MessageBubble({ message }) {
  const { colors, isDark } = useAppTheme();
  const isUser = message.role === "user";

  return (
    <View className={`mb-3 ${isUser ? "items-end" : "items-start"}`}>
      <View
        className="max-w-[85%] rounded-[22px] px-4 py-3"
        style={{
          backgroundColor: isUser ? colors.primary : colors.card,
          borderWidth: isUser ? 0 : 1,
          borderColor: isUser ? "transparent" : colors.softBorder,
        }}
      >
        <Text
          style={{
            color: isUser ? "#FFFFFF" : colors.text,
            fontFamily: isDark ? FONTS.body : FONTS.bodyMedium,
          }}
        >
          {message.content}
        </Text>
      </View>
    </View>
  );
}
