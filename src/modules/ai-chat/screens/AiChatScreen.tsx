import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MessageBubble from "../components/MessageBubble";
import { sendStudyPrompt } from "../services/ai.service";
import { COLORS } from "../../../shared/constants/colors";

export default function AiChatScreen({ route }) {
  const courseTitle = route.params?.courseTitle;
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
    <LinearGradient colors={COLORS.bgGradient} style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1"
        >
          <ScrollView className="flex-1 px-5 pt-5" showsVerticalScrollIndicator={false}>
            <Text className="text-3xl font-black text-white">AI Study Assistant</Text>
            <Text className="mt-3 text-base leading-6 text-slate-300">
              Use AI to simplify concepts, build revision plans, and get a cleaner study routine.
            </Text>

            <View className="mt-6">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </View>
          </ScrollView>

          <View className="border-t border-white/10 px-5 py-4">
            <View className="flex-row items-end gap-3">
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder="Ask about a topic, paper, or concept..."
                placeholderTextColor="#7C8BA3"
                multiline
                className="max-h-28 flex-1 rounded-[22px] border border-white/10 bg-white/6 px-4 py-3 text-white"
              />
              <Pressable
                onPress={onSend}
                className="rounded-2xl bg-blue-500 px-5 py-4"
              >
                <Text className="font-bold text-white">
                  {sending ? "..." : "Send"}
                </Text>
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}
