#!/usr/bin/env node

import { createServer } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const configFile = path.resolve(__dirname, '../vite/vite.config.mts')

async function runServer() {
  try {
    const server = await createServer({
      configFile,
    })

    await server.listen()

    server.printUrls()
    server.bindCLIShortcuts({ print: true })
  } catch (error) {
    console.error('Vite dev server failed to start:', error)
    process.exit(1)
  }
}

runServer()
