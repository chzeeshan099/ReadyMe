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
import Button from "../../../shared/components/Button";
import Input from "../../../shared/components/Input";
import { COLORS } from "../../../shared/constants/colors";
import Atmosphere from "../../../shared/components/Atmosphere";
import { useAuthStore } from "../store/auth.store";
import { register } from "../services/auth.service";
import {
  STUDENT_LEVELS,
  SUBJECT_OPTIONS,
  USER_ROLES,
} from "../types/auth.types";
import { formatRole } from "../../../shared/utils/helpers";

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
    <LinearGradient colors={COLORS.bgGradient} style={{ flex: 1 }}>
      <Atmosphere />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-6 pb-10 pt-16">
            <Text className="text-4xl font-black text-white">Join ReadyMe</Text>
            <Text className="mt-3 text-base leading-6 text-slate-300">
              Create a future-ready account with custom learning paths, AI help,
              and a dashboard built for your role.
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
                Role Setup
              </Text>
              <View className="mt-4 flex-row flex-wrap gap-3">
                {USER_ROLES.map((item) => {
                  const active = role === item;
                  return (
                    <Pressable
                      key={item}
                      onPress={() => setValue("role", item, { shouldValidate: true })}
                      className={`rounded-full px-4 py-3 ${active ? "bg-blue-500" : "bg-white/8"}`}
                    >
                      <Text className="font-semibold text-white">
                        {formatRole(item)}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>

              <Text className="mt-4 text-sm leading-6 text-slate-300">
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
                  <Text className="text-sm font-semibold text-white">Select Level</Text>
                  <View className="mt-3 flex-row flex-wrap gap-3">
                    {STUDENT_LEVELS.map((level) => {
                      const active = watch("level") === level;
                      return (
                        <Pressable
                          key={level}
                          onPress={() => setValue("level", level, { shouldValidate: true })}
                          className={`rounded-2xl border px-4 py-3 ${active ? "border-blue-400 bg-blue-500/20" : "border-white/10 bg-white/6"}`}
                        >
                          <Text className="font-medium text-white">{level}</Text>
                        </Pressable>
                      );
                    })}
                  </View>
                  {errors.level?.message ? (
                    <Text className="mt-2 text-sm text-rose-300">
                      {errors.level.message}
                    </Text>
                  ) : null}
                </View>
              ) : null}

              {role !== "admin" ? (
                <View className="mt-6">
                  <Text className="text-sm font-semibold text-white">
                    {role === "teacher" ? "Teaching Subjects" : "Preferred Subjects"}
                  </Text>
                  <View className="mt-3 flex-row flex-wrap gap-3">
                    {SUBJECT_OPTIONS.map((subject) => {
                      const active = subjects.includes(subject);
                      return (
                        <Pressable
                          key={subject}
                          onPress={() => toggleSubject(subject)}
                          className={`rounded-full px-4 py-3 ${active ? "bg-cyan-500/20" : "bg-white/8"}`}
                        >
                          <Text className="font-medium text-white">{subject}</Text>
                        </Pressable>
                      );
                    })}
                  </View>
                  {errors.subjects?.message ? (
                    <Text className="mt-2 text-sm text-rose-300">
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
            </View>

            <View className="mt-6 flex-row items-center justify-center gap-2">
              <Text className="text-slate-300">Already have an account?</Text>
              <Pressable onPress={() => navigation.navigate("Login")}>
                <Text className="font-semibold text-white">Sign in</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
