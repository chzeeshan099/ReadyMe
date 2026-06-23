import React from "react";
import FeatureScreen from "@/shared/components/FeatureScreen";

export default function TestMockBuilderScreen({ navigation }) {
  return (
    <FeatureScreen
      navigation={navigation}
      activeRoute="TestMockBuilder"
      badge="Mock Builder"
      title="Test / Mock Builder"
      subtitle="Apna custom test paper ya mock exam structure banane ke liye screen."
      cards={[
        {
          title: "Custom Sections",
          description: "Mcqs, short questions, aur long questions ko apni marzi se mix kar sakte hain.",
        },
        {
          title: "Timed Practice",
          description: "Exam simulation ke liye practice tests ko time-based flow mein arrange karein.",
        },
      ]}
    />
  );
}

