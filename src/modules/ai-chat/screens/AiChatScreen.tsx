import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  View,
} from "react-native";
import MessageBubble from "@/modules/ai-chat/components/MessageBubble";
import { sendStudyPrompt } from "@/modules/ai-chat/services/ai.service";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import ScreenShell from "@/shared/components/ScreenShell";
import Button from "@/shared/components/Button";
import { useAppTheme } from "@/core/providers/ThemeProvider";

export default function AiChatScreen({ route, navigation }) {
  const courseTitle = route.params?.courseTitle;
  const activeRoute = route.params?.activeRoute || "AiAssistant";
  const screenTitle = route.params?.screenTitle || "Ai Assistant";
  const user = useAuthStore((state) => state.user);
  const { colors } = useAppTheme();
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content: courseTitle
        ? `Ask anything about ${courseTitle} and I will help you break it down.`
        : "Tell me what you are studying and I will help you plan it.",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const onSend = async () => {
    if (!input.trim() || sending) {
      return;
    }

    const userMessage = {
      id: `${Date.now()}-user`,
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setSending(true);

    try {
      const reply = await sendStudyPrompt(userMessage.content, courseTitle);
      setMessages((prev) => [
        ...prev,
        { id: `${Date.now()}-assistant`, role: "assistant", content: reply },
      ]);
    } catch (error) {
      Alert.alert("AI unavailable", error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <ScreenShell
      navigation={navigation}
      activeRoute={activeRoute}
      role={user?.role}
      title={screenTitle}
      subtitle="Break topics into cleaner study steps, quick prompts, and revision plans."
      showBack
      padded={false}
    >
      <View className="flex-1 px-4">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1"
        >
          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="mt-1">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </View>
          </ScrollView>

          <View
            className="px-1 py-4"
            style={{ borderTopWidth: 1, borderTopColor: colors.softBorder }}
          >
            <View className="flex-row items-end gap-3">
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Ask about a topic, paper, or concept..."
                placeholderTextColor={colors.dim}
                multiline
                style={{
                  maxHeight: 112,
                  flex: 1,
                  borderRadius: 22,
                  borderWidth: 1,
                  borderColor: colors.softBorder,
                  backgroundColor: colors.input,
                  color: colors.text,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                }}
              />
              <View className="w-[104px]">
                <Button title={sending ? "..." : "Send"} onPress={onSend} />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScreenShell>
  );
}

