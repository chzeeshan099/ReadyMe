import React from "react";
import FeatureScreen from "@/shared/components/FeatureScreen";

export default function FeedbackScreen({ navigation }) {
  return (
    <FeatureScreen
      navigation={navigation}
      activeRoute="Feedback"
      badge="User Input"
      title="Feed back"
      subtitle="App improvement ke liye suggestions, ratings, aur issue reporting ka section."
      cards={[
        {
          title: "Share Suggestions",
          description: "Users yahan se feature requests aur usability feedback de sakte hain.",
        },
        {
          title: "Report Issues",
          description: "Agar kisi screen ya tool mein issue ho to uski reporting ka placeholder ready hai.",
        },
      ]}
    />
  );
}

