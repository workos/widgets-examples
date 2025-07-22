import { Box, Button, Flex } from '@radix-ui/themes'
import { signOut, withAuth } from '@workos-inc/authkit-nextjs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WorkOS Widgets Next.js | User Management',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  await withAuth({ ensureSignedIn: true })
  return (
    <Flex direction="column" height="100%">
      <Box flexGrow="0" flexShrink="0" flexBasis="auto">
        <Flex
          gap="5"
          p="4"
          align="center"
          style={{ borderBottom: '1px solid var(--gray-a7)' }}
        >
          <form
            style={{ display: 'contents' }}
            action={async () => {
              'use server'
              await signOut()
            }}
          >
            <Button type="submit" radius="medium" variant="ghost">
              Sign Out
            </Button>
          </form>
        </Flex>
      </Box>
      <Box flexGrow="1" flexShrink="1" flexBasis="100%">
        {children}
      </Box>
    </Flex>
  )
}
