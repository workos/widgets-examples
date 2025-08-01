import { UsersManagement } from "@workos-inc/widgets";
import { Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { Navigate } from "react-router";
import { useAuth } from "@workos-inc/authkit-react";

export default function Users() {
  const auth = useAuth();

  if (auth.isLoading) {
    return (
      <Flex justify="center" align="center" height="100%">
        Authenticating...
      </Flex>
    );
  }

  if (!auth.user) {
    return <Navigate to="/signin" />;
  }

  if (!auth.organizationId) {
    return (
      <>
        <title>SuperApp | No organization</title>
        <Flex direction="column" align="center" px="9">
          <Flex direction="column" gap="5" maxWidth="640px" width="100%" my="9">
            <main>
              <Heading size="8" mb="2">
                User does not belong to an organization
              </Heading>
              <Text asChild>
                <button type="button" onClick={() => void auth.signOut()}>
                  Sign out
                </button>
              </Text>
            </main>
          </Flex>
        </Flex>
      </>
    );
  }

  return (
    <>
      <title>SuperApp | Users</title>
      <Flex direction="column" align="center" px="9">
        <Flex direction="column" gap="5" maxWidth="640px" width="100%" my="9">
          <header>
            <Heading size="8" mb="2">
              Users
            </Heading>
            <Text>Manage and invite users for the SuperApp team</Text>
          </header>
          <Separator size="4" />
          <main>
            <UsersManagement authToken={auth.getAccessToken} />
          </main>
        </Flex>
      </Flex>
    </>
  );
}
