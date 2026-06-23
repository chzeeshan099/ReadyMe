import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import ScreenShell from "@/shared/components/ScreenShell";
import { COLORS } from "@/shared/constants/colors";

export default function FeatureScreen({
  navigation,
  activeRoute,
  title,
  subtitle,
  badge,
  cards = [],
}) {
  return (
    <ScreenShell
      navigation={navigation}
      activeRoute={activeRoute}
      title={title}
      subtitle={subtitle}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="pb-4">
          <View className="rounded-[30px] border border-edge-soft bg-panel px-6 py-6 shadow-neon-md">
            <Text className="text-[12px] uppercase tracking-[5px] text-cyan-300">
              {badge}
            </Text>
            <Text className="mt-3 text-[30px] font-black leading-9 text-white">
              {title}
            </Text>
            <Text className="mt-4 text-[15px] leading-7 text-slate-300">{subtitle}</Text>
          </View>

          <View className="mt-6">
            {cards.map((card) => (
              <View
                key={card.title}
                className="mb-4 rounded-[26px] border border-edge-soft bg-white/6 p-5"
              >
                <Text className="text-[18px] font-bold text-white">{card.title}</Text>
                <Text className="mt-2 text-[14px] leading-6 text-slate-300">
                  {card.description}
                </Text>
                {card.actionLabel ? (
                  <Pressable
                    onPress={card.onPress}
                    className="mt-4 self-start rounded-2xl border border-edge-cyan bg-brand-blue/15 px-4 py-2"
                  >
                    <Text style={{ color: COLORS.cyan }} className="font-semibold">
                      {card.actionLabel}
                    </Text>
                  </Pressable>
                ) : null}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenShell>
  );
}

