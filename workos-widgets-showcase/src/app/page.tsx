import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { getSignInUrl, signOut, withAuth } from "@workos-inc/authkit-nextjs";
import NextLink from "next/link";

const WIDGETS = [
  {
    href: "/examples/users-management",
    name: "Users Management",
    description:
      "List, invite, and manage organization members. Supports search, filtering, and bulk actions.",
    icon: "👥",
  },
  {
    href: "/examples/user-profile",
    name: "User Profile",
    description:
      "Display and edit user details: name, email, profile picture, and connected accounts.",
    icon: "👤",
  },
  {
    href: "/examples/user-security",
    name: "User Security",
    description:
      "Manage MFA options, password updates, and security preferences.",
    icon: "🔐",
  },
  {
    href: "/examples/user-sessions",
    name: "User Sessions",
    description:
      "View active sessions, sign out from individual devices, or sign out from all other sessions.",
    icon: "📱",
  },
  {
    href: "/examples/organization-switcher",
    name: "Organization Switcher",
    description:
      "Switch between organizations with automatic SSO and MFA handling.",
    icon: "🔄",
  },
  {
    href: "/examples/user-settings",
    name: "User Settings (Combined)",
    description:
      "Profile, Sessions, and Security in one tabbed page—a common account settings pattern.",
    icon: "⚙️",
  },
];

export default async function HomePage() {
  const { user } = await withAuth();

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      gap="6"
      height="100%"
      p="6"
    >
      <Flex direction="column" align="center" gap="2">
        <Heading size="8">WorkOS Widgets Showcase</Heading>
        <Text size="3" color="gray" align="center" style={{ maxWidth: 560 }}>
          Explore every WorkOS widget with live, testable examples. Sign in to
          try each widget in your organization.
        </Text>
      </Flex>

      {user ? (
        <>
          <Flex align="center" gap="3">
            <Text size="2" color="gray">
              Signed in as {user.firstName ?? user.email}
            </Text>
            <form
              style={{ display: "contents" }}
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button type="submit" size="2" variant="soft">
                Sign Out
              </Button>
            </form>
          </Flex>

          <Flex
            wrap="wrap"
            gap="4"
            justify="center"
            style={{ maxWidth: 900 }}
          >
            {WIDGETS.map((widget) => (
              <Card key={widget.href} size="2" style={{ minWidth: 260, flex: 1 }}>
                <Flex direction="column" gap="2">
                  <Text size="5">{widget.icon}</Text>
                  <Heading size="4">{widget.name}</Heading>
                  <Text size="2" color="gray">
                    {widget.description}
                  </Text>
                  <Button asChild size="2" variant="soft" mt="2">
                    <NextLink href={widget.href}>Try it →</NextLink>
                  </Button>
                </Flex>
              </Card>
            ))}
          </Flex>
        </>
      ) : (
        <Flex direction="column" align="center" gap="4">
          <Text size="2" color="gray">
            Sign in to explore all widget examples
          </Text>
          <Button asChild size="4">
            <a href={await getSignInUrl()}>Sign In with WorkOS</a>
          </Button>
        </Flex>
      )}
    </Flex>
  );
}
