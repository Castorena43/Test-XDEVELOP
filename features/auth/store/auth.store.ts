import { UserRole } from "@/features/users/types/user.types";
import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";

export type User = {
  email: string;
  role: UserRole
};

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  expiresAt: number | null;

  setAuth: (data: { user: User, accessToken: string, expiresAt: number }) => void;
  setAccessToken: (data: { accessToken: string, expiresAt: number }) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        expiresAt: null,
  
        setAuth: ({ user, accessToken, expiresAt }) =>
          set({
            user,
            accessToken,
            isAuthenticated: true,
            expiresAt
          }),
  
        logout: () =>
          set({
            user: null,
            isAuthenticated: false,
          }),
        setAccessToken: ({accessToken, expiresAt}) => 
          set({
            accessToken,
            expiresAt,
          })
      }),
      {
        name: "auth-storage",
        storage: createJSONStorage(() =>localStorage),
      }
    )
  )
);