import { Flex, Text } from "@radix-ui/themes";
import { NavLink, type NavLinkProps } from "react-router";
import styles from "./dashboard.module.css";

export function PrimaryNav({ children }: { children: React.ReactNode }) {
  return (
    <Flex direction="column" gap="2" asChild>
      <nav aria-label="primary" className={styles.nav}>
        {children}
      </nav>
    </Flex>
  );
}

export function PrimaryNavItem({
  to,
  children,
}: {
  to: NavLinkProps["to"];
  children: React.ReactNode;
}) {
  return (
    <Text weight="bold" color="gray" highContrast asChild>
      <NavLink to={to} className={styles.navItem}>
        {children}
      </NavLink>
    </Text>
  );
}

export function PrimaryNavButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Text weight="bold" color="gray" highContrast asChild>
      <button type="button" onClick={onClick} className={styles.navItem}>
        {children}
      </button>
    </Text>
  );
}
