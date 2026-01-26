import { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  // stories: ['../storytest/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs'],
  framework: '@storybook/react-vite',
  // docs: {
  //   defaultName: 'Documentation',
  // },
  // typescript: {
  //   reactDocgen: false,
  // },
  async viteFinal(config) {
    const { default: viteConfig } = await import('../vite/vite.config.mts')
    return mergeConfig(config, viteConfig)
  },
}

export default config
