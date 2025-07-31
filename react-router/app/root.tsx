import { Flex, Heading, Link, Text, Theme } from "@radix-ui/themes";
import radixThemesStylesheet from "@radix-ui/themes/styles.css?url";
import type { LinksFunction } from "react-router";
import {
  Links,
  Meta,
  Outlet,
  Link as RouterLink,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "react-router";
import * as React from "react";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: radixThemesStylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body style={{ margin: 0, height: "100%" }}>
        <Theme data-is-root-theme="false" style={{ height: "100%" }}>
          {children}
        </Theme>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  React.useEffect(() => {
    console.error(error);
  }, [error]);

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
        <Text asChild align="center">
          <Link size="4" asChild>
            <RouterLink to="/">Go back home</RouterLink>
          </Link>
        </Text>
      </Flex>
    </Flex>
  );
}
