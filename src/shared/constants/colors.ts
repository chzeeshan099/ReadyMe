export const COLORS = {
  background: "#020712",
  surface: "#071224",
  surfaceAlt: "#0B1730",
  border: "#173056",
  text: "#F8FAFC",
  muted: "#94A3B8",
  primary: "#0B6DFF",
  primarySoft: "rgba(11,109,255,0.18)",
  cyan: "#4DE2FF",
  bgGradient: ["#020712", "#04132A", "#020712"] as const,
};

export const GLOW = {
  blueBorder: "rgba(77, 145, 255, 0.38)",
  cyanBorder: "rgba(77, 226, 255, 0.34)",
  panel: {
    shadowColor: "#0B6DFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 10,
  },
  strong: {
    shadowColor: "#4DE2FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.42,
    shadowRadius: 22,
    elevation: 14,
  },
};
