"use client";

import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

export const LinkButton = (props: ComponentProps<typeof Link>) => {
  const pathname = usePathname();
  const href = props.href
    ? typeof props.href === "string"
      ? props.href
      : props.href.pathname
    : null;
  const isActive = pathname === href;
  return (
    <Button
      asChild
      radius="medium"
      variant="ghost"
      style={{
        pointerEvents: isActive ? "none" : undefined,
        backgroundColor: isActive ? "var(--accent-4)" : undefined,
      }}
    >
      <Link {...props} />
    </Button>
  );
};
