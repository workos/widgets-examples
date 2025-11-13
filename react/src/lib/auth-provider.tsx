import * as React from "react";
import { AuthKitProvider } from "@workos-inc/authkit-react";
import { AuthContext } from "./auth-context";

export const AuthProvider: React.FC<
  React.ComponentProps<typeof AuthKitProvider>
> = ({ children, ...props }) => {
  const [authToken, setAuthToken] = React.useState<string | null>(null);
  return (
    <AuthKitProvider
      {...props}
      onRefresh={(payload) => {
        props.onRefresh?.(payload);
        setAuthToken(payload.accessToken);
      }}
    >
      <AuthContext.Provider value={{ authToken }}>
        {children}
      </AuthContext.Provider>
    </AuthKitProvider>
  );
};
