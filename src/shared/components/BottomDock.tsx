import React from "react";
import { Pressable, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, GLOW } from "../constants/colors";

const studentItems = [
  { label: "Home", icon: "home-filled", route: "Home" },
  { label: "Courses", icon: "menu-book", route: "Courses" },
  { label: "AI", icon: "forum", route: "AiChat" },
  { label: "Profile", icon: "person", route: "Profile" },
];

const teacherItems = [
  { label: "Teach", icon: "dashboard", route: "TeacherDashboard" },
  { label: "Courses", icon: "menu-book", route: "Courses" },
  { label: "AI", icon: "forum", route: "AiChat" },
  { label: "Profile", icon: "person", route: "Profile" },
];

const adminItems = [
  { label: "Admin", icon: "admin-panel-settings", route: "AdminPanel" },
  { label: "Courses", icon: "menu-book", route: "Courses" },
  { label: "AI", icon: "forum", route: "AiChat" },
  { label: "Profile", icon: "person", route: "Profile" },
];

export default function BottomDock({ navigation, activeRoute, role = "student" }) {
  const items =
    role === "admin" ? adminItems : role === "teacher" ? teacherItems : studentItems;

  return (
    <View className="px-5 pb-4 pt-3">
      <View
        className="flex-row items-center justify-between rounded-[28px] border px-3 py-3"
        style={{
          ...GLOW.panel,
          borderColor: "rgba(77,145,255,0.18)",
          backgroundColor: "rgba(5,14,31,0.95)",
        }}
      >
        {items.map((item) => {
          const active = activeRoute === item.route;
          return (
            <Pressable
              key={item.route}
              onPress={() => navigation.navigate(item.route)}
              className="min-w-[72px] items-center rounded-[20px] px-2 py-2"
              style={
                active
                  ? {
                      backgroundColor: "rgba(11,109,255,0.18)",
                      borderWidth: 1,
                      borderColor: "rgba(77,226,255,0.18)",
                    }
                  : undefined
              }
            >
              <MaterialIcons
                name={item.icon as any}
                size={22}
                color={active ? COLORS.cyan : "#7F93B8"}
              />
              <Text
                className="mt-1 text-[11px] font-semibold"
                style={{ color: active ? COLORS.text : "#7F93B8" }}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
