import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HistoryContext } from "../context/HistoryContext";
import { evaluate } from "mathjs";

const Button = ({ onPress, style, textStyle, children }) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex-1 m-2 py-5 rounded-2xl items-center justify-center ${style}`}
  >
    <Text className={`text-2xl font-bold ${textStyle}`}>{children}</Text>
  </TouchableOpacity>
);

function sanitize(expr) {
  return expr.replace(/×/g, "*").replace(/÷/g, "/");
}

export default function CalculatorScreen() {
  const [expr, setExpr] = useState("");
  const [preview, setPreview] = useState("0");
  const [historyOpen, setHistoryOpen] = useState(false);
  const { history, addEntry, clearHistory } = useContext(HistoryContext);

  function calculate(value) {
    try {
      if (!value) return "0";
      const sanitized = sanitize(value);
      // ❗ agar last character operator hai to preview mat karo
      if (/[+\-×÷*/.]$/.test(sanitized)) {
        return preview; // ya previous valid value
      }
      const safe = sanitized.replace(/[^-+*/0-9().]/g, "");
      const result = evaluate(safe);

      // const result = eval(safe);
      // ✅ agar result decimal hai to sirf 4 digits show karo
    if (!isNaN(result) && String(result).includes(".")) {
      return parseFloat(result).toFixed(4).replace(/\.?0+$/, "");
    }
      return String(result);
    } catch (e) {
      console.log("Invalid value:", value);
      console.log("error in catch", e);
      return "Error";
    }
  }

  function onPressKey(key) {
    console.log("Pressed key:", key);
    // Prevent double operators
    if (/[+\-×÷]/.test(key) && /[+\-×÷]$/.test(expr)) {
      const next = expr.slice(0, -1) + key;
      setExpr(next);
      return;
    }
    if (key === "AC") {
      setExpr("");
      setPreview("0");
      return;
    }

    if (key === "DEL") {
      const next = expr.slice(0, -1);
      setExpr(next);
      setPreview(calculate(next));
      return;
    }

    if (key === "=") {
      const result = calculate(expr);
      addEntry({ expression: expr, result });
      setExpr(result);
      setPreview(result);
      return;
    }

    const next = expr + key;
    setExpr(next);
    setPreview(calculate(next));
  }

  const rows = [
    ["AC", "DEL", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "="],
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-100 p-4">
      {/* Display Card */}
      <View className="bg-white rounded-3xl p-6 mb-4 shadow-md">
        <Text className="text-gray-400 text-right text-lg">{expr || "0"}</Text>
        <Text className="text-gray-800 text-right text-4xl font-bold mt-2">
          {preview}
        </Text>

        <TouchableOpacity
          onPress={() => setHistoryOpen(true)}
          className="mt-4 self-end"
        >
          <Text className="text-black font-semibold">View History</Text>
        </TouchableOpacity>
      </View>

      {/* Keypad */}
      <View className="flex-1 justify-end">
        {rows.map((row, i) => (
          <View key={i} className="flex-row">
            {row.map((k) => (
              <Button
                key={k}
                onPress={() => onPressKey(k)}
                style={
                  ["+", "-", "×", "÷", "="].includes(k)
                    ? "bg-black"
                    : "bg-white shadow-sm"
                }
                textStyle={
                  ["+", "-", "×", "÷", "="].includes(k)
                    ? "text-white"
                    : "text-gray-800"
                }
              >
                {k}
              </Button>
            ))}
          </View>
        ))}
      </View>

      {/* History Modal */}
      <Modal visible={historyOpen} animationType="slide">
        <SafeAreaView className="flex-1 bg-gray-100 p-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-bold text-gray-800">History</Text>
            <TouchableOpacity onPress={() => setHistoryOpen(false)}>
              <Text className="text-black font-semibold">Close</Text>
            </TouchableOpacity>
          </View>

          <ScrollView>
            {history.length === 0 ? (
              <Text className="text-gray-500">No history yet</Text>
            ) : (
              history.map((item) => (
                <View
                  key={item.id}
                  className="bg-white p-4 rounded-xl mb-3 shadow-sm"
                >
                  <Text className="text-gray-600">{item.expression}</Text>
                  <Text className="text-gray-800 font-bold text-lg">
                    {item.result}
                  </Text>
                </View>
              ))
            )}
          </ScrollView>

          <TouchableOpacity
            onPress={clearHistory}
            className="bg-black py-4 rounded-xl mt-4"
          >
            <Text className="text-white text-center font-semibold">
              Clear History
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}
