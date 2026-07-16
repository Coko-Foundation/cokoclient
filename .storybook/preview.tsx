/* eslint-disable import/no-extraneous-dependencies */

import { definePreview, type Decorator } from '@storybook/react-vite'
import addonDocs from '@storybook/addon-docs'

import { ThemeProvider } from 'styled-components'

import { AntConfigProvider } from '../src'
import theme from '../src/theme'
import GlobalStyle from '../src/components/GlobalStyle'

const withProviders: Decorator = Story => {
  return (
    <ThemeProvider theme={theme}>
      <AntConfigProvider theme={theme}>
        <GlobalStyle />
        <Story />
      </AntConfigProvider>
    </ThemeProvider>
  )
}

export default definePreview({
  addons: [addonDocs()],
  tags: ['autodocs'],
  decorators: [withProviders],
})
