import React from "react";
import { Alert, Pressable, ScrollView, Share, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import AnimatedEntrance from "@/shared/components/AnimatedEntrance";
import ScreenShell from "@/shared/components/ScreenShell";
import { FONTS } from "@/shared/constants/colors";

const REFERRAL_CODE = "NJU10";
const REFERRAL_LINK = "https://readyme.app/invite/NJU10";

const summaryCards = [
  { label: "Total Referrals", value: "0", icon: "group-add" },
  { label: "Amount Earned", value: "PKR 0", icon: "savings" },
  { label: "Current Earnings", value: "PKR 0", icon: "account-balance-wallet" },
];

const howItWorksSteps = [
  {
    title: "Share your referral code",
    description: "Invite your friends and classmates with your personal referral code.",
  },
  {
    title: "They join and enroll",
    description: "When someone signs up with your code, they receive a 10% discount.",
  },
  {
    title: "You earn rewards",
    description: "Receive a 10% commission on each successful paid referral.",
  },
];

const footerLinks = {
  explore: ["Home", "About Us", "Pricing", "Leaderboard", "Contact"],
  features: ["Notes & Solutions", "Topics Past Papers", "Yearly Past Papers", "AI Assistant", "Mock Builder"],
};

function formatInviteMessage() {
  return `Join ReadyMe with my referral code ${REFERRAL_CODE} and get 10% off your first purchase.\n${REFERRAL_LINK}`;
}

function SectionTitle({ children, colors }) {
  return (
    <Text style={{ color: colors.text, fontFamily: FONTS.bodyMedium, fontSize: 18 }}>{children}</Text>
  );
}

function StatCard({ icon, label, value, colors }) {
  return (
    <View
      className="rounded-[24px] border px-1 py-3"
      style={{ borderColor: colors.softBorder, backgroundColor: colors.surface }}
    >
      <View className="flex-row items-center gap-1">
        <View
          className="h-5 w-5 items-center justify-center rounded-2xl"
          style={{ backgroundColor: colors.input }}
        >
          <MaterialIcons name={icon} size={12} color={colors.secondary} />
        </View>
        <Text style={{ color: colors.muted, fontFamily: FONTS.body, fontSize: 10 }}>{label}</Text>
      </View>
      <Text
        className="mt-4 ml-2"
        style={{ color: colors.text, fontFamily: FONTS.heading, fontSize: 18 }}
      >
        {value}
      </Text>
    </View>
  );
}

export default function ReferralCodeScreen({ navigation }) {
  const { colors, isDark } = useAppTheme();

  const onShareCode = async () => {
    try {
      await Share.share({
        message: formatInviteMessage(),
        title: "Share your referral code",
      });
    } catch (error) {
      Alert.alert("Sharing failed", "Please try again in a moment.");
    }
  };

  const onCopyCode = () => {
    Alert.alert("Referral code", `Use this referral code when you invite someone: ${REFERRAL_CODE}`);
  };

  const onContactTeam = () => {
    Alert.alert("Contact Team", "Email: team@readyme.app\nPhone: +92 300 0000000");
  };

  return (
    <ScreenShell
      navigation={navigation}
      activeRoute="ReferralCode"
      title="My Referral Code"
      subtitle="Track invites, monitor rewards, and share your code from one place."
      showBack
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="pb-6">
          <AnimatedEntrance delay={40}>
            <LinearGradient
              colors={
                isDark
                  ? ["#2F2017", "#3A2415", "#26180F"]
                  : ["#FFF4E5", "#FFE7C7", "#FFF8EC"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="overflow-hidden rounded-[30px] border p-5"
              style={{ borderColor: colors.softBorder }}
            >
              <View
                pointerEvents="none"
                style={{
                  position: "absolute",
                  top: -40,
                  right: -20,
                  width: 120,
                  height: 120,
                  borderRadius: 999,
                  backgroundColor: isDark ? "rgba(255, 195, 120, 0.12)" : "rgba(255, 179, 72, 0.18)",
                }}
              />

              <View className="flex-row items-center gap-2">
                <MaterialIcons name="redeem" size={18} color={colors.secondary} />
                <Text style={{ color: colors.text, fontFamily: FONTS.bodyMedium, fontSize: 20 }}>
                  My Referral Code
                </Text>
              </View>

              <Text className="mt-5" style={{ color: colors.muted, fontFamily: FONTS.body, fontSize: 13 }}>
                Your referral code
              </Text>

              <View
                className="mt-2 rounded-[22px] border px-4 py-4"
                style={{
                  borderColor: colors.border,
                  backgroundColor: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.72)",
                }}
              >
                <View className="flex-row items-center justify-between">
                  <View>
                    <Text style={{ color: colors.text, fontFamily: FONTS.heading, fontSize: 30 }}>
                      {REFERRAL_CODE}
                    </Text>
                    <Text
                      className="mt-1 max-w-[220px]"
                      style={{ color: colors.muted, fontFamily: FONTS.body, fontSize: 13, lineHeight: 20 }}
                    >
                      Share this code to give a 10% discount and unlock your rewards.
                    </Text>
                  </View>

                  <Pressable
                    onPress={onCopyCode}
                    className="h-12 w-12 items-center justify-center rounded-2xl border"
                    style={{ borderColor: colors.border, backgroundColor: colors.input }}
                  >
                    <MaterialIcons name="content-copy" size={20} color={colors.secondary} />
                  </Pressable>
                </View>
              </View>

              <View className="mt-4 flex-row gap-3">
                <View
                  className="rounded-[20px] border px-4 py-3 w-[40%]"
                  style={{ borderColor: colors.softBorder, backgroundColor: colors.card }}
                >
                  <Text style={{ color: colors.dim, fontFamily: FONTS.body, fontSize: 12 }}>
                    Total referrals
                  </Text>
                  <Text
                    className="mt-2"
                    style={{ color: colors.text, fontFamily: FONTS.heading, fontSize: 28 }}
                  >
                    0
                  </Text>
                </View>
                <View
                  className="rounded-[20px] border px-4 py-3 w-[60%]"
                  style={{ borderColor: colors.softBorder, backgroundColor: colors.card }}
                >
                  <Text style={{ color: colors.dim, fontFamily: FONTS.body, fontSize: 12 }}>
                    Amount earned
                  </Text>
                  <Text
                    className="mt-2"
                    style={{ color: colors.text, fontFamily: FONTS.heading, fontSize: 24 }}
                  >
                    PKR 0
                  </Text>
                </View>
              </View>

              <View
                className="mt-3 rounded-[20px] border px-4 py-3"
                style={{ borderColor: colors.softBorder, backgroundColor: colors.card }}
              >
                <Text style={{ color: colors.dim, fontFamily: FONTS.body, fontSize: 12 }}>
                  Current earnings
                </Text>
                <Text className="mt-2" style={{ color: colors.text, fontFamily: FONTS.heading, fontSize: 24 }}>
                  PKR 0
                </Text>
              </View>

              <Text
                className="mt-4"
                style={{ color: colors.muted, fontFamily: FONTS.body, fontSize: 13, lineHeight: 20 }}
              >
                Share your code with friends. They receive 10% off and you earn rewards after their successful purchase.
              </Text>

              <Pressable
                onPress={onShareCode}
                className="mt-5 items-center rounded-[18px] px-4 py-4"
                style={{ backgroundColor: colors.secondary }}
              >
                <Text style={{ color: "#1B130A", fontFamily: FONTS.bodyMedium, fontSize: 15 }}>
                  Share Referral Code
                </Text>
              </Pressable>
            </LinearGradient>
          </AnimatedEntrance>

          <AnimatedEntrance delay={120} style={{ marginTop: 16 }}>
            <View className="flex-row gap-2">
              {summaryCards.map((card) => (
                <View key={card.label} style={{ flex: 1 }}>
                  <StatCard {...card} colors={colors} />
                </View>
              ))}
            </View>
          </AnimatedEntrance>

          <AnimatedEntrance delay={190} style={{ marginTop: 16 }}>
            <View
              className="rounded-[28px] border p-5"
              style={{ borderColor: colors.softBorder, backgroundColor: colors.surface }}
            >
              <SectionTitle colors={colors}>How It Works</SectionTitle>
              <View className="mt-4 gap-4">
                {howItWorksSteps.map((step, index) => (
                  <View key={step.title} className="flex-row gap-3">
                    <View
                      className="h-8 w-8 items-center justify-center rounded-full"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <Text style={{ color: "#FFFFFF", fontFamily: FONTS.bodyMedium, fontSize: 13 }}>
                        {index + 1}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text style={{ color: colors.text, fontFamily: FONTS.bodyMedium, fontSize: 15 }}>
                        {step.title}
                      </Text>
                      <Text
                        className="mt-1"
                        style={{ color: colors.muted, fontFamily: FONTS.body, fontSize: 13, lineHeight: 20 }}
                      >
                        {step.description}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </AnimatedEntrance>

          <AnimatedEntrance delay={260} style={{ marginTop: 16 }}>
            <View
              className="items-center rounded-[28px] border px-5 py-8"
              style={{ borderColor: colors.softBorder, backgroundColor: colors.surface }}
            >
              <View
                className="h-16 w-16 items-center justify-center rounded-full"
                style={{ backgroundColor: colors.input }}
              >
                <MaterialIcons name="groups" size={28} color={colors.primary} />
              </View>
              <Text
                className="mt-4"
                style={{ color: colors.text, fontFamily: FONTS.bodyMedium, fontSize: 18 }}
              >
                No referrals yet
              </Text>
              <Text
                className="mt-2 text-center"
                style={{ color: colors.muted, fontFamily: FONTS.body, fontSize: 13, lineHeight: 20 }}
              >
                Start sharing your code to see your referral activity and earnings here.
              </Text>
            </View>
          </AnimatedEntrance>

          <AnimatedEntrance delay={330} style={{ marginTop: 16 }}>
            <View
              className="rounded-[30px] border p-5"
              style={{ borderColor: colors.softBorder, backgroundColor: colors.surface }}
            >
              <View
                className="rounded-[24px] border px-4 py-4"
                style={{
                  borderColor: colors.border,
                  backgroundColor: isDark ? "#0E141E" : "#F4F9FF",
                }}
              >
                <Text style={{ color: colors.secondary, fontFamily: FONTS.bodyMedium, fontSize: 12 }}>
                  ReadyMe
                </Text>
                <Text
                  className="mt-2"
                  style={{ color: colors.text, fontFamily: FONTS.heading, fontSize: 24 }}
                >
                  Your study companion
                </Text>
                <Text
                  className="mt-3"
                  style={{ color: colors.muted, fontFamily: FONTS.body, fontSize: 13, lineHeight: 21 }}
                >
                  All your notes, past papers, AI help, and test-building tools in one place.
                </Text>
              </View>

              <View className="mt-5 flex-row gap-5">
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.dim, fontFamily: FONTS.bodyMedium, fontSize: 11 }}>
                    EXPLORE
                  </Text>
                  {footerLinks.explore.map((item) => (
                    <Text
                      key={item}
                      className="mt-3"
                      style={{ color: colors.muted, fontFamily: FONTS.body, fontSize: 13 }}
                    >
                      {item}
                    </Text>
                  ))}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: colors.dim, fontFamily: FONTS.bodyMedium, fontSize: 11 }}>
                    FEATURES
                  </Text>
                  {footerLinks.features.map((item) => (
                    <Text
                      key={item}
                      className="mt-3"
                      style={{ color: colors.muted, fontFamily: FONTS.body, fontSize: 13 }}
                    >
                      {item}
                    </Text>
                  ))}
                </View>
              </View>

              <View
                className="mt-5 rounded-[22px] border p-4"
                style={{ borderColor: colors.softBorder, backgroundColor: colors.card }}
              >
                <Text style={{ color: colors.dim, fontFamily: FONTS.bodyMedium, fontSize: 11 }}>
                  GET IN TOUCH
                </Text>
                <Text className="mt-3" style={{ color: colors.text, fontFamily: FONTS.body, fontSize: 14 }}>
                  team@readyme.app
                </Text>
                <Text className="mt-2" style={{ color: colors.text, fontFamily: FONTS.body, fontSize: 14 }}>
                  +92 300 0000000
                </Text>

                <Pressable
                  onPress={onContactTeam}
                  className="mt-4 items-center rounded-[16px] px-4 py-3"
                  style={{ backgroundColor: colors.secondary }}
                >
                  <Text style={{ color: "#1B130A", fontFamily: FONTS.bodyMedium, fontSize: 14 }}>
                    Contact Team
                  </Text>
                </Pressable>
              </View>
            </View>
          </AnimatedEntrance>
        </View>
      </ScrollView>
    </ScreenShell>
  );
}
