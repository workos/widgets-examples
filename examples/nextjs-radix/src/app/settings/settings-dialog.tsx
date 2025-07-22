"use client";

import { Box, Dialog, Flex, IconButton, Inset, Tabs } from "@radix-ui/themes";
import { UserProfile, UserSecurity, UserSessions } from "@workos-inc/widgets";
import { useState } from "react";

interface SettingsDialogProps {
  children: React.ReactNode;
  authToken: string;
  sessionId: string;
}

export const SettingsDialog = (props: SettingsDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        onMouseDown={() => {
          setOpen(true);
        }}
      >
        {props.children}
      </Dialog.Trigger>
      <Dialog.Content align="start" style={{ marginTop: "20dvh" }}>
        <Flex justify="between" align="center">
          <Dialog.Title size="5">User settings</Dialog.Title>

          <Dialog.Close>
            <IconButton variant="ghost" color="gray" size="1" mr="-2" mt="-6">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </IconButton>
          </Dialog.Close>
        </Flex>

        <Inset side="x">
          <Tabs.Root defaultValue="details">
            <Tabs.List>
              <Tabs.Trigger value="details">Profile</Tabs.Trigger>
              <Tabs.Trigger value="sessions">Sessions</Tabs.Trigger>
              <Tabs.Trigger value="security">Security</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="details">
              <Box px="4" pt="4">
                <UserProfile authToken={props.authToken} />
              </Box>
            </Tabs.Content>
            <Tabs.Content value="security">
              <Box px="4" pt="4">
                <UserSecurity authToken={props.authToken} />
              </Box>
            </Tabs.Content>
            <Tabs.Content value="sessions">
              <Box px="4" pt="4">
                <UserSessions
                  authToken={props.authToken}
                  currentSessionId={props.sessionId}
                />
              </Box>
            </Tabs.Content>
          </Tabs.Root>
        </Inset>
      </Dialog.Content>
    </Dialog.Root>
  );
};
