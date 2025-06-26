#!/usr/bin/env node

const webpack = require('webpack')

const webpackConfig = require('../webpack/webpack.config')

async function runBuild() {
  try {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        console.error('Webpack build failed with errors:')
        console.error(err.stack || err)

        if (err.details) {
          console.error(err.details)
        }

        throw err
      }

      const info = stats.toJson()

      if (stats.hasErrors()) {
        console.error('Webpack build completed with errors:')
        info.errors.forEach(error => console.error(error))
        throw new Error('Webpack build failed with errors.')
      }

      if (stats.hasWarnings()) {
        console.warn('Webpack build completed with warnings:')
        info.warnings.forEach(warning => console.warn(warning))
      }

      process.exit(0)
    })
  } catch (error) {
    console.error('Webpack build failed:', error)
    process.exit(1)
  }
}

runBuild()
