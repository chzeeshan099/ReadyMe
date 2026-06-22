import React, { useEffect } from "react";
import { supabase } from "@/shared/lib/supabase";
import { useAuthStore } from "@/modules/auth/store/auth.store";
import { mapSupabaseUser } from "@/modules/auth/services/auth.service";

export function SupabaseProvider({ children }) {
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    if (!supabase) {
      return undefined;
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        setAuth({ user: null, session: null });
        return;
      }

      setAuth({
        user: mapSupabaseUser(session.user),
        session,
      });
    });

    return () => subscription.unsubscribe();
  }, [setAuth]);

  return children;
}
