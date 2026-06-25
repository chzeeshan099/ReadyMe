import React, { useEffect, useRef } from "react";
import { Alert, Animated, Pressable, ScrollView, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppTheme } from "@/core/providers/ThemeProvider";
import { FONTS } from "@/shared/constants/colors";
import { APP_MENU_ITEMS } from "@/shared/navigation/appMenu";
import { signOut } from "@/modules/auth/services/auth.service";
import { useAuthStore } from "@/modules/auth/store/auth.store";

export default function AppDrawer({
  visible,
  onClose,
  navigation,
  activeRoute,
}) {
  const { colors } = useAppTheme();
  const user = useAuthStore((state) => state.user);
  const signOutLocal = useAuthStore((state) => state.signOutLocal);
  const slideAnim = useRef(new Animated.Value(320)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  const onLogout = async () => {
    try {
      await signOut();
      signOutLocal();
      onClose();
    } catch (error) {
      Alert.alert("Logout failed", error.message);
    }
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: visible ? 0 : 320,
        duration: 260,
        useNativeDriver: true,
      }),
      Animated.timing(overlayAnim, {
        toValue: visible ? 1 : 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, [overlayAnim, slideAnim, visible]);

  const pointerEvents = visible ? "auto" : "none";

  return (
    <View pointerEvents={pointerEvents} className="absolute inset-0 z-50">
      <Animated.View style={{ opacity: overlayAnim }} className="absolute inset-0">
        <Pressable onPress={onClose} className="flex-1" style={{ backgroundColor: colors.overlay }} />
      </Animated.View>

      <Animated.View
        style={{
          transform: [{ translateX: slideAnim }],
          borderColor: colors.border,
          backgroundColor: colors.surface,
        }}
        className="absolute bottom-0 right-0 top-0 w-[84%] max-w-[360px] border-l"
      >
        <View className="flex-1 px-5 pb-6 pt-14">
          <View className="mb-6 flex-row items-center justify-between">
            <View>
              <Text
                className="text-[11px] uppercase tracking-[4px]"
                style={{ color: colors.accent, fontFamily: FONTS.bodyMedium }}
              >
                ReadyMe Menu
              </Text>
              <Text
                className="mt-2 text-[28px] font-black"
                style={{ color: colors.text, fontFamily: FONTS.heading }}
              >
                Navigate
              </Text>
            </View>

            <Pressable
              onPress={onClose}
              className="h-11 w-11 items-center justify-center rounded-2xl border"
              style={{ borderColor: colors.softBorder, backgroundColor: colors.card }}
            >
              <MaterialIcons name="close" size={22} color={colors.text} />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {APP_MENU_ITEMS.map((item) => {
              const active = activeRoute === item.route;
              return (
                <Pressable
                  key={item.route}
                  onPress={() => {
                    onClose();
                    if (!active) {
                      navigation.navigate(item.route);
                    }
                  }}
                  className="flex-row items-center"
                  // className="mb-2 flex-row items-center rounded-[24px] border px-4 py-4"
                  style={{
                    borderColor: active ? colors.primary : colors.softBorder,
                    backgroundColor: active && colors.card,
                    borderRadius:10,
                  }}
                >
                  <View
                    className="h-11 w-11 items-center justify-center rounded-2xl"
                    // style={{ backgroundColor: active ? colors.primaryDeep : colors.card }}
                  >
                    <MaterialIcons
                      name={item.icon as any}
                      size={21}
                      color={active ? colors.primary : colors.text}
                    />
                  </View>
                  <Text
                    className="ml-4 flex-1 text-[16px] font-semibold"
                    style={{ color: active ? colors.primary : colors.text, fontFamily: FONTS.bodyMedium }}
                  >
                    {item.label}
                  </Text>
                  <MaterialIcons
                    name="chevron-right"
                    size={22}
                    color={active ? colors.primary : colors.dim}
                  />
                </Pressable>
              );
            })}

            {user ? (
              <Pressable
                onPress={onLogout}
                className="mt-6 flex-row items-center rounded-[24px] border px-4 py-4"
                style={{ borderColor: colors.danger, backgroundColor: colors.input }}
              >
                <View
                  className="h-11 w-11 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: colors.danger }}
                >
                  <MaterialIcons name="logout" size={20} color="#FFFFFF" />
                </View>
                <Text
                  className="ml-4 flex-1 text-[16px]"
                  style={{ color: colors.text, fontFamily: FONTS.bodyMedium }}
                >
                  Logout
                </Text>
                <MaterialIcons name="chevron-right" size={22} color={colors.danger} />
              </Pressable>
            ) : null}
          </ScrollView>
        </View>
      </Animated.View>
    </View>
  );
}
