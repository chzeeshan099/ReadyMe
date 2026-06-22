export const ENV = {
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || "",
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "",
  resetPasswordRedirect:
    process.env.EXPO_PUBLIC_RESET_PASSWORD_REDIRECT || "https://readyme.app/reset-password",
};
