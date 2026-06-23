import React from "react";
import {
  Alert,
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
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import { forgotPassword } from "@/modules/auth/services/auth.service";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import { FONTS } from "@/shared/constants/colors";
import AnimatedEntrance from "@/shared/components/AnimatedEntrance";
import { AuthCard, AuthHeader } from "@/modules/auth/components";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
});

export default function ForgotPasswordScreen({ navigation }) {
  const { colors } = useAppTheme();
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
    <LinearGradient colors={colors.bgGradient} className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <View className="justify-center px-5 pb-8 pt-10">
            <AnimatedEntrance delay={40}>
              <AuthHeader
                title="Forgot Password"
                subtitle="Enter your email and we will prepare reset instructions for your account."
                badge="Recovery"
                showBack
                onBack={() => navigation.goBack()}
              />
            </AnimatedEntrance>

            <AnimatedEntrance delay={120}>
              <AuthCard title="Reset Access">
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

                <Text
                  className="mt-4 text-sm leading-6"
                  style={{ color: colors.muted, fontFamily: FONTS.body }}
                >
                  If Supabase is not configured yet, the app will show a local demo message.
                </Text>

                <View className="mt-6 gap-3">
                  <Button
                    title={isSubmitting ? "Sending..." : "Send Reset Link"}
                    onPress={onSubmit}
                    disabled={isSubmitting}
                  />
                  <Pressable onPress={() => navigation.goBack()}>
                    <Text
                      className="text-center"
                      style={{ color: colors.primary, fontFamily: FONTS.bodyMedium }}
                    >
                      Back to login
                    </Text>
                  </Pressable>
                </View>
              </AuthCard>
            </AnimatedEntrance>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
