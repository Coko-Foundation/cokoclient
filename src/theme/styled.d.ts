import 'styled-components'
import type { ThemeConfig } from 'antd'

declare module 'styled-components' {
  export interface DefaultTheme {
    /* Colors */
    colorBackground?: string
    colorBackgroundHue?: string
    colorBody?: string
    colorFurniture?: string
    colorPrimary?: string
    colorSecondary?: string
    colorDisabled?: string
    colorBorder?: string
    colorSuccess?: string
    colorError?: string
    colorWarning?: string
    colorText?: string
    colorTextReverse?: string
    colorTextPlaceholder?: string

    /* Text variables */
    fontInterface?: string
    fontHeading?: string
    fontReading?: string
    fontWriting?: string

    /* Font sizes */
    fontSizeBase?: string
    fontSizeBaseSmall?: string
    fontSizeHeading1?: string
    fontSizeHeading2?: string
    fontSizeHeading3?: string
    fontSizeHeading4?: string
    fontSizeHeading5?: string
    fontSizeHeading6?: string

    /* Line heights */
    lineHeightBase?: string
    lineHeightBaseSmall?: string
    lineHeightHeading1?: string
    lineHeightHeading2?: string
    lineHeightHeading3?: string
    lineHeightHeading4?: string
    lineHeightHeading5?: string
    lineHeightHeading6?: string

    /* Spacing */
    gridUnit?: string

    /* Border */
    borderRadius?: string
    borderWidth?: string
    borderStyle?: string

    /* Shadow */
    boxShadow?: string

    /* Transition */
    transitionDuration?: number
    transitionTimingFunction?: string
    transitionDelay?: string

    /* CSS Overrides */
    cssOverrides?: {
      [key: string]: any
    }

    /* Per-component antd theme token overrides, passed straight through
       to antd's ConfigProvider theme.components (e.g. { Table: { headerBg: '...' } }) */
    antComponents?: ThemeConfig['components']

    /* Allow arbitrary additional properties */
    [key: string]: any
  }
}
