import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DashboardScreen } from "@/modules/dashboard";
import { NotesScreen } from "@/modules/notes";
import { TopicsPastPaperScreen } from "@/modules/topics-past-paper";
import { YearlyPastPaperScreen } from "@/modules/yearly-past-paper";
import { AiAssistantScreen } from "@/modules/ai-assistant";
import { TestMockBuilderScreen } from "@/modules/test-mock-builder";
import { PricingScreen } from "@/modules/pricing";
import { FeedbackScreen } from "@/modules/feedback";
import { ReferralCodeScreen } from "@/modules/referral-code";
import AiChatScreen from "@/modules/ai-chat/screens/AiChatScreen";
import ProfileScreen from "@/modules/profile/screens/ProfileScreen";
import TeacherDashboardScreen from "@/modules/teacher/screens/TeacherDashboardScreen";
import AdminPanelScreen from "@/modules/admin/screens/AdminPanelScreen";
import CoursesScreen from "@/modules/courses/screens/CoursesScreen";
import CourseDetailScreen from "@/modules/courses/screens/CourseDetailScreen";
const Stack = createNativeStackNavigator<any>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      id="app-stack"
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Notes" component={NotesScreen} />
      <Stack.Screen name="TopicsPastPaper" component={TopicsPastPaperScreen} />
      <Stack.Screen name="YearlyPastPaper" component={YearlyPastPaperScreen} />
      <Stack.Screen name="AiAssistant" component={AiAssistantScreen} />
      <Stack.Screen name="TestMockBuilder" component={TestMockBuilderScreen} />
      <Stack.Screen name="Pricing" component={PricingScreen} />
      <Stack.Screen name="Feedback" component={FeedbackScreen} />
      <Stack.Screen name="ReferralCode" component={ReferralCodeScreen} />
      <Stack.Screen name="AiChat" component={AiChatScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="TeacherDashboard" component={TeacherDashboardScreen} />
      <Stack.Screen name="AdminPanel" component={AdminPanelScreen} />
      <Stack.Screen name="Courses" component={CoursesScreen} />
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
    </Stack.Navigator>
  );
}
