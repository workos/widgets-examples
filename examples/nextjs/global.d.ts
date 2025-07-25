import 'react'

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number
  }

  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    /**
     * Indicates that the browser will ignore this element and its descendants,
     * preventing some interactions and hiding it from assistive technology.
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert
     * @todo Remove this stub declaration after https://github.com/facebook/react/pull/24730 is merged.
     */
    inert?: ''
  }
}
