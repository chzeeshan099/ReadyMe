import React from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { signOut } from "@/modules/auth/services/auth.service";
import { buildProfileStats } from "@/modules/profile/services/profile.service";
import ScreenShell from "@/shared/components/ScreenShell";
import { formatRole, getInitials } from "@/shared/utils/helpers";
import Button from "@/shared/components/Button";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import { FONTS } from "@/shared/constants/colors";
import AnimatedEntrance from "@/shared/components/AnimatedEntrance";

export default function ProfileScreen({ navigation }) {
  const user = useAuthStore((state) => state.user);
  const signOutLocal = useAuthStore((state) => state.signOutLocal);
  const stats = buildProfileStats(user);
  const { colors } = useAppTheme();

  const onSignOut = async () => {
    try {
      await signOut();
      signOutLocal();
    } catch (error) {
      Alert.alert("Sign out failed", error.message);
    }
  };

  return (
    <ScreenShell
      navigation={navigation}
      activeRoute="Profile"
      role={user?.role}
      title="Profile"
      subtitle="Account details, stats, and your current learning setup."
      showBack
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="pb-4">
          <AnimatedEntrance delay={60}>
            <View
              className="items-center rounded-[30px] border p-6 shadow-neon-sm"
              style={{ borderColor: colors.softBorder, backgroundColor: colors.card }}
            >
              <View
                className="h-20 w-20 items-center justify-center rounded-full"
                style={{ backgroundColor: colors.primary }}
              >
                <Text style={{ color: "#FFFFFF", fontFamily: FONTS.heading, fontSize: 24 }}>
                  {getInitials(user?.fullName)}
                </Text>
              </View>
              <Text
                className="mt-4 text-3xl"
                style={{ color: colors.text, fontFamily: FONTS.heading }}
              >
                {user?.fullName}
              </Text>
              <Text style={{ color: colors.primary, fontFamily: FONTS.bodyMedium }} className="mt-2">
                {formatRole(user?.role)}
              </Text>
              <Text
                className="mt-3 text-center leading-6"
                style={{ color: colors.muted, fontFamily: FONTS.body }}
              >
                {user?.bio}
              </Text>

              <View className="mt-6 w-full flex-row flex-wrap justify-between">
                {stats.map((stat, index) => (
                  <AnimatedEntrance key={stat.label} delay={120 + index * 70} style={{ width: "31%" }}>
                    <View
                      className="mb-3 rounded-[22px] border px-3 py-4"
                      style={{ borderColor: colors.border, backgroundColor: colors.surface }}
                    >
                      <Text
                        className="text-xs uppercase tracking-[2px]"
                        style={{ color: colors.secondary, fontFamily: FONTS.bodyMedium }}
                      >
                        {stat.label}
                      </Text>
                      <Text
                        className="mt-2 text-base"
                        style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}
                      >
                        {stat.value}
                      </Text>
                    </View>
                  </AnimatedEntrance>
                ))}
              </View>
            </View>
          </AnimatedEntrance>

          <AnimatedEntrance delay={220} style={{ marginTop: 24 }}>
            <View
              className="rounded-[28px] border p-5"
              style={{ borderColor: colors.softBorder, backgroundColor: colors.surface }}
            >
              <Text style={{ color: colors.text, fontFamily: FONTS.bodyMedium, fontSize: 18 }}>
                Academic Setup
              </Text>
              <Text className="mt-3" style={{ color: colors.muted, fontFamily: FONTS.body }}>
                Level: {user?.level || "Not selected"}
              </Text>
              <Text className="mt-2" style={{ color: colors.muted, fontFamily: FONTS.body }}>
                Subjects: {user?.subjects?.length ? user.subjects.join(", ") : "Not selected"}
              </Text>
            </View>
          </AnimatedEntrance>

          <AnimatedEntrance delay={280} style={{ marginTop: 24, marginBottom: 24 }}>
            <Button title="Sign Out" onPress={onSignOut} />
          </AnimatedEntrance>
        </View>
      </ScrollView>
    </ScreenShell>
  );
}
