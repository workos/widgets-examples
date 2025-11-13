import * as React from "react";
import { useAuth as useAuthKit } from "@workos-inc/authkit-react";
import { AuthContext, type AuthContextType } from "./auth-context";

type UseAuthReturnType = Omit<ReturnType<typeof useAuthKit>, "isLoading"> &
  (
    | { isLoading: true; authToken: null }
    | { isLoading: false; authToken: string }
  );

export function useAuth(): UseAuthReturnType {
  const authKit = useAuthKit();
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  if (authKit.isLoading || !context.authToken) {
    return { ...authKit, ...context, isLoading: true, authToken: null };
  }

  return {
    ...authKit,
    ...context,
    isLoading: false,
    authToken: context.authToken,
  };
}
