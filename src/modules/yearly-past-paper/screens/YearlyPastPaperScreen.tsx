import React from "react";
import FeatureScreen from "@/shared/components/FeatureScreen";

export default function YearlyPastPaperScreen({ navigation }) {
  return (
    <FeatureScreen
      navigation={navigation}
      activeRoute="YearlyPastPaper"
      badge="Yearly Archive"
      title="Yearly Past Paper"
      subtitle="Year wise papers browse karne aur exam trend samajhne ke liye dedicated screen."
      cards={[
        {
          title: "Year Filters",
          description: "Alag alag saalon ke papers ko easily browse aur compare kar sakte hain.",
        },
        {
          title: "Exam Trends",
          description: "Repeated patterns aur important years ko dekhne ke liye clean overview diya gaya hai.",
        },
      ]}
    />
  );
}

