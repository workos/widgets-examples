import * as React from "react";
import { useAuth } from "@workos-inc/authkit-react";
import { Flex } from "@radix-ui/themes";
import { Navigate } from "react-router";

export default function AuthCallback() {
  const auth = useAuth();
  const { signIn } = auth;
  React.useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const context = searchParams.get("context") ?? undefined;
    if (!context) {
      // TODO: redirect to login page
      return;
    }

    signIn({ context });
  }, [signIn]);

  if (auth.user) {
    return <Navigate to="/users" />;
  }

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="2"
      height="100%"
    >
      <Flex justify="center" align="center" height="100%">
        {auth.isLoading ? "Authenticating..." : "Waiting..."}
      </Flex>
    </Flex>
  );
}
