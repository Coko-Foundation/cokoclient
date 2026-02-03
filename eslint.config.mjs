import { defineEslintConfig, clientEslintConfig } from '@coko/lint'

const config = defineEslintConfig(clientEslintConfig)

// do not ignore docs folder
config[config.length - 1].ignores = config[config.length - 1].ignores.filter(
  i => i !== '**/docs',
)

export default config
