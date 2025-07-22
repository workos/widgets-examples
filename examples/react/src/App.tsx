import {
  Box,
  Button,
  Card,
  DropdownMenu,
  Flex,
  Heading,
} from '@radix-ui/themes'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthKitProvider, useAuth } from '@workos-inc/authkit-react'
import { UsersManagement, WorkOsWidgets } from '@workos-inc/widgets'
import { OrganizationSwitcher } from '@workos-inc/widgets/organization-switcher'
import { getApiProps, getDevtools } from './env'
import './App.css'

function Root() {
  return (
    <AuthKitProvider {...getApiProps()}>
      <WorkOsWidgets {...getApiProps()}>
        <App />
      </WorkOsWidgets>
    </AuthKitProvider>
  )
}

const AuthButton = () => {
  const { user, signOut, signIn } = useAuth()
  if (user) {
    return (
      <Button onClick={() => signOut()} size="3">
        Sign Out
      </Button>
    )
  }

  return (
    <Button onClick={() => signIn()} size="3">
      Sign In
    </Button>
  )
}

function App() {
  const { user, getAccessToken, isLoading, signOut, switchToOrganization } =
    useAuth()

  if (isLoading) {
    return (
      <Flex justify="center" align="center" height="100%">
        Authenticating...
      </Flex>
    )
  }

  if (!user) {
    return (
      <Flex
        direction="column"
        align="center"
        justify="center"
        gap="2"
        height="100%"
      >
        <Heading size="6">Welcome!</Heading>
        <AuthButton />
      </Flex>
    )
  }

  return (
    <Flex direction="column" height="100%">
      <Box flexGrow="1" flexShrink="1" flexBasis="100%">
        <Box flexGrow="0" flexShrink="0" flexBasis="auto">
          <Flex
            gap="5"
            p="4"
            align="center"
            style={{ borderBottom: '1px solid var(--gray-a7)' }}
          >
            <Button onClick={() => signOut()} radius="medium" variant="ghost">
              Sign Out
            </Button>
          </Flex>
        </Box>
        <Flex gap="5" maxWidth="940px" p="5" direction="column" align="start">
          <OrganizationSwitcher
            authToken={getAccessToken}
            switchToOrganization={switchToOrganization}
            truncateBehavior="middle"
          >
            <DropdownMenu.Separator />
            <DropdownMenu.Group>
              <DropdownMenu.Item>Settings</DropdownMenu.Item>
            </DropdownMenu.Group>
          </OrganizationSwitcher>

          <Card size="3">
            <UsersManagement authToken={getAccessToken} />
          </Card>
        </Flex>
        {getDevtools() && <ReactQueryDevtools />}
      </Box>
    </Flex>
  )
}

export default Root
