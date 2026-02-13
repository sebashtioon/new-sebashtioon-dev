import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(mql.matches)
    }

    // set initial value
    setIsMobile(mql.matches)

    // Safari/older browsers: MediaQueryList may not support addEventListener
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange)
      return () => mql.removeEventListener("change", onChange)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(mql as any).addListener(onChange)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return () => (mql as any).removeListener(onChange)
  }, [])

  return !!isMobile
}
