#!/usr/bin/env node

/* eslint-disable no-console */

import { build } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

/* eslint-disable-next-line no-underscore-dangle */
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const configFile = path.resolve(__dirname, '../vite/vite.config.mts')

async function runBuild() {
  try {
    await build({
      configFile,
    })

    console.log('Vite build completed successfully.')
    process.exit(0)
  } catch (error) {
    console.error('Vite build failed:', error)
    process.exit(1)
  }
}

runBuild()
