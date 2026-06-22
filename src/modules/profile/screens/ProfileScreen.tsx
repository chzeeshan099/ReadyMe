import React from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { signOut } from "@/modules/auth/services/auth.service";
import { buildProfileStats } from "@/modules/profile/services/profile.service";
import ScreenShell from "@/shared/components/ScreenShell";
import { formatRole, getInitials } from "@/shared/utils/helpers";
import Button from "@/shared/components/Button";

export default function ProfileScreen({ navigation }) {
  const user = useAuthStore((state) => state.user);
  const signOutLocal = useAuthStore((state) => state.signOutLocal);
  const stats = buildProfileStats(user);

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
          <View className="items-center rounded-[30px] border border-edge-soft bg-white/6 p-6 shadow-neon-sm">
            <View className="h-20 w-20 items-center justify-center rounded-full bg-brand-blue/20">
              <Text className="text-2xl font-black text-white">
                {getInitials(user?.fullName)}
              </Text>
            </View>
            <Text className="mt-4 text-3xl font-black text-white">
              {user?.fullName}
            </Text>
            <Text className="mt-2 text-blue-300">{formatRole(user?.role)}</Text>
            <Text className="mt-3 text-center leading-6 text-slate-300">
              {user?.bio}
            </Text>

            <View className="mt-6 w-full flex-row flex-wrap justify-between">
              {stats.map((stat) => (
                <View
                  key={stat.label}
                  className="mb-3 w-[31%] rounded-[22px] border border-edge-cyan bg-panel px-3 py-4"
                >
                  <Text className="text-xs uppercase tracking-[2px] text-cyan-300">
                    {stat.label}
                  </Text>
                  <Text className="mt-2 text-base font-bold text-white">{stat.value}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className="mt-6 rounded-[28px] border border-edge-soft bg-white/6 p-5">
            <Text className="text-lg font-semibold text-white">Academic Setup</Text>
            <Text className="mt-3 text-slate-300">
              Level: {user?.level || "Not selected"}
            </Text>
            <Text className="mt-2 text-slate-300">
              Subjects: {user?.subjects?.length ? user.subjects.join(", ") : "Not selected"}
            </Text>
          </View>

          <View className="mb-6 mt-6">
            <Button title="Sign Out" onPress={onSignOut} />
          </View>
        </View>
      </ScrollView>
    </ScreenShell>
  );
}
