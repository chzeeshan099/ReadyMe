import React from "react";
import { Text, TextInput, View } from "react-native";
import { GLOW } from "@/shared/constants/colors";

export default function Input({ label, error, ...props }) {
  return (
    <View>
      {label ? <Text className="mb-2 text-sm font-medium text-slate-200">{label}</Text> : null}
      <TextInput
        placeholderTextColor="#7C8BA3"
        style={{
          ...GLOW.panel,
          borderColor: error ? "rgba(251,113,133,0.7)" : GLOW.blueBorder,
        }}
        className="rounded-2xl border bg-white/6 px-4 py-4 text-white"
        {...props}
      />
      {error ? <Text className="mt-2 text-sm text-rose-300">{error}</Text> : null}
    </View>
  );
}
