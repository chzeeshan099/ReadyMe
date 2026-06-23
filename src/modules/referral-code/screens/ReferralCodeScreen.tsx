import React from "react";
import FeatureScreen from "@/shared/components/FeatureScreen";

export default function ReferralCodeScreen({ navigation }) {
  return (
    <FeatureScreen
      navigation={navigation}
      activeRoute="ReferralCode"
      badge="Referral"
      title="My Refreal Code"
      subtitle="Apna referral code, rewards, aur invite flow yahan dekh sakte hain."
      cards={[
        {
          title: "Your Invite Code",
          description: "Referral code ko copy aur share karne ke liye section yahan represent kiya gaya hai.",
        },
        {
          title: "Rewards Tracker",
          description: "Successful invites aur unlock hone wale benefits ko show karne ki jagah ready hai.",
        },
      ]}
    />
  );
}

