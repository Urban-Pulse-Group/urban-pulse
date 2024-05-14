// authStore.ts
import { create } from "zustand";
import { User } from "../types/userTypes";
import { authenticatedFetch } from "../utils/fetchUtils";

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  logout: (navigate: (url: string) => void) => Promise<void>;
  getUser: () => Promise<User | null>;
  login: (token: string) => void;

  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setIsLoggedIn: (bool: boolean) => void;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  isLoggedIn: false,
  token: localStorage.getItem("token"),

  getUser: async () => {
    try {
      const res = await authenticatedFetch(
        "http://localhost:4040/api/auth/getUser"
      );
      const data = await res.json();
      if (data?.user) {
        set({ user: data.user, isLoggedIn: true });
        if ("token" in data) {
          localStorage.setItem("token", data.token);
        }
        return data.user;
      }
    } catch (error) {
      console.error("User not authenticated:", error);
      set({ user: null, isLoggedIn: false });
      return null;
    }
  },
  login: (token: string) => {
    localStorage.setItem("token", token);
    set({ token, isLoggedIn: true });
  },
  logout: async (navigate: (url: string) => void) => {
    try {
      const res = await authenticatedFetch(
        "http://localhost:4040/api/auth/logout",
      );
      const result = await res.json();
      console.log(result);

      localStorage.clear();
      set({
        user: null,
        isLoggedIn: false,
        token: null,
      });

      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  },

  setToken: (token: string | null) => set({ token }),
  setUser: (user: User | null) => set({ user }),
  setIsLoggedIn: (bool: boolean) => set({ isLoggedIn: bool }),
}));
