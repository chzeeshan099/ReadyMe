import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import AnimatedEntrance from "@/shared/components/AnimatedEntrance";
import ScreenShell from "@/shared/components/ScreenShell";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import { FONTS } from "@/shared/constants/colors";

export default function FeatureScreen({
  navigation,
  activeRoute,
  title,
  subtitle,
  badge,
  cards = [],
}) {
  const { colors } = useAppTheme();

  return (
    <ScreenShell
      navigation={navigation}
      activeRoute={activeRoute}
      title={title}
      subtitle={subtitle}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="pb-4">
          <AnimatedEntrance delay={60}>
            <View
              className="rounded-[30px] border px-6 py-6 shadow-neon-md"
              style={{ borderColor: colors.border, backgroundColor: colors.surfaceAlt }}
            >
              <Text
                className="text-[12px] uppercase tracking-[5px]"
                style={{ color: colors.accent, fontFamily: FONTS.bodyMedium }}
              >
                {badge}
              </Text>
              <Text
                className="mt-3 text-[30px] font-black leading-9"
                style={{ color: colors.text, fontFamily: FONTS.heading }}
              >
                {title}
              </Text>
              <Text
                className="mt-4 text-[15px] leading-7"
                style={{ color: colors.muted, fontFamily: FONTS.body }}
              >
                {subtitle}
              </Text>
            </View>
          </AnimatedEntrance>

          <View className="mt-6">
            {cards.map((card, index) => (
              <AnimatedEntrance key={card.title} delay={140 + index * 90}>
                <View
                  className="mb-4 rounded-[26px] border p-5"
                  style={{ borderColor: colors.softBorder, backgroundColor: colors.card }}
                >
                  <Text
                    className="text-[18px] font-bold"
                    style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}
                  >
                    {card.title}
                  </Text>
                  <Text
                    className="mt-2 text-[14px] leading-6"
                    style={{ color: colors.muted, fontFamily: FONTS.body }}
                  >
                    {card.description}
                  </Text>
                  {card.actionLabel ? (
                    <Pressable
                      onPress={card.onPress}
                      className="mt-4 self-start rounded-2xl border px-4 py-2"
                      style={{ borderColor: colors.border, backgroundColor: colors.input }}
                    >
                      <Text style={{ color: colors.primary, fontFamily: FONTS.bodyMedium }}>
                        {card.actionLabel}
                      </Text>
                    </Pressable>
                  ) : null}
                </View>
              </AnimatedEntrance>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenShell>
  );
}
