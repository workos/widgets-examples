import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { UsersManagement } from "@workos-inc/widgets";
import { workos } from "~/app/workos";

export const metadata = {
  title: "Users Management Widget | WorkOS Widgets Showcase",
  description: "Example of the UsersManagement widget for listing and managing organization members",
};

export default async function UsersManagementExample() {
  const { user, organizationId } = await withAuth({
    ensureSignedIn: true,
  });

  if (!organizationId) {
    return (
      <Flex p="6" direction="column" gap="4" maxWidth="640px">
        <Heading size="5">Users Management Widget</Heading>
        <Text color="gray">
          You need to belong to an organization to use this widget. Please sign
          in with an organization context.
        </Text>
      </Flex>
    );
  }

  const authToken = await workos.widgets.getToken({
    userId: user.id,
    organizationId,
    scopes: ["widgets:users-table:manage"],
  });

  return (
    <Flex gap="6" direction="column" maxWidth="940px" p="6">
      <Flex direction="column" gap="2">
        <Heading size="6">Users Management</Heading>
        <Text size="2" color="gray">
          List, invite, and manage organization members. Use the table to search,
          filter, and perform bulk actions. Requires{" "}
          <code>widgets:users-table:manage</code> scope.
        </Text>
      </Flex>

      <Card size="3">
        <UsersManagement authToken={authToken} />
      </Card>
    </Flex>
  );
}
