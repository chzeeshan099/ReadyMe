import React, { useEffect, useRef } from "react";
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import { COLORS } from "../../../shared/constants/colors";
import Atmosphere from "../../../shared/components/Atmosphere";
import { login } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";
import { USER_ROLES } from "../types/auth.types";
import { formatRole } from "../../../shared/utils/helpers";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(USER_ROLES),
});

export default function LoginScreen({ navigation }) {
  const setAuth = useAuthStore((state) => state.setAuth);
  const setLoading = useAuthStore((state) => state.setLoading);
  const loading = useAuthStore((state) => state.loading);
  const glow = useRef(new Animated.Value(0.5)).current;
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

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glow, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(glow, {
          toValue: 0.45,
          duration: 1800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [glow]);

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
    <LinearGradient colors={COLORS.bgGradient} style={{ flex: 1 }}>
      <Atmosphere />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 pt-20 pb-8">
            <Animated.View
              style={{
                opacity: glow,
                transform: [
                  {
                    scale: glow.interpolate({
                      inputRange: [0.45, 1],
                      outputRange: [0.96, 1.04],
                    }),
                  },
                ],
              }}
              className="absolute -top-10 right-[-30px] h-64 w-64 rounded-full bg-[#0B6DFF]/20"
            />

            <Text className="text-4xl font-black text-white">ReadyMe</Text>
            <Text className="mt-3 text-base leading-6 text-slate-300">
              Cambridge-assistant style learning app with guided study, AI help,
              and role-based dashboards.
            </Text>

            <View
              className="mt-8 rounded-[28px] border bg-white/6 p-5"
              style={{
                borderColor: "rgba(77,145,255,0.35)",
                shadowColor: "#0B6DFF",
                shadowOpacity: 0.28,
                shadowRadius: 20,
                elevation: 10,
              }}
            >
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
                      className={`rounded-full px-4 py-3 ${active ? "bg-blue-500" : "bg-white/8"}`}
                    >
                      <Text className="font-semibold text-white">
                        {formatRole(role)}
                      </Text>
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
                <Text className="font-semibold text-blue-300">
                  Forgot password?
                </Text>
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
