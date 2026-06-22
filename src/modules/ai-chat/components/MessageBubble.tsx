import React from "react";
import { Text, View } from "react-native";

export default function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <View className={`mb-3 ${isUser ? "items-end" : "items-start"}`}>
      <View
        className={`max-w-[85%] rounded-[22px] px-4 py-3 ${isUser ? "bg-blue-500" : "bg-white/8"}`}
      >
        <Text className={isUser ? "text-white" : "text-slate-200"}>
          {message.content}
        </Text>
      </View>
    </View>
  );
}
