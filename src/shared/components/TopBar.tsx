import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import { FONTS } from "@/shared/constants/colors";

const logoImage = require("../../../assets/logo_with_name_transparent.png");

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
      <View
        className="flex-row items-center justify-between rounded-[22px] px-3 py-3"
        style={{ backgroundColor: colors.header, shadowColor: colors.primary }}
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

        <Image
        className=""
          source={logoImage}
          resizeMode="cover"
          style={{ width: 140, height: 40 }}
        />

        <View className="flex-row items-center gap-2">
          <HeaderIconButton icon="notifications-none" onPress={() => {}} />
          {showMenu ? (
            <HeaderIconButton icon="menu" onPress={onMenuPress} />
          ) : (
            <HeaderIconButton icon="menu" onPress={() => {}} hidden />
          )}
        </View>
      </View>

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
