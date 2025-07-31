import { UsersManagement, WorkOsWidgets } from "@workos-inc/widgets";
import { authkitLoader } from "@workos-inc/authkit-react-router";
import { Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { data } from "react-router";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import { workos } from "~/lib/workos.server";
import { useLoaderData } from "react-router";
import { getApiProps } from "~/lib/env";

export async function loader(args: LoaderFunctionArgs) {
  return authkitLoader(
    args,
    async ({ auth }) => {
      const { organizationId, user } = auth;
      if (!organizationId) {
        throw data("User does not belong to an organization", 403);
      }
      const apiProps = getApiProps();
      const authToken = await workos.widgets.getToken({
        userId: user.id,
        organizationId,
        scopes: ["widgets:users-table:manage"],
      });
      return { apiProps, authToken, user };
    },
    { ensureSignedIn: true }
  );
}

export const meta: MetaFunction = () => {
  return [{ title: "SuperApp | Users" }];
};

export default function Users() {
  const { apiProps, authToken } = useLoaderData<typeof loader>();
  return (
    <Flex direction="column" align="center" px="9">
      <Flex direction="column" gap="5" maxWidth="640px" width="100%" my="9">
        <header>
          <Heading size="8" mb="2">
            Users
          </Heading>
          <Text>Manage and invite users for the SuperApp team</Text>
        </header>
        <Separator size="4" />
        <main>
          <WorkOsWidgets {...apiProps} style={{ height: "100%" }}>
            <UsersManagement authToken={authToken} />
          </WorkOsWidgets>
        </main>
      </Flex>
    </Flex>
  );
}
