export function buildProfileStats(user) {
  if (user?.role === "teacher") {
    return [
      { label: "Classes", value: "12" },
      { label: "Feedback", value: "94%" },
      { label: "Engagement", value: "High" },
    ];
  }

  if (user?.role === "admin") {
    return [
      { label: "Users", value: "1.2k" },
      { label: "Reports", value: "8" },
      { label: "Health", value: "Stable" },
    ];
  }

  return [
    { label: "Streak", value: "9 days" },
    { label: "Courses", value: "3 active" },
    { label: "Prep", value: "On track" },
  ];
}
