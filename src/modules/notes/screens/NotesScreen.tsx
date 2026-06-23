import React from "react";
import FeatureScreen from "@/shared/components/FeatureScreen";

export default function NotesScreen({ navigation }) {
  return (
    <FeatureScreen
      navigation={navigation}
      activeRoute="Notes"
      badge="Study Notes"
      title="Notes"
      subtitle="Class notes, revision points, aur short summaries yahan manage karein."
      cards={[
        {
          title: "Quick Notes",
          description: "Topic wise notes ko save, review, aur update karne ke liye yeh section ready hai.",
        },
        {
          title: "Revision Lists",
          description: "Important formulas, definitions, aur last-minute prep ke bullets yahan rakh sakte hain.",
        },
      ]}
    />
  );
}

