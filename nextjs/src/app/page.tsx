import { Button, Flex, Heading } from "@radix-ui/themes";
import { getSignInUrl, signOut, withAuth } from "@workos-inc/authkit-nextjs";
import NextLink from "next/link";

export default async function HomePage() {
  const { user } = await withAuth();
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="2"
      height="100%"
    >
      {user ? (
        <>
          <Heading size="6">
            Welcome back{user?.firstName && `, ${user?.firstName}`}!
          </Heading>
          <Flex align="center" gap="3" mt="4">
            <Button asChild size="3" variant="soft">
              <NextLink href="/users">Manage Users</NextLink>
            </Button>
            <Button asChild size="3" variant="soft">
              <NextLink href="/settings">Settings</NextLink>
            </Button>
            <AuthButton />
          </Flex>
        </>
      ) : (
        <>
          <Heading size="6">Welcome!</Heading>
          <AuthButton />
        </>
      )}
    </Flex>
  );
}

async function AuthButton() {
  const { user } = await withAuth();
  const authorizationUrl = await getSignInUrl();
  if (user) {
    return (
      <form
        style={{ display: "contents" }}
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit" size="3">
          Sign Out
        </Button>
      </form>
    );
  }

  return (
    <Button asChild size="3">
      <a href={authorizationUrl}>Sign In</a>
    </Button>
  );
}
