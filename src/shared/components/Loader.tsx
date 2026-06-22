import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { COLORS } from "@/shared/constants/colors";

export default function Loader({ text = "Loading...", fullScreen = false }) {
  return (
    <View
      className={`items-center justify-center ${fullScreen ? "flex-1 bg-[#020712]" : "py-6"}`}
    >
      <ActivityIndicator size="large" color={COLORS.primary} />
      <Text className="mt-3 text-sm text-slate-300">{text}</Text>
    </View>
  );
}
