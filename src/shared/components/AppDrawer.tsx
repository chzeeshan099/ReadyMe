import React, { useEffect, useRef } from "react";
import { Animated, Pressable, ScrollView, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "@/shared/constants/colors";
import { APP_MENU_ITEMS } from "@/shared/navigation/appMenu";

export default function AppDrawer({
  visible,
  onClose,
  navigation,
  activeRoute,
}) {
  const slideAnim = useRef(new Animated.Value(320)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: visible ? 0 : 320,
        duration: 240,
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
      <Animated.View
        style={{ opacity: overlayAnim }}
        className="absolute inset-0 bg-black/55"
      >
        <Pressable onPress={onClose} className="flex-1" />
      </Animated.View>

      <Animated.View
        style={{ transform: [{ translateX: slideAnim }] }}
        className="absolute bottom-0 right-0 top-0 w-[84%] max-w-[360px] border-l border-edge-soft bg-[#06101F]"
      >
        <View className="flex-1 px-5 pb-6 pt-14">
          <View className="mb-6 flex-row items-center justify-between">
            <View>
              <Text className="text-[11px] uppercase tracking-[4px] text-cyan-300">
                ReadyMe Menu
              </Text>
              <Text className="mt-2 text-[28px] font-black text-white">Navigate</Text>
            </View>
            <Pressable
              onPress={onClose}
              className="h-11 w-11 items-center justify-center rounded-2xl border border-edge-soft bg-white/6"
            >
              <MaterialIcons name="close" size={22} color={COLORS.text} />
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
                  className={`mb-3 flex-row items-center rounded-[24px] border px-4 py-4 ${
                    active
                      ? "border-edge-cyan bg-brand-blue/15"
                      : "border-edge-soft bg-white/6"
                  }`}
                >
                  <View className="h-11 w-11 items-center justify-center rounded-2xl bg-black/20">
                    <MaterialIcons
                      name={item.icon as any}
                      size={21}
                      color={active ? COLORS.cyan : "#D9E4F5"}
                    />
                  </View>
                  <Text className="ml-4 flex-1 text-[16px] font-semibold text-white">
                    {item.label}
                  </Text>
                  <MaterialIcons
                    name="chevron-right"
                    size={22}
                    color={active ? COLORS.cyan : "#7F93B8"}
                  />
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </Animated.View>
    </View>
  );
}

