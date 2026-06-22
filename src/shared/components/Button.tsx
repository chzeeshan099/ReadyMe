import React from "react";
import { Pressable, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Button({ title, onPress, disabled = false, variant = "primary" }) {
  const isPrimary = variant === "primary";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`overflow-hidden rounded-2xl ${isPrimary ? "shadow-neon-cyan" : "shadow-neon-sm"} ${disabled ? "opacity-60" : ""}`}
    >
      <LinearGradient
        colors={
          isPrimary
            ? ["#0A56D8", "#0B6DFF", "#35C3FF"]
            : ["rgba(255,255,255,0.14)", "rgba(255,255,255,0.08)"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className={`border px-5 py-4 ${isPrimary ? "border-edge-cyan" : "border-white/10"}`}
      >
        <Text className="text-center text-base font-bold text-white">{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}
