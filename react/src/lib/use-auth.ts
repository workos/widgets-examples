import * as React from "react";
import { useAuth as useAuthKit } from "@workos-inc/authkit-react";
import { AuthContext } from "./auth-context";

type AuthKit = ReturnType<typeof useAuthKit>;
type User = Exclude<AuthKit["user"], null>;

type UseAuthReturnType = Omit<AuthKit, "user" | "isLoading"> & State;

export function useAuth(): UseAuthReturnType {
  const authKit = useAuthKit();
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  if (authKit.isLoading) {
    return {
      ...authKit,
      ...context,
      status: "loading",
      isLoading: true,
      user: null,
      authToken: null,
    };
  }

  if (!authKit.user) {
    return {
      ...authKit,
      ...context,
      status: "unauthenticated",
      isLoading: false,
      user: null,
      authToken: null,
    };
  }

  return {
    ...authKit,
    ...context,
    status: "authenticated",
    isLoading: false,
    user: authKit.user,
    authToken: context.authToken,
  };
}

type Status =
  | "loading"
  | "authenticated"
  | "authenticated-with-token"
  | "unauthenticated";

interface SharedState {
  status: Status;
  isLoading: boolean;
  user: User | null;
  authToken: string | null;
}

interface LoadingState extends SharedState {
  status: "loading";
  isLoading: true;
  user: null;
  authToken: null;
}

interface AuthenticatedState extends SharedState {
  status: "authenticated";
  isLoading: false;
  user: User;
  authToken: string | null;
}

interface UnauthenticatedState extends SharedState {
  status: "unauthenticated";
  isLoading: false;
  user: null;
  authToken: null;
}

export type State = LoadingState | AuthenticatedState | UnauthenticatedState;
