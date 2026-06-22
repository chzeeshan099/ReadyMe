import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuthStore = create<any>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      loading: false,
      hydrated: true,
      setLoading: (loading) => set({ loading }),
      setHydrated: (hydrated) => set({ hydrated }),
      setAuth: ({ user, session }) => set({ user, session }),
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
      signOutLocal: () => set({ user: null, session: null }),
    }),
    {
      name: "readyme-auth-store",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
