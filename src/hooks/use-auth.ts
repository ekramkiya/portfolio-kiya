// import { api } from "@/convex/_generated/api";
// import { useAuthActions } from "@convex-dev/auth/react";
// import { useConvexAuth, useQuery } from "convex/react";

export function useAuth() {
  return {
    isLoading: false,
    isAuthenticated: true, // Automatically bypasses login pages
    user: { name: "Guest Client", email: "client@example.com" },
    signIn: async () => {},
    signOut: async () => {},
  };
}
