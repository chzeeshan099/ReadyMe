import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";
import ScreenShell from "@/shared/components/ScreenShell";
import { COLORS } from "@/shared/constants/colors";
import { APP_MENU_ITEMS } from "@/shared/navigation/appMenu";

const spotlightCards = [
  "Notes",
  "Topics Past Paper",
  "Yearly Past Paper",
  "Ai Assistant",
];

export default function DashboardScreen({ navigation }) {
  const quickItems = APP_MENU_ITEMS.filter((item) => spotlightCards.includes(item.label));

  return (
    <ScreenShell
      navigation={navigation}
      activeRoute="Dashboard"
      title="Dashboard"
      subtitle="Apni study workflow ko aik jagah se manage karein."
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="pb-4">
          <View className="rounded-[32px] border border-edge-soft bg-panel px-6 py-6 shadow-neon-md">
            <Text className="text-[12px] uppercase tracking-[5px] text-cyan-300">
              ReadyMe Hub
            </Text>
            <Text className="mt-3 text-[34px] font-black leading-[40px] text-white">
              Study tools, papers, aur AI sab aik jagah.
            </Text>
            <Text className="mt-4 text-[15px] leading-7 text-slate-300">
              Top-right menu se har section open karein ya neeche diye gaye shortcuts use karein.
            </Text>
          </View>

          <View className="mt-6 flex-row flex-wrap justify-between">
            {quickItems.map((item) => (
              <Pressable
                key={item.route}
                onPress={() => navigation.navigate(item.route)}
                className="mb-4 w-[48%] rounded-[26px] border border-edge-soft bg-white/6 px-4 py-5 shadow-neon-sm"
              >
                <View className="h-11 w-11 items-center justify-center rounded-2xl border border-edge-cyan bg-brand-blue/15">
                  <MaterialIcons name={item.icon as any} size={20} color={COLORS.cyan} />
                </View>
                <Text className="mt-4 text-[17px] font-bold text-white">{item.label}</Text>
                <Text className="mt-2 text-[12px] leading-5 text-slate-400">
                  Open section
                </Text>
              </Pressable>
            ))}
          </View>

          <View className="rounded-[28px] border border-edge-soft bg-white/6 p-5">
            <Text className="text-[20px] font-bold text-white">What is new?</Text>
            <Text className="mt-3 text-[14px] leading-6 text-slate-300">
              Bottom tabs hata kar ab hamburger drawer add kar diya gaya hai jahan se tamam
              sections right side se slide ho kar open hotay hain.
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenShell>
  );
}

