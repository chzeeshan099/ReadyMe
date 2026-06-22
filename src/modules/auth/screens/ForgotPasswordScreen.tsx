import React from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { COLORS } from "@/shared/constants/colors";
import Atmosphere from "@/shared/components/Atmosphere";
import { forgotPassword } from "@/modules/auth/services/auth.service";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
});

export default function ForgotPasswordScreen({ navigation }) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  const onSubmit = handleSubmit(async ({ email }) => {
    try {
      const result = await forgotPassword(email);
      Alert.alert("Reset password", result.message);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Unable to send reset", error.message);
    }
  });

  return (
    <LinearGradient colors={COLORS.bgGradient} style={{ flex: 1 }}>
      <Atmosphere />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1 justify-center px-6"
      >
        <View
          className="rounded-[28px] border bg-white/6 p-5"
          style={{
            borderColor: "rgba(77,145,255,0.35)",
            shadowColor: "#0B6DFF",
            shadowOpacity: 0.28,
            shadowRadius: 20,
            elevation: 10,
          }}
        >
          <Text className="text-3xl font-black text-white">Forgot Password</Text>
          <Text className="mt-3 text-base leading-6 text-slate-300">
            Enter your email and we will send reset instructions. If Supabase is
            not configured yet, the app shows a local demo message instead.
          </Text>

          <View className="mt-6">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  label="Email"
                  placeholder="student@readyme.app"
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  error={errors.email?.message}
                />
              )}
            />
          </View>

          <View className="mt-6 gap-3">
            <Button
              title={isSubmitting ? "Sending..." : "Send Reset Link"}
              onPress={onSubmit}
              disabled={isSubmitting}
            />
            <Pressable onPress={() => navigation.goBack()}>
              <Text className="text-center font-semibold text-blue-300">
                Back to login
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
