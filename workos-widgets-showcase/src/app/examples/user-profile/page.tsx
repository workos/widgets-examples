import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { UserProfile } from "@workos-inc/widgets";
import { workos } from "~/app/workos";

export const metadata = {
  title: "User Profile Widget | WorkOS Widgets Showcase",
  description: "Example of the UserProfile widget for displaying and editing user details",
};

export default async function UserProfileExample() {
  const { user, organizationId } = await withAuth({
    ensureSignedIn: true,
  });

  if (!organizationId) {
    return (
      <Flex p="6" direction="column" gap="4" maxWidth="640px">
        <Heading size="5">User Profile Widget</Heading>
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
        <Heading size="6">User Profile</Heading>
        <Text size="2" color="gray">
          Display and edit user details: name, email, profile picture, and
          connected accounts. Users can update their profile information directly.
        </Text>
      </Flex>

      <Card size="3">
        <UserProfile authToken={authToken} />
      </Card>
    </Flex>
  );
}
