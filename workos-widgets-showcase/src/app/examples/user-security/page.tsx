import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { UserSecurity } from "@workos-inc/widgets";
import { workos } from "~/app/workos";

export const metadata = {
  title: "User Security Widget | WorkOS Widgets Showcase",
  description: "Example of the UserSecurity widget for MFA and password management",
};

export default async function UserSecurityExample() {
  const { user, organizationId } = await withAuth({
    ensureSignedIn: true,
  });

  if (!organizationId) {
    return (
      <Flex p="6" direction="column" gap="4" maxWidth="640px">
        <Heading size="5">User Security Widget</Heading>
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
  });

  return (
    <Flex gap="6" direction="column" maxWidth="940px" p="6">
      <Flex direction="column" gap="2">
        <Heading size="6">User Security</Heading>
        <Text size="2" color="gray">
          Manage multi-factor authentication (MFA) options and update your
          password. Supports TOTP, SMS, and other MFA methods.
        </Text>
      </Flex>

      <Card size="3">
        <UserSecurity authToken={authToken} />
      </Card>
    </Flex>
  );
}
