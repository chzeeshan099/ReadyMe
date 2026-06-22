import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import HomeScreen from "@/modules/home/screens/HomeScreen";
import CoursesScreen from "@/modules/courses/screens/CoursesScreen";
import CourseDetailScreen from "@/modules/courses/screens/CourseDetailScreen";
import AiChatScreen from "@/modules/ai-chat/screens/AiChatScreen";
import ProfileScreen from "@/modules/profile/screens/ProfileScreen";
import TeacherDashboardScreen from "@/modules/teacher/screens/TeacherDashboardScreen";
import AdminPanelScreen from "@/modules/admin/screens/AdminPanelScreen";
import { COLORS } from "@/shared/constants/colors";

const Stack = createNativeStackNavigator<any>();

export default function AppNavigator() {
  const user = useAuthStore((state) => state.user);
  const initialRouteName =
    user?.role === "admin"
      ? "AdminPanel"
      : user?.role === "teacher"
        ? "TeacherDashboard"
        : "Home";

  return (
    <Stack.Navigator
      id="app-stack"
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
        animation: "fade_from_bottom",
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="TeacherDashboard" component={TeacherDashboardScreen} />
      <Stack.Screen name="AdminPanel" component={AdminPanelScreen} />
      <Stack.Screen name="Courses" component={CoursesScreen} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
      <Stack.Screen name="AiChat" component={AiChatScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
