import { Box, Button, Flex } from "@radix-ui/themes";
import { signOut, withAuth } from "@workos-inc/authkit-nextjs";
import Link from "next/link";

export default async function ExamplesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await withAuth({ ensureSignedIn: true });

  return (
    <Flex direction="column" height="100%">
      <Box
        flexGrow="0"
        flexShrink="0"
        style={{ borderBottom: "1px solid var(--gray-a7)" }}
      >
        <Flex gap="3" p="4" align="center" justify="between">
          <Flex gap="2" align="center">
            <Link
              href="/"
              style={{
                textDecoration: "none",
                color: "var(--gray-12)",
                fontWeight: 600,
                fontSize: "1rem",
              }}
            >
              ← Widget Gallery
            </Link>
          </Flex>
          <form
            style={{ display: "contents" }}
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button type="submit" radius="medium" variant="ghost" size="2">
              Sign Out
            </Button>
          </form>
        </Flex>
      </Box>
      <Box flexGrow="1" flexShrink="1" style={{ overflow: "auto" }}>
        {children}
      </Box>
    </Flex>
  );
}
