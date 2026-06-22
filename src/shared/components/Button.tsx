import React from "react";
import { Pressable, Text } from "react-native";

export default function Button({ title, onPress, disabled = false, variant = "primary" }) {
  const isPrimary = variant === "primary";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`rounded-2xl px-5 py-4 ${isPrimary ? "bg-blue-500" : "bg-white/10"} ${disabled ? "opacity-60" : ""}`}
    >
      <Text className="text-center text-base font-bold text-white">{title}</Text>
    </Pressable>
  );
}
