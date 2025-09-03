import { Box, DropdownMenu, Flex, IconButton } from "@radix-ui/themes";
import { signOut, withAuth } from "@workos-inc/authkit-nextjs";
import type { Metadata } from "next";
import { SettingsDialog } from "./settings-dialog";
import { workos } from "~/app/workos";

export const metadata: Metadata = {
  title: "WorkOS Widgets Next.js | User Settings",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, organizationId, sessionId } = await withAuth({
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
    <Flex direction="column" height="100%">
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        flexGrow="0"
        flexShrink="0"
        flexBasis="auto"
      >
        <Flex gap="5" p="4" align="center" justify="end">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <IconButton variant="solid" radius="full" size="1" color="gray">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <title>User icon</title>
                  <path d="M229.19,213c-15.81-27.32-40.63-46.49-69.47-54.62a70,70,0,1,0-63.44,0C67.44,166.5,42.62,185.67,26.81,213a6,6,0,1,0,10.38,6C56.4,185.81,90.34,166,128,166s71.6,19.81,90.81,53a6,6,0,1,0,10.38-6ZM70,96a58,58,0,1,1,58,58A58.07,58.07,0,0,1,70,96Z" />
                </svg>
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <SettingsDialog authToken={authToken} sessionId={sessionId}>
                <DropdownMenu.Item>Settings</DropdownMenu.Item>
              </SettingsDialog>
              <form
                style={{ display: "contents" }}
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <DropdownMenu.Item color="red" asChild>
                  <button type="submit">Sign Out</button>
                </DropdownMenu.Item>
              </form>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
      </Box>

      <Box flexGrow="1" flexShrink="1" flexBasis="100%">
        {children}
      </Box>
    </Flex>
  );
}
