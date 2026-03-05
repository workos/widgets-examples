import { Flex, Heading, Tabs, Text } from "@radix-ui/themes";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { UserProfile, UserSecurity, UserSessions } from "@workos-inc/widgets";
import { workos } from "~/app/workos";

export const metadata = {
  title: "User Settings (Combined) | WorkOS Widgets Showcase",
  description:
    "Example combining UserProfile, UserSecurity, and UserSessions in a tabbed settings page",
};

export default async function UserSettingsExample() {
  const { user, organizationId, sessionId } = await withAuth({
    ensureSignedIn: true,
  });

  if (!organizationId) {
    return (
      <Flex p="6" direction="column" gap="4" maxWidth="640px">
        <Heading size="5">User Settings (Combined)</Heading>
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
        <Heading size="6">User Settings (Combined)</Heading>
        <Text size="2" color="gray">
          A common pattern: combine Profile, Sessions, and Security in a single
          tabbed settings page. Ideal for account or preferences screens.
        </Text>
      </Flex>

      <Tabs.Root defaultValue="profile">
        <Tabs.List>
          <Tabs.Trigger value="profile">Profile</Tabs.Trigger>
          <Tabs.Trigger value="sessions">Sessions</Tabs.Trigger>
          <Tabs.Trigger value="security">Security</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="profile">
          <Flex p="4" pt="4">
            <UserProfile authToken={authToken} />
          </Flex>
        </Tabs.Content>
        <Tabs.Content value="sessions">
          <Flex p="4" pt="4">
            <UserSessions
              authToken={authToken}
              currentSessionId={sessionId}
            />
          </Flex>
        </Tabs.Content>
        <Tabs.Content value="security">
          <Flex p="4" pt="4">
            <UserSecurity authToken={authToken} />
          </Flex>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}
