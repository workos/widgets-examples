import { Flex, Heading } from '@radix-ui/themes'
import { workos } from '~/app/workos'
import { withAuth } from '@workos-inc/authkit-nextjs'
import {
  UserProfile,
  UserSecurity,
  UserSessions,
  WorkOsWidgets,
} from '@workos-inc/widgets'
import { getApiProps } from '~/utils/env'

export default async function SettingsPage() {
  const { user, organizationId, sessionId } = await withAuth({
    ensureSignedIn: true,
  })
  if (!organizationId) {
    return <p>User does not belong to an organization</p>
  }

  const authToken = await workos.widgets.getToken({
    userId: user.id,
    organizationId,
  })

  return (
    <WorkOsWidgets
      {...getApiProps()}
      theme={{
        accentColor: 'indigo',
        scaling: '100%',
        radius: 'medium',
        panelBackground: 'translucent',
        appearance: 'light',
      }}
      elements={{ badge: { radius: 'full' } }}
      style={{ height: '100%' }}
    >
      <Flex gap="9" direction="column" maxWidth="940px" p="5">
        <Flex gap="3" direction="column">
          <Heading size="6">User profile</Heading>

          <UserProfile authToken={authToken} />
        </Flex>

        <Flex gap="3" direction="column">
          <Heading size="6">User sessions</Heading>

          <UserSessions authToken={authToken} currentSessionId={sessionId} />
        </Flex>

        <Flex gap="3" direction="column">
          <Heading size="6">User security</Heading>

          <UserSecurity authToken={authToken} />
        </Flex>
      </Flex>
    </WorkOsWidgets>
  )
}
