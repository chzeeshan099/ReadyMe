import { ENV } from "@/config/env";
import { delay, slugifyId } from "@/shared/utils/helpers";
import { supabase } from "@/shared/lib/supabase";

export function mapSupabaseUser(user) {
  const metadata = user.user_metadata || {};

  return {
    id: user.id,
    email: user.email,
    fullName: metadata.fullName || metadata.name || "ReadyMe User",
    role: metadata.role || "student",
    level: metadata.level || "",
    subjects: metadata.subjects || [],
    bio: metadata.bio || "Learning with ReadyMe.",
  };
}

function createLocalUser(payload) {
  return {
    id: slugifyId(payload.email),
    email: payload.email,
    fullName: payload.fullName || payload.email.split("@")[0],
    role: payload.role,
    level: payload.level || "",
    subjects: payload.subjects || [],
    bio:
      payload.role === "teacher"
        ? "Guiding students with structured, practical learning."
        : payload.role === "admin"
          ? "Managing platform quality, users, and growth."
          : "Building a stronger study routine every day.",
  };
}

export async function login(payload) {
  await delay(500);

  if (!supabase || !ENV.supabaseUrl || !ENV.supabaseAnonKey) {
    return {
      user: createLocalUser(payload),
      session: { access_token: `local-${Date.now()}` },
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: payload.email,
    password: payload.password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return {
    user: mapSupabaseUser(data.user),
    session: data.session,
  };
}

export async function register(payload) {
  await delay(700);

  if (!supabase || !ENV.supabaseUrl || !ENV.supabaseAnonKey) {
    return {
      user: createLocalUser(payload),
      session: { access_token: `local-${Date.now()}` },
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        fullName: payload.fullName,
        role: payload.role,
        level: payload.level,
        subjects: payload.subjects,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return {
    user: mapSupabaseUser(data.user),
    session: data.session,
  };
}

export async function forgotPassword(email) {
  await delay(500);

  if (!supabase || !ENV.supabaseUrl || !ENV.supabaseAnonKey) {
    return {
      message: `Reset instructions prepared for ${email}. Connect Supabase to send the real email.`,
    };
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: ENV.resetPasswordRedirect,
  });

  if (error) {
    throw new Error(error.message);
  }

  return {
    message: `Reset email sent to ${email}.`,
  };
}

export async function signOut() {
  if (supabase) {
    await supabase.auth.signOut();
  }
}
