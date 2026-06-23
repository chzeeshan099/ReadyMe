import { Platform } from "react-native";

const darkPalette = {
  mode: "dark",
  background: "#120D17",
  surface: "#1A1322",
  surfaceAlt: "#24192E",
  elevated: "#2D1F38",
  header: "#7B4DFF",
  headerMuted: "#CDBBFF",
  border: "rgba(174, 141, 255, 0.22)",
  softBorder: "rgba(255,255,255,0.08)",
  text: "#FFF9FF",
  muted: "#C9BDD4",
  dim: "#9E8EAF",
  primary: "#8E61FF",
  primaryDeep: "#6A3FF0",
  secondary: "#FFCC87",
  accent: "#F4B7FF",
  cyan: "#F4B7FF",
  success: "#7EF0B8",
  danger: "#FF8EAE",
  overlay: "rgba(9, 7, 14, 0.76)",
  card: "rgba(255,255,255,0.05)",
  input: "rgba(255,255,255,0.08)",
  bgGradient: ["#120D17", "#1A1230", "#120D17"] as const,
  headerGradient: ["#885CFF", "#7346F2", "#5A34C9"] as const,
  primaryGradient: ["#9A6CFF", "#7B4DFF", "#5C33D6"] as const,
};

const lightPalette = {
  mode: "light",
  background: "#F6F1FF",
  surface: "#FFFFFF",
  surfaceAlt: "#F1E8FF",
  elevated: "#E9DDFF",
  header: "#7B4DFF",
  headerMuted: "#F3ECFF",
  border: "rgba(123, 77, 255, 0.18)",
  softBorder: "rgba(94, 53, 177, 0.10)",
  text: "#251636",
  muted: "#6E5C84",
  dim: "#87769A",
  primary: "#7B4DFF",
  primaryDeep: "#5D33CC",
  secondary: "#F0A64D",
  accent: "#E68DF5",
  cyan: "#E68DF5",
  success: "#2FAA72",
  danger: "#DF5D88",
  overlay: "rgba(32, 20, 54, 0.18)",
  card: "rgba(123,77,255,0.06)",
  input: "rgba(123,77,255,0.08)",
  bgGradient: ["#F7F2FF", "#EEE5FF", "#F9F6FF"] as const,
  headerGradient: ["#8D63FF", "#7B4DFF", "#6A3FF0"] as const,
  primaryGradient: ["#AA84FF", "#7B4DFF", "#6A3FF0"] as const,
};

export const APP_COLORS = {
  dark: darkPalette,
  light: lightPalette,
};

export const COLORS = darkPalette;

export const FONTS = {
  heading: Platform.select({
    ios: "AvenirNext-Heavy",
    android: "sans-serif-medium",
    default: "system",
  }),
  body: Platform.select({
    ios: "AvenirNext-Regular",
    android: "sans-serif",
    default: "system",
  }),
  bodyMedium: Platform.select({
    ios: "AvenirNext-DemiBold",
    android: "sans-serif-medium",
    default: "system",
  }),
};
