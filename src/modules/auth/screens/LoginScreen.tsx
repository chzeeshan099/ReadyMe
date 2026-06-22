import React from "react";
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { COLORS } from "@/shared/constants/colors";
import { login } from "@/modules/auth/services/auth.service";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { USER_ROLES } from "@/modules/auth/types/auth.types";
import { formatRole } from "@/shared/utils/helpers";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(USER_ROLES),
});

export default function LoginScreen({ navigation }) {
  const setAuth = useAuthStore((state) => state.setAuth);
  const setLoading = useAuthStore((state) => state.setLoading);
  const loading = useAuthStore((state) => state.loading);
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      role: "student",
    },
  });

  const selectedRole = watch("role");

  const onSubmit = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const result = await login(values);
      setAuth(result);
    } catch (error) {
      Alert.alert("Login failed", error.message);
    } finally {
      setLoading(false);
    }
  });

  return (
    <LinearGradient colors={COLORS.bgGradient} className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View className="flex-1 px-6 pt-20 pb-8">
            <Text className="text-4xl font-black text-white">ReadyMe</Text>
            <Text className="mt-3 text-base leading-6 text-slate-300">
              Cambridge-assistant style learning app with guided study, AI help,
              and role-based dashboards.
            </Text>

            <View className="mt-8 rounded-[28px] border border-edge-soft bg-white/6 p-5 shadow-neon-md">
              <Text className="text-xs uppercase tracking-[3px] text-blue-300">
                Choose Role
              </Text>
              <View className="mt-4 flex-row flex-wrap gap-3">
                {USER_ROLES.map((role) => {
                  const active = selectedRole === role;
                  return (
                    <Pressable
                      key={role}
                      onPress={() => setValue("role", role)}
                      className={`rounded-full px-4 py-3 ${active ? "border border-edge-cyan bg-brand-blue/20" : "bg-white/8"}`}
                    >
                      <Text className="font-semibold text-white">{formatRole(role)}</Text>
                    </Pressable>
                  );
                })}
              </View>

              <View className="mt-6 gap-4">
                <Controller
                  control={control}
                  name="email"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label="Email"
                      placeholder="student@readyme.app"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      error={errors.email?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      label="Password"
                      placeholder="Enter password"
                      value={value}
                      onChangeText={onChange}
                      secureTextEntry
                      error={errors.password?.message}
                    />
                  )}
                />

                <Button
                  title={loading ? "Signing In..." : `Continue as ${formatRole(selectedRole)}`}
                  onPress={onSubmit}
                  disabled={loading}
                />
              </View>

              <Pressable
                onPress={() => navigation.navigate("ForgotPassword")}
                className="mt-4 self-end"
              >
                <Text className="font-semibold text-blue-300">Forgot password?</Text>
              </Pressable>
            </View>

            <View className="mt-6 flex-row items-center justify-center gap-2">
              <Text className="text-slate-300">New to ReadyMe?</Text>
              <Pressable onPress={() => navigation.navigate("Register")}>
                <Text className="font-semibold text-white">Create account</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
