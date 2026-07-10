import { type ReactNode } from 'react'
import { createGlobalStyle } from 'styled-components'
import { Normalize } from 'styled-normalize'

import { type ThemeValue } from '../toolkit/themeHelper'

const Global = createGlobalStyle`
  body {
    background-color: ${(props): ThemeValue => props.theme.colorBackground};
    color: ${(props): ThemeValue => props.theme.colorText};
    font-family: ${(props): ThemeValue => props.theme.fontInterface}, sans-serif;
    font-size: ${(props): ThemeValue => props.theme.fontSizeBase};
    line-height: ${(props): ThemeValue => props.theme.lineHeightBase};

    * {
      box-sizing: border-box;
    }
  }
`

const GlobalStyle = (): ReactNode => {
  return (
    <>
      <Normalize />
      <Global />
    </>
  )
}

export default GlobalStyle
