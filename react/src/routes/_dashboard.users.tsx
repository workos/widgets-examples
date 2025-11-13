import { UsersManagement, UsersManagementLoading } from "@workos-inc/widgets";
import { Button, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { Navigate } from "react-router";
import { useAuth } from "~/lib/use-auth";

export default function Users() {
  const auth = useAuth();

  if (auth.isLoading) {
    return (
      <>
        <title>SuperApp | Users</title>
        <Layout subtitle="Manage and invite users for the SuperApp team.">
          <UsersManagementLoading />
        </Layout>
      </>
    );
  }

  if (!auth.user) {
    return <Navigate to="/signin" />;
  }

  if (!auth.organizationId) {
    return (
      <>
        <title>SuperApp | No organization</title>
        <Layout subtitle="User does not belong to an organization.">
          <Button type="button" onClick={() => void auth.signOut()}>
            Sign out
          </Button>
        </Layout>
      </>
    );
  }

  return (
    <>
      <title>SuperApp | Users</title>
      <Layout subtitle="Manage and invite users for the SuperApp team.">
        {auth.authToken ? (
          <UsersManagement authToken={auth.authToken} />
        ) : (
          <UsersManagementLoading />
        )}
      </Layout>
    </>
  );
}

function Layout({
  children,
  subtitle,
}: {
  children: React.ReactNode;
  subtitle: string;
}) {
  return (
    <Flex direction="column" align="center" px="9">
      <Flex direction="column" gap="5" maxWidth="640px" width="100%" my="9">
        <header>
          <Heading size="8" mb="2">
            Users
          </Heading>
          <Text>{subtitle}</Text>
        </header>
        <Separator size="4" />
        <main>{children}</main>
      </Flex>
    </Flex>
  );
}
