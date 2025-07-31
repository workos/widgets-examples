import { Button, Flex, Heading } from "@radix-ui/themes";
import type { LoaderFunctionArgs } from "react-router";
import { Form, Link, useLoaderData } from "react-router";
import { getSignInUrl } from "@workos-inc/authkit-react-router";
import { authkitLoader } from "@workos-inc/authkit-react-router";

export async function loader(args: LoaderFunctionArgs) {
  return await authkitLoader(args, async ({ auth }) => {
    return {
      signInUrl: await getSignInUrl(),
      accessToken: auth.accessToken,
    };
  });
}

export default function HomePage() {
  const { user } = useLoaderData<typeof loader>();
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
  const { user, signInUrl } = useLoaderData<typeof loader>();
  if (user) {
    return (
      <Form style={{ display: "contents" }} action="/signout">
        <Button type="submit" size="3">
          Sign Out
        </Button>
      </Form>
    );
  }

  return (
    <Button asChild size="3">
      <Link to={signInUrl}>Sign In</Link>
    </Button>
  );
}
