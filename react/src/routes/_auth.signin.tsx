import { Button, Flex, Heading } from "@radix-ui/themes";
import { Link } from "react-router";
import { useAuth } from "~/lib/use-auth";

export default function HomePage() {
  const auth = useAuth();
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="2"
      height="100%"
    >
      {auth.isLoading ? (
        <Flex justify="center" align="center" height="100%">
          Authenticating...
        </Flex>
      ) : auth.user ? (
        <>
          <Heading size="6">
            Welcome back{auth.user?.firstName && `, ${auth.user?.firstName}`}!
          </Heading>
          <Flex align="center" gap="3" mt="4">
            <Button asChild size="3" variant="soft">
              <Link to="/users">Manage Users</Link>
            </Button>
            <Button onClick={() => void auth.signOut()} size="3">
              Sign Out
            </Button>
          </Flex>
        </>
      ) : (
        <>
          <Heading size="6">Welcome!</Heading>
          <Button onClick={() => void auth.signIn()} size="3">
            Sign In
          </Button>
        </>
      )}
    </Flex>
  );
}
