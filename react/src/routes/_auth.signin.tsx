import { Button, Flex, Heading } from "@radix-ui/themes";
import { Link } from "react-router";
import { useAuth } from "@workos-inc/authkit-react";

export default function HomePage() {
  const { user } = useAuth();
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
              <Link to="/users">Manage Users</Link>
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

function AuthButton() {
  const { user, signIn } = useAuth();
  if (user) {
    return (
      <form
        style={{ display: "contents" }}
        action="/signout"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <Button type="submit" size="3">
          Sign Out
        </Button>
      </form>
    );
  }

  return (
    <Button asChild size="3" onClick={() => signIn()}>
      Sign In
    </Button>
  );
}
