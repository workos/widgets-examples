import { Card, DropdownMenu, Flex } from "@radix-ui/themes";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { UsersManagement } from "@workos-inc/widgets";
import { OrganizationSwitcher } from "@workos-inc/widgets/organization-switcher";
import { workos } from "~/app/workos";
import { switchToOrganization } from "~/server-functions/switch-to-organization";

export default async function Default() {
  const { user, organizationId } = await withAuth({
    ensureSignedIn: true,
  });
  if (!organizationId) {
    return <p>User does not belong to an organization</p>;
  }
  const authToken = await workos.widgets.getToken({
    userId: user.id,
    organizationId,
    scopes: ["widgets:users-table:manage"],
  });
  return (
    <Flex gap="5" maxWidth="940px" p="5" direction="column" align="start">
      <OrganizationSwitcher
        authToken={authToken}
        organizationLabel="My Teams"
        switchToOrganization={async ({ organizationId }) => {
          "use server";

          await switchToOrganization({
            organizationId,
            pathname: "/users",
          });
        }}
      >
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item>Settings</DropdownMenu.Item>
        </DropdownMenu.Group>
      </OrganizationSwitcher>

      <Card size="3">
        <UsersManagement authToken={authToken} />
      </Card>
    </Flex>
  );
}
