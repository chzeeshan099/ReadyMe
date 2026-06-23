import React from "react";
import FeatureScreen from "@/shared/components/FeatureScreen";

export default function PricingScreen({ navigation }) {
  return (
    <FeatureScreen
      navigation={navigation}
      activeRoute="Pricing"
      badge="Plans"
      title="Pricing"
      subtitle="App plans, premium features, aur upgrade options ko show karne wali screen."
      cards={[
        {
          title: "Starter Plan",
          description: "Basic study access aur day-to-day workflow ke liye starter level package.",
        },
        {
          title: "Premium Access",
          description: "AI support, mock tools, aur deeper paper workflows ke liye premium option.",
        },
      ]}
    />
  );
}

