import { Card, DropdownMenu, Flex, Heading, Text } from "@radix-ui/themes";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { UsersManagement } from "@workos-inc/widgets";
import { OrganizationSwitcher } from "@workos-inc/widgets/organization-switcher";
import { workos } from "~/app/workos";
import { switchToOrganization } from "~/server-functions/switch-to-organization";

export const metadata = {
  title: "Organization Switcher Widget | WorkOS Widgets Showcase",
  description:
    "Example of the OrganizationSwitcher widget for switching between organizations",
};

export default async function OrganizationSwitcherExample() {
  const { user, organizationId } = await withAuth({
    ensureSignedIn: true,
  });

  if (!organizationId) {
    return (
      <Flex p="6" direction="column" gap="4" maxWidth="640px">
        <Heading size="5">Organization Switcher Widget</Heading>
        <Text color="gray">
          You need to belong to at least one organization to use this widget.
          The switcher appears when you have access to multiple organizations.
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
        <Heading size="6">Organization Switcher</Heading>
        <Text size="2" color="gray">
          Switch between organizations with automatic SSO and MFA handling.
          Combine with other widgets (e.g. Users Management) to show
          organization-specific content. Requires a server action for{" "}
          <code>switchToOrganization</code>.
        </Text>
      </Flex>

      <Card size="3">
        <Flex gap="5" direction="column" align="start">
          <OrganizationSwitcher
            authToken={authToken}
            organizationLabel="My Teams"
            switchToOrganization={async ({ organizationId }) => {
              "use server";
              await switchToOrganization({
                organizationId,
                pathname: "/examples/organization-switcher",
              });
            }}
          >
            <DropdownMenu.Separator />
            <DropdownMenu.Group>
              <DropdownMenu.Item>Settings</DropdownMenu.Item>
            </DropdownMenu.Group>
          </OrganizationSwitcher>

          <Text size="2" color="gray">
            Users in current organization:
          </Text>
          <UsersManagement authToken={authToken} />
        </Flex>
      </Card>
    </Flex>
  );
}
