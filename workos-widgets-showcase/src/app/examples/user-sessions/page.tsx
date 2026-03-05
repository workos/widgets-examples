import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { withAuth } from "@workos-inc/authkit-nextjs";
import { UserSessions } from "@workos-inc/widgets";
import { workos } from "~/app/workos";

export const metadata = {
  title: "User Sessions Widget | WorkOS Widgets Showcase",
  description: "Example of the UserSessions widget for managing active sessions",
};

export default async function UserSessionsExample() {
  const { user, organizationId, sessionId } = await withAuth({
    ensureSignedIn: true,
  });

  if (!organizationId) {
    return (
      <Flex p="6" direction="column" gap="4" maxWidth="640px">
        <Heading size="5">User Sessions Widget</Heading>
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
        <Heading size="6">User Sessions</Heading>
        <Text size="2" color="gray">
          View active sessions across devices. Sign out from individual sessions
          or sign out from all other sessions. Pass{" "}
          <code>currentSessionId</code> to highlight the current session.
        </Text>
      </Flex>

      <Card size="3">
        <UserSessions authToken={authToken} currentSessionId={sessionId} />
      </Card>
    </Flex>
  );
}
