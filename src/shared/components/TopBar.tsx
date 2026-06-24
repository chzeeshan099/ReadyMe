import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import { FONTS } from "@/shared/constants/colors";
import logoImage from "../../../assets/only_name_transparent.png";

function HeaderIconButton({ icon, onPress, hidden = false }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={hidden}
      className="h-10 w-10 items-center justify-center rounded-[14px] border"
      style={{
        opacity: hidden ? 0 : 1,
        borderColor: "rgba(255,255,255,0.14)",
        backgroundColor: "rgba(255,255,255,0.12)",
      }}
    >
      <MaterialIcons name={icon} size={20} color="#FFFFFF" />
    </Pressable>
  );
}

export default function TopBar({
  title,
  subtitle,
  showBack = false,
  onBack = () => {},
  rightLabel,
  onRightPress,
  showMenu = true,
  onMenuPress,
}) {
  const { colors, isDark, toggleMode } = useAppTheme();

  return (
    <View className="mb-6">
      <LinearGradient
        colors={
          isDark
            ? ["#07111F", "#0E1D36", "#102B4F", "#08101D"]
            : ["#EAF4FF", "#D9EDFF", "#F6FBFF", "#DCEFFF"]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="overflow-hidden rounded-[22px]"
        style={{
          borderWidth: 1,
          borderColor: isDark ? "rgba(85, 205, 255, 0.28)" : "rgba(0, 119, 255, 0.14)",
          shadowColor: isDark ? "#39C6FF" : "#4DA3FF",
          shadowOpacity: isDark ? 0.32 : 0.18,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 10 },
          elevation: 12,
        }}
      >
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: -34,
            left: -28,
            width: 120,
            height: 120,
            borderRadius: 999,
            backgroundColor: isDark ? "rgba(0, 229, 255, 0.22)" : "rgba(77, 163, 255, 0.16)",
          }}
        />
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            right: -18,
            bottom: -42,
            width: 140,
            height: 140,
            borderRadius: 999,
            backgroundColor: isDark ? "rgba(0, 119, 255, 0.18)" : "rgba(0, 140, 255, 0.12)",
          }}
        />
        <View
          className="flex-row items-center justify-between rounded-[22px] px-3 py-3"
          style={{
            backgroundColor: isDark ? "rgba(6, 14, 28, 0.42)" : "rgba(255,255,255,0.46)",
          }}
        >
          <View className="flex-row items-center gap-2">
            <HeaderIconButton
              icon="arrow-back-ios-new"
              onPress={onBack}
              hidden={showBack}
            />
            <HeaderIconButton
              icon={isDark ? "light-mode" : "dark-mode"}
              onPress={toggleMode}
            />
          </View>

          <View
            // style={{
            //   borderRadius: 18,
            //   paddingHorizontal: 14,
            //   paddingVertical: 8,
            //   backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.58)",
            //   borderWidth: 1,
            //   borderColor: isDark ? "rgba(125, 226, 255, 0.24)" : "rgba(255,255,255,0.7)",
            //   shadowColor: isDark ? "#51D9FF" : "#5AB0FF",
            //   shadowOpacity: isDark ? 0.2 : 0.1,
            //   shadowRadius: 14,
            //   shadowOffset: { width: 0, height: 4 },
            // }}
            className="flex-row gap-1"
          >
            <Text className="text-2xl font-bold text-white">Ready</Text>
            <Text className="text-2xl font-bold text-blue-500">Me</Text>
          </View>

          <View className="flex-row items-center gap-2">
            <HeaderIconButton icon="notifications-none" onPress={() => {}} />
            {showMenu ? (
              <HeaderIconButton icon="menu" onPress={onMenuPress} />
            ) : (
              <HeaderIconButton icon="menu" onPress={() => {}} hidden />
            )}
          </View>
        </View>
      </LinearGradient>

      {title || subtitle ? (
        <View className="px-1 pt-4">
          {title ? (
            <Text
              className="text-[28px] tracking-[-0.6px]"
              style={{ color: colors.text, fontFamily: FONTS.heading }}
            >
              {title}
            </Text>
          ) : null}

          {subtitle ? (
            <Text
              className="mt-2 text-[15px] leading-7"
              style={{ color: colors.muted, fontFamily: FONTS.body }}
            >
              {subtitle}
            </Text>
          ) : null}

          {rightLabel ? (
            <Pressable onPress={onRightPress} className="mt-3 self-start">
              <Text style={{ color: colors.primary, fontFamily: FONTS.bodyMedium }}>
                {rightLabel}
              </Text>
            </Pressable>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
