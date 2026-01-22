import { Preview } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import { ConfigProvider as AntConfigProvider } from 'antd'
import '@fontsource/source-sans-pro'


import defaultTheme from '../src/theme'
import { makeTheme, GlobalStyle } from '../src/components/Root'

const theme = makeTheme({
  ...defaultTheme,

  colorBorder: 'lightslategray',
  fontInterface: 'Source Sans Pro',
  
  fontSize: '16',
  fontSizeBase: '16px',
  lineHeight: '1.618',
})


const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    Story => (
      <AntConfigProvider theme={theme}>
        <ThemeProvider theme={theme.token}>
          <GlobalStyle />
          <Story />
        </ThemeProvider>
      </AntConfigProvider>
    ),
  ],
}

export default preview
