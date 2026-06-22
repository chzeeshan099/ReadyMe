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

export default function AiChatScreen({ route, navigation }) {
  const courseTitle = route.params?.courseTitle;
  const user = useAuthStore((state) => state.user);
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
      activeRoute="AiChat"
      role={user?.role}
      title="AI Study Assistant"
      subtitle="Break topics into cleaner study steps, quick prompts, and revision plans."
      showBack
      padded={false}
    >
      <View className="flex-1 px-5">
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
            className="border-t px-1 py-4"
            style={{ borderColor: "rgba(77,145,255,0.16)" }}
          >
            <View className="flex-row items-end gap-3">
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Ask about a topic, paper, or concept..."
                placeholderTextColor="#7C8BA3"
                multiline
                className="max-h-28 flex-1 rounded-[22px] border bg-white/6 px-4 py-3 text-white"
                style={{ borderColor: "rgba(77,145,255,0.18)" }}
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
