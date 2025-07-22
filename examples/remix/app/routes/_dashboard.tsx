import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  DropdownMenu,
  Flex,
  Grid,
  IconButton,
  Separator,
  Text,
  VisuallyHidden,
} from "@radix-ui/themes";
import { Form, Outlet, useNavigation } from "@remix-run/react";
import { PrimaryNav, PrimaryNavItem } from "~/ui/dashboard";
import { SuperAppMark } from "~/ui/svgs";

export default function DashboardLayout() {
  const navigation = useNavigation();
  const isSigningOut =
    navigation.state === "submitting" && navigation.formAction === "/signout";
  if (isSigningOut) {
    return (
      <Flex
        height="100%"
        width="100%"
        align="center"
        justify="center"
        p="5"
        style={{ backgroundColor: "var(--gray-3)" }}
      >
        <Text size="4" weight="bold">
          Signing out. Goodbye!
        </Text>
      </Flex>
    );
  }

  return (
    <Grid
      height="100%"
      columns={{ initial: "1", sm: "306px 1fr" }}
      rows={{ initial: "auto 1fr", sm: "1" }}
      style={{ backgroundColor: "var(--gray-3)" }}
      gap="2"
    >
      <Box p="2" pr={{ sm: "0" }} pb={{ initial: "0", sm: "2" }}>
        <Flex gap="5" p="4" direction="column">
          <Flex justify="between" gap="2">
            <AppMenu>
              <Button variant="soft" color="gray" highContrast>
                <Text color="indigo" asChild>
                  <SuperAppMark height="20" width="20" aria-hidden />
                </Text>
                <Text weight="bold">SuperApp</Text>
                <DropdownMenu.TriggerIcon />
              </Button>
            </AppMenu>
            <IconButton variant="soft" color="gray" highContrast type="button">
              <MagnifyingGlassIcon aria-hidden />
              <VisuallyHidden>Search</VisuallyHidden>
            </IconButton>
          </Flex>
          <Separator size="4" />

          <PrimaryNav>
            <PrimaryNavItem to="/dashboard">Dashboard</PrimaryNavItem>
            <PrimaryNavItem to="/users">Users</PrimaryNavItem>
          </PrimaryNav>
        </Flex>
      </Box>
      <Box
        flexGrow="1"
        flexShrink="1"
        flexBasis="100%"
        p="2"
        pl={{ sm: "0" }}
        pt={{ initial: "0", sm: "2" }}
      >
        <Card asChild>
          <Box height="100%">
            <Outlet />
          </Box>
        </Card>
      </Box>
    </Grid>
  );
}

function AppMenu({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item shortcut="⌘ W">Workspace</DropdownMenu.Item>
        <DropdownMenu.Item shortcut="⌘ P">Preferences</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item shortcut="⌥ ⇧ Q" asChild>
          <button type="submit" form="signout-form">
            Sign out
          </button>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
      <VisuallyHidden asChild>
        <Form id="signout-form" method="post" action="/signout" />
      </VisuallyHidden>
    </DropdownMenu.Root>
  );
}
