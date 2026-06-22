import React from "react";
import { Alert, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuthStore } from "../../auth/store/auth.store";
import { signOut } from "../../auth/services/auth.service";
import { buildProfileStats } from "../services/profile.service";
import { COLORS } from "../../../shared/constants/colors";
import { formatRole, getInitials } from "../../../shared/utils/helpers";

export default function ProfileScreen() {
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
    <LinearGradient colors={COLORS.bgGradient} style={{ flex: 1 }}>
      <SafeAreaView className="flex-1">
        <ScrollView className="flex-1 px-5 pt-5" showsVerticalScrollIndicator={false}>
          <View className="items-center rounded-[30px] border border-white/10 bg-white/6 p-6">
            <View className="h-20 w-20 items-center justify-center rounded-full bg-blue-500/20">
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
                  className="mb-3 w-[31%] rounded-[22px] bg-[#071224] px-3 py-4"
                >
                  <Text className="text-xs uppercase tracking-[2px] text-cyan-300">
                    {stat.label}
                  </Text>
                  <Text className="mt-2 text-base font-bold text-white">{stat.value}</Text>
                </View>
              ))}
            </View>
          </View>

          <View className="mt-6 rounded-[28px] border border-white/10 bg-white/6 p-5">
            <Text className="text-lg font-semibold text-white">Academic Setup</Text>
            <Text className="mt-3 text-slate-300">
              Level: {user?.level || "Not selected"}
            </Text>
            <Text className="mt-2 text-slate-300">
              Subjects: {user?.subjects?.length ? user.subjects.join(", ") : "Not selected"}
            </Text>
          </View>

          <Pressable
            onPress={onSignOut}
            className="mb-10 mt-6 rounded-2xl bg-rose-500/90 px-5 py-4"
          >
            <Text className="text-center text-base font-bold text-white">Sign Out</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
