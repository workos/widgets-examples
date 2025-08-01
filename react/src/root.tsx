import { Flex, Heading, Link, Text, Theme } from "@radix-ui/themes";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import {
  Links,
  Meta,
  Outlet,
  Link as RouterLink,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "react-router";
import * as React from "react";
import { preconnect } from "react-dom";
import { getApiProps, getDevtools } from "~/lib/env";
import { AuthKitProvider } from "@workos-inc/authkit-react";
import { WorkOsWidgets } from "@workos-inc/widgets";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "@radix-ui/themes/styles.css";
import "@workos-inc/widgets/styles.css";
import "./root.css";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <Theme style={{ height: "100%" }}>
          <ErrorLayout
            heading="Render error"
            message="Something went wrong"
            error={error}
            action={
              <Text asChild align="center">
                <button type="button" onClick={resetErrorBoundary}>
                  Reset
                </button>
              </Text>
            }
          />
        </Theme>
      )}
    >
      <AuthKitProvider {...getApiProps()}>
        <WorkOsWidgets {...getApiProps()}>
          <Theme data-is-root-theme="false" style={{ height: "100%" }}>
            {children}
          </Theme>
        </WorkOsWidgets>
      </AuthKitProvider>
    </ReactErrorBoundary>
  );
}

function RootLayout({ children }: { children: React.ReactNode }) {
  preconnect("https://fonts.googleapis.com");
  preconnect("https://fonts.gstatic.com", { crossOrigin: "anonymous" });
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
      />
      <Providers>{children}</Providers>
      <ScrollRestoration />
      {getDevtools() && <ReactQueryDevtools />}
    </>
  );
}

export default function App() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  let heading = "Unknown Error";
  let message = "Something went wrong and we aren’t quite sure what.";

  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        heading = "Not Found";
        message = "We couldn’t find the page you were looking for.";
        break;
      case 401:
        heading = "Unauthorized";
        message = "You must be logged in to access this page.";
        break;
      case 500:
        heading = "Server Error";
        message = "An unexpected error occurred. Please try again later.";
        break;
    }
  }

  return (
    <RootLayout>
      <ErrorLayout
        error={error}
        heading={heading}
        message={message}
        action={
          <Text asChild align="center">
            <Link size="4" asChild>
              <RouterLink to="/">Go back home</RouterLink>
            </Link>
          </Text>
        }
      />
    </RootLayout>
  );
}

function ErrorLayout({
  heading,
  message,
  action,
  error,
}: {
  heading: string;
  message: string;
  action: React.ReactNode;
  error: unknown;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <Flex
      height="100%"
      width="100%"
      align="center"
      justify="center"
      p="5"
      style={{ backgroundColor: "var(--gray-3)" }}
    >
      <Flex
        align="center"
        justify="center"
        direction="column"
        gap="3"
        maxWidth="460px"
      >
        <Heading size="8" align="center" wrap="balance">
          {heading}
        </Heading>
        <Text size="4" color="gray" align="center" wrap="pretty">
          {message}
        </Text>
        {action}
      </Flex>
    </Flex>
  );
}
