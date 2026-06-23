import React from "react";
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import { FONTS } from "@/shared/constants/colors";
import { login } from "@/modules/auth/services/auth.service";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { USER_ROLES } from "@/modules/auth/types/auth.types";
import { formatRole } from "@/shared/utils/helpers";
import AnimatedEntrance from "@/shared/components/AnimatedEntrance";
import { AuthCard, AuthHeader, AuthOptionChip } from "@/modules/auth/components";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(USER_ROLES),
});

export default function LoginScreen({ navigation }) {
  const { colors } = useAppTheme();
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
    <LinearGradient colors={colors.bgGradient} className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View className="flex-1 px-5 pt-10 pb-8">
            <AnimatedEntrance delay={40}>
              <AuthHeader
                title="ReadyMe"
                subtitle="Study smarter with a fresh dashboard, AI help, and focused exam tools."
                badge="Welcome back"
              />
            </AnimatedEntrance>

            <AnimatedEntrance delay={120}>
              <AuthCard title="Choose Role">
                <View className="flex-row flex-wrap gap-3">
                  {USER_ROLES.map((role) => (
                    <AuthOptionChip
                      key={role}
                      active={selectedRole === role}
                      label={formatRole(role)}
                      onPress={() => setValue("role", role)}
                    />
                  ))}
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
                  <Text style={{ color: colors.primary, fontFamily: FONTS.bodyMedium }}>
                    Forgot password?
                  </Text>
                </Pressable>
              </AuthCard>
            </AnimatedEntrance>

            <AnimatedEntrance delay={190}>
              <View className="mt-6 flex-row items-center justify-center gap-2">
                <Text style={{ color: colors.muted, fontFamily: FONTS.body }}>
                  New to ReadyMe?
                </Text>
                <Pressable onPress={() => navigation.navigate("Register")}>
                  <Text style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}>
                    Create account
                  </Text>
                </Pressable>
              </View>
            </AnimatedEntrance>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
