import { Theme } from "@radix-ui/themes";
import {
  AuthKitProvider,
  Impersonation,
} from "@workos-inc/authkit-nextjs/components";
import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import "@workos-inc/widgets/styles.css";
import { WorkOsWidgets } from "@workos-inc/widgets";
import { getApiProps } from "~/lib/env";

export const metadata: Metadata = {
  title: "AuthKit Next.js Example",
  description: "AuthKit Next.js Example",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body style={{ margin: 0, height: "100%" }}>
        <AuthKitProvider>
          <WorkOsWidgets {...getApiProps()} style={{ height: "100%" }}>
            <Theme data-is-root-theme="false" style={{ height: "100%" }}>
              <Impersonation />
              {children}
            </Theme>
          </WorkOsWidgets>
        </AuthKitProvider>
      </body>
    </html>
  );
}
