import { useState, useEffect } from 'react'

const useBreakpoint = (mediaQuery: string): boolean => {
  const mediaQueryList = window.matchMedia(mediaQuery)
  const [isMobile, setIsMobile] = useState(mediaQueryList.matches)

  const matches = (e: MediaQueryListEvent): void => {
    setIsMobile(e.matches)
  }

  useEffect(() => {
    mediaQueryList.addEventListener('change', matches)

    return (): void => {
      mediaQueryList.removeEventListener('change', matches)
    }
  }, [mediaQueryList])

  return isMobile
}

export default useBreakpoint
