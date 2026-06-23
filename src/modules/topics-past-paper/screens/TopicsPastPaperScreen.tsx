import React from "react";
import FeatureScreen from "@/shared/components/FeatureScreen";

export default function TopicsPastPaperScreen({ navigation }) {
  return (
    <FeatureScreen
      navigation={navigation}
      activeRoute="TopicsPastPaper"
      badge="Topic Practice"
      title="Topics Past Paper"
      subtitle="Har topic ke mutabiq past paper practice aur targeted preparation ka section."
      cards={[
        {
          title: "Topic Buckets",
          description: "Questions ko chapters aur concepts ke hisaab se organize karne ke liye ready layout.",
        },
        {
          title: "Focused Practice",
          description: "Weak topics ko identify karke un par fast practice sessions bana sakte hain.",
        },
      ]}
    />
  );
}

