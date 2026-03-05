import "react";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }

  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    inert?: "";
  }
}
