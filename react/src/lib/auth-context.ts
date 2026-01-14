import * as React from "react";

interface AuthContextType {
  authToken: string | null;
}

const AuthContext = React.createContext<AuthContextType | null>(null);
AuthContext.displayName = "AuthContext";

export { AuthContext, type AuthContextType };
