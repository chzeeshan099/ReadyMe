import { StatusBar } from "expo-status-bar";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CalculatorScreen from "./src/screens/CalculatorScreen";
import { HistoryProvider } from "./src/context/HistoryContext";
import "./global.css";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <HistoryProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <SafeAreaView className="flex-1 bg-black">
            <StatusBar style="light" />
            <Stack.Navigator
              initialRouteName="Calculator"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="Calculator" component={CalculatorScreen} />
            </Stack.Navigator>
          </SafeAreaView>
        </NavigationContainer>
      </SafeAreaProvider>
    </HistoryProvider>
  );
}
