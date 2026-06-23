import React, { useMemo } from "react";
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
import { useAppTheme } from "@/core/providers/ThemeProvider";
import { FONTS } from "@/shared/constants/colors";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { register } from "@/modules/auth/services/auth.service";
import {
  STUDENT_LEVELS,
  SUBJECT_OPTIONS,
  USER_ROLES,
} from "@/modules/auth/types/auth.types";
import { formatRole } from "@/shared/utils/helpers";
import AnimatedEntrance from "@/shared/components/AnimatedEntrance";
import { AuthCard, AuthHeader, AuthOptionChip } from "@/modules/auth/components";

const schema = z
  .object({
    fullName: z.string().min(3, "Full name is required"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(USER_ROLES),
    level: z.string().optional(),
    subjects: z.array(z.string()).default([]),
  })
  .superRefine((data, ctx) => {
    if (data.role === "student" && !data.level) {
      ctx.addIssue({
        code: "custom",
        path: ["level"],
        message: "Please select a student level",
      });
    }

    if ((data.role === "student" || data.role === "teacher") && data.subjects.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["subjects"],
        message: "Select at least one subject",
      });
    }
  });

export default function RegisterScreen({ navigation }) {
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
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      role: "student",
      level: "",
      subjects: [],
    },
  });

  const role = watch("role");
  const subjects = watch("subjects");

  const helperText = useMemo(() => {
    if (role === "admin") {
      return "Admins go straight into a focused control panel after sign-up.";
    }

    if (role === "teacher") {
      return "Teachers can set expertise areas and manage learner activity.";
    }

    return "Students are asked for level and subjects so their dashboard feels personal from day one.";
  }, [role]);

  const toggleSubject = (subject) => {
    const next = subjects.includes(subject)
      ? subjects.filter((item) => item !== subject)
      : [...subjects, subject];

    setValue("subjects", next, { shouldValidate: true });
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const result = await register(values);
      setAuth(result);
    } catch (error) {
      Alert.alert("Registration failed", error.message);
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
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-5 pb-10 pt-10">
            <AnimatedEntrance delay={40}>
              <AuthHeader
                title="Join ReadyMe"
                subtitle="Create your account and unlock a more modern, personalized learning space."
                badge="Create account"
                showBack
                onBack={() => navigation.goBack()}
              />
            </AnimatedEntrance>

            <AnimatedEntrance delay={120}>
              <AuthCard title="Role Setup">
                <View className="flex-row flex-wrap gap-3">
                  {USER_ROLES.map((item) => (
                    <AuthOptionChip
                      key={item}
                      active={role === item}
                      label={formatRole(item)}
                      onPress={() => setValue("role", item, { shouldValidate: true })}
                    />
                  ))}
                </View>

                <Text
                  className="mt-4 text-sm leading-6"
                  style={{ color: colors.muted, fontFamily: FONTS.body }}
                >
                  {helperText}
                </Text>

                <View className="mt-6 gap-4">
                  <Controller
                    control={control}
                    name="fullName"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        label="Full Name"
                        placeholder="Muhammad Ali"
                        value={value}
                        onChangeText={onChange}
                        error={errors.fullName?.message}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                      <Input
                        label="Email"
                        placeholder="name@readyme.app"
                        value={value}
                        onChangeText={onChange}
                        autoCapitalize="none"
                        keyboardType="email-address"
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
                        placeholder="Create password"
                        value={value}
                        onChangeText={onChange}
                        secureTextEntry
                        error={errors.password?.message}
                      />
                    )}
                  />
                </View>

                {role === "student" ? (
                  <View className="mt-6">
                    <Text
                      className="mb-3 text-sm"
                      style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}
                    >
                      Select Level
                    </Text>
                    <View className="flex-row flex-wrap gap-3">
                      {STUDENT_LEVELS.map((level) => (
                        <AuthOptionChip
                          key={level}
                          active={watch("level") === level}
                          label={level}
                          rounded="large"
                          onPress={() =>
                            setValue("level", level, { shouldValidate: true })
                          }
                        />
                      ))}
                    </View>
                    {errors.level?.message ? (
                      <Text
                        className="mt-2 text-sm"
                        style={{ color: colors.danger, fontFamily: FONTS.body }}
                      >
                        {errors.level.message}
                      </Text>
                    ) : null}
                  </View>
                ) : null}

                {role !== "admin" ? (
                  <View className="mt-6">
                    <Text
                      className="mb-3 text-sm"
                      style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}
                    >
                      {role === "teacher" ? "Teaching Subjects" : "Preferred Subjects"}
                    </Text>
                    <View className="flex-row flex-wrap gap-3">
                      {SUBJECT_OPTIONS.map((subject) => (
                        <AuthOptionChip
                          key={subject}
                          active={subjects.includes(subject)}
                          label={subject}
                          onPress={() => toggleSubject(subject)}
                        />
                      ))}
                    </View>
                    {errors.subjects?.message ? (
                      <Text
                        className="mt-2 text-sm"
                        style={{ color: colors.danger, fontFamily: FONTS.body }}
                      >
                        {errors.subjects.message}
                      </Text>
                    ) : null}
                  </View>
                ) : null}

                <View className="mt-8">
                  <Button
                    title={loading ? "Creating Account..." : "Create ReadyMe Account"}
                    onPress={onSubmit}
                    disabled={loading}
                  />
                </View>
              </AuthCard>
            </AnimatedEntrance>

            <AnimatedEntrance delay={180}>
              <View className="mt-6 flex-row items-center justify-center gap-2">
                <Text style={{ color: colors.muted, fontFamily: FONTS.body }}>
                  Already have an account?
                </Text>
                <Pressable onPress={() => navigation.navigate("Login")}>
                  <Text style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}>
                    Sign in
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

