import { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [],
  framework: '@storybook/react-vite',
  typescript: {
    // reactDocgen: 'react-docgen-typescript',
    reactDocgen: false,
  },
  async viteFinal(config) {
    const { default: viteConfig } = await import('../vite/vite.config.mts')
    return mergeConfig(config, viteConfig)
  },
}
export default config
