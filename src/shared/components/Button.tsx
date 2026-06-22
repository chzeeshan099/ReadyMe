import React from "react";
import { Pressable, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { GLOW } from "../constants/colors";

export default function Button({ title, onPress, disabled = false, variant = "primary" }) {
  const isPrimary = variant === "primary";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={isPrimary ? GLOW.strong : GLOW.panel}
      className={`overflow-hidden rounded-2xl ${disabled ? "opacity-60" : ""}`}
    >
      <LinearGradient
        colors={isPrimary ? ["#0A56D8", "#0B6DFF", "#35C3FF"] : ["rgba(255,255,255,0.14)", "rgba(255,255,255,0.08)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="px-5 py-4"
        style={{
          borderWidth: 1,
          borderColor: isPrimary ? GLOW.cyanBorder : "rgba(255,255,255,0.12)",
        }}
      >
        <Text className="text-center text-base font-bold text-white">{title}</Text>
      </LinearGradient>
    </Pressable>
  );
}
