import React from "react";
import { View } from "react-native";

export default function Atmosphere() {
  return (
    <>
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: -40,
          right: -30,
          width: 220,
          height: 220,
          borderRadius: 999,
          backgroundColor: "rgba(11,109,255,0.18)",
          shadowColor: "#0B6DFF",
          shadowOpacity: 0.5,
          shadowRadius: 35,
          elevation: 18,
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          bottom: 120,
          left: -60,
          width: 180,
          height: 180,
          borderRadius: 999,
          backgroundColor: "rgba(77,226,255,0.10)",
          shadowColor: "#4DE2FF",
          shadowOpacity: 0.35,
          shadowRadius: 28,
          elevation: 12,
        }}
      />
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 140,
          left: 40,
          right: 40,
          height: 1,
          backgroundColor: "rgba(120,180,255,0.18)",
          shadowColor: "#4DE2FF",
          shadowOpacity: 0.7,
          shadowRadius: 8,
        }}
      />
    </>
  );
}
