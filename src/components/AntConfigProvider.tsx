import { type ReactNode, useMemo } from 'react'
import { DefaultTheme } from 'styled-components'
import { ConfigProvider, theme as antdTheme } from 'antd'

const REM_BASE_PX = 16
const VALID_ANTD_TOKEN_KEYS = new Set(Object.keys(antdTheme.getDesignToken()))

const pxToNumConverter = (
  value: string | number | undefined,
): number | undefined => {
  if (typeof value === 'string') {
    if (value.slice(-2) === 'px') return parseFloat(value)
    if (value.slice(-3) === 'rem') return parseFloat(value) * REM_BASE_PX
  }

  return typeof value === 'number' ? value : undefined
}

export function makeAntdTheme(providedTheme: DefaultTheme): {
  token: Record<string, unknown>
} {
  const mapper: Record<string, unknown> = {
    borderRadius: pxToNumConverter(providedTheme.borderRadius),
    colorBgBase: providedTheme.colorBackground,
    colorTextBase: providedTheme.colorText,
    fontFamily: providedTheme.fontInterface,
    fontSize: pxToNumConverter(providedTheme.fontSizeBase),
    fontSizeHeading1: pxToNumConverter(providedTheme.fontSizeHeading1),
    fontSizeHeading2: pxToNumConverter(providedTheme.fontSizeHeading2),
    fontSizeHeading3: pxToNumConverter(providedTheme.fontSizeHeading3),
    fontSizeHeading4: pxToNumConverter(providedTheme.fontSizeHeading4),
    fontSizeHeading5: pxToNumConverter(providedTheme.fontSizeHeading5),
    fontSizeHeading6: pxToNumConverter(providedTheme.fontSizeHeading6),
    lineType: providedTheme.borderStyle,
    lineWidth: pxToNumConverter(providedTheme.borderWidth),
    motionUnit: providedTheme.transitionDuration,
    sizeUnit: pxToNumConverter(providedTheme.gridUnit),
  }

  const mapped = Object.fromEntries(
    Object.entries(mapper).filter(([, v]) => !!v),
  )

  const filteredProvidedTheme = Object.fromEntries(
    Object.entries(providedTheme).filter(([key]) =>
      VALID_ANTD_TOKEN_KEYS.has(key),
    ),
  )

  return {
    token: {
      ...filteredProvidedTheme,
      ...mapped,
    },
  }
}

type AntConfigProviderProps = {
  children: ReactNode
  theme: DefaultTheme
}

const AntConfigProvider = ({
  children,
  theme,
}: AntConfigProviderProps): ReactNode => {
  const mappedAntdTheme = useMemo(() => makeAntdTheme(theme), [theme])

  return <ConfigProvider theme={mappedAntdTheme}>{children}</ConfigProvider>
}

export default AntConfigProvider
