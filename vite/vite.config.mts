import path from 'node:path'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'

import { defineConfig, type UserConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as esbuild from 'esbuild'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// #region setup
const {
  NODE_ENV,

  CLIENT_APP_ROOT_PATH,
  CLIENT_BUILD_FOLDER_PATH,
  CLIENT_ENTRY_FILE_PATH,
  CLIENT_FAVICON_PATH,
  CLIENT_PAGE_TITLE,
  CLIENT_STATIC_FOLDER_PATH,
  CLIENT_PAGES_FOLDER_PATH,
  CLIENT_PORT,
  CLIENT_UI_FOLDER_PATH,
  CLIENT_LANGUAGE,
  CLIENT_WS_MIN_TIMEOUT,
  CLIENT_WS_TIMEOUT,

  SERVER_URL,
  WEBSOCKET_SERVER_URL,
  YJS_WEBSOCKET_SERVER_URL,

  SENTRY_DSN,
  SENTRY_ENVIRONMENT,
} = process.env

//
/* SET UP VARS */
//

// Environment variables that will only be used in this config
const variablesForViteConfig = [
  'CLIENT_APP_ROOT_PATH',
  'CLIENT_BUILD_FOLDER_PATH',
  'CLIENT_ENTRY_FILE_PATH',
  'CLIENT_FAVICON_PATH',
  'CLIENT_LANGUAGE',
  'CLIENT_PAGE_TITLE',
  'CLIENT_PAGES_FOLDER_PATH',
  'CLIENT_PORT',
  'CLIENT_STATIC_FOLDER_PATH',
  'CLIENT_UI_FOLDER_PATH',
]

const DEFAULT_CLIENT_WS_MIN_TIMEOUT = 5000
const DEFAULT_CLIENT_WS_TIMEOUT = 60000

// Environment variables that will be passed down to the build
// All values are defaults
const variablesForBuild: Record<string, string | number | null | undefined> = {
  NODE_ENV: undefined,
  SERVER_URL: undefined,
  WEBSOCKET_SERVER_URL: undefined,
  YJS_WEBSOCKET_SERVER_URL: undefined,
  SENTRY_DSN: undefined,
  SENTRY_ENVIRONMENT: undefined,
  CLIENT_WS_MIN_TIMEOUT: DEFAULT_CLIENT_WS_MIN_TIMEOUT,
  CLIENT_WS_TIMEOUT: DEFAULT_CLIENT_WS_TIMEOUT,
}

// Allow custom variables that start with CLIENT_ to pass into the build
// All custom variables will start with a default value of undefined
const customVariables = Object.keys(process.env)
  .filter(k => {
    return (
      !variablesForViteConfig.includes(k) &&
      !(k in variablesForBuild) &&
      k.startsWith('CLIENT_')
    )
  })
  .reduce((obj: Record<string, undefined>, k) => {
    obj[k] = undefined
    return obj
  }, {})

const variablesInBuild = { ...variablesForBuild, ...customVariables }

const mode = NODE_ENV === 'production' ? 'production' : 'development'
const isEnvDevelopment = mode === 'development'
const isEnvProduction = mode === 'production'

const appPath = CLIENT_APP_ROOT_PATH
  ? path.resolve(CLIENT_APP_ROOT_PATH)
  : path.resolve(process.cwd(), 'app')

const uiFolderPath = path.resolve(appPath, CLIENT_UI_FOLDER_PATH || 'ui')
const pagesFolderPath = path.resolve(
  appPath,
  CLIENT_PAGES_FOLDER_PATH || 'pages',
)

const staticFolderPath =
  CLIENT_STATIC_FOLDER_PATH || path.resolve(appPath, '..', 'static')

const buildFolderPath =
  CLIENT_BUILD_FOLDER_PATH || path.resolve(appPath, '..', '_build')

const entryFilePath = CLIENT_ENTRY_FILE_PATH || './start.js'
const devServerPort = Number(CLIENT_PORT) || 8080
const faviconPath = CLIENT_FAVICON_PATH
const pageTitle = CLIENT_PAGE_TITLE || 'Coko App'
const language = CLIENT_LANGUAGE || 'en-US'

const WSLinkMinTimeout = CLIENT_WS_MIN_TIMEOUT || DEFAULT_CLIENT_WS_MIN_TIMEOUT
const WSLinkTimeout = CLIENT_WS_TIMEOUT || DEFAULT_CLIENT_WS_TIMEOUT

// Template path in the vite folder
const templatePath = path.resolve(__dirname, 'index.html')
// #endregion setup

// #region log-init
const cyan = (t: string) => `\x1b[36m${t}\x1b[0m`

const logSeparator = () => console.log(cyan('//////////////////////'))

const logHeader = (text: string) => {
  logSeparator()
  console.log(cyan(`// ${text.toUpperCase()}\n`))
}

const logStatus = (label: string, message: unknown, newLine?: boolean) => {
  console.log(`${cyan(label)}: ${message}${newLine ? '\n' : ''}`)
}

logHeader('coko client info')
logStatus('Environment', NODE_ENV, true)
logStatus('App context path is set to', appPath)
isEnvProduction && logStatus('Build will be written to', buildFolderPath)
logStatus('Static folder path found at', staticFolderPath)
logStatus('App entry file will be', entryFilePath)
logStatus('UI folder path will be', uiFolderPath)
logStatus('Pages folder path will be', pagesFolderPath)
logStatus('Favicon path will be', faviconPath)
logStatus('Page title set to', pageTitle)
logStatus('Language set to', language)
isEnvDevelopment && logStatus('Dev server will run at port', devServerPort)
logStatus('Server will be requested at', SERVER_URL)
logStatus('Websocket server will be requested at', WEBSOCKET_SERVER_URL)
logStatus('Websocket link min timeout will be', WSLinkMinTimeout)
logStatus('Websocket link timeout will be', WSLinkTimeout)
logStatus(
  'Sentry initialized:',
  SENTRY_DSN && SENTRY_ENVIRONMENT ? 'yes' : 'no',
)
logStatus(
  'yjs websocket server url will be requested at',
  YJS_WEBSOCKET_SERVER_URL,
)

logStatus(
  'Custom environment variables detected',
  Object.keys(customVariables).length > 0
    ? Object.keys(customVariables).join(', ')
    : 'none',
  true,
)

logSeparator()
console.log('')
// #endregion log-init

// Build the define object for environment variables
const defineEnv = Object.keys(variablesInBuild).reduce((acc, k) => {
  // fall back to null. undefined is not json serializable
  const defaultValue = variablesInBuild[k] || null
  const value = process.env[k] || defaultValue
  acc[`process.env.${k}`] = JSON.stringify(value)
  return acc
}, {} as Record<string, any>)

// Process HTML template with substitutions
function processTemplate(html: string): string {
  return html
    .replace('{{TITLE}}', pageTitle)
    .replace('{{LANGUAGE}}', language)
    .replace('{{ENTRY}}', entryFilePath)
}

// Plugin to handle JSX and CommonJS in .js files
function jsTransformPlugin(): Plugin {
  return {
    name: 'js-transform',
    enforce: 'pre',

    async transform(code, id) {
      // Only process .js files outside node_modules
      if (!id.endsWith('.js') || id.includes('node_modules')) {
        return null
      }

      // Determine if file has JSX
      const hasJsx = /<[A-Za-z]/.test(code)

      try {
        const result = await esbuild.transform(code, {
          loader: hasJsx ? 'jsx' : 'js',
          jsx: 'automatic',
          jsxImportSource: 'react',
          format: 'esm',
        })
        return { code: result.code, map: result.map }
      } catch {
        // If transform fails, let other plugins handle it
        return null
      }
    },
  }
}

// Plugin to serve index.html from vite folder
function cokoHtmlPlugin(): Plugin {
  let cachedHtml: string | null = null

  // Only read html file so that you don't have to read the html file from disk
  // on every request
  const getHtml = () => {
    if (!cachedHtml) {
      const template = fs.readFileSync(templatePath, 'utf-8')
      cachedHtml = processTemplate(template)
    }

    return cachedHtml
  }

  return {
    name: 'coko-html',
    enforce: 'pre',

    // Resolve virtual index.html to our template
    resolveId(id) {
      if (id.endsWith('index.html') && id.includes(appPath)) return id
      return null
    },

    // Load our template instead of looking for index.html in app folder
    load(id) {
      if (id.endsWith('index.html') && id.includes(appPath)) return getHtml()
      return null
    },

    // Dev server: serve our template for HTML requests
    configureServer(server) {
      // Middleware that runs before Vite's internal handlers - serve index.html for root
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/' || req.url === '/index.html') {
          const html = getHtml()
          const transformed = await server.transformIndexHtml(req.url, html)
          res.setHeader('Content-Type', 'text/html')
          res.end(transformed)
          return
        }
        next()
      })

      // Return a function to add middleware after Vite's internal handlers (SPA fallback)
      return () => {
        server.middlewares.use(async (req, res, next) => {
          const acceptsHtml = req.headers.accept?.includes('text/html')

          if (req.method === 'GET' && acceptsHtml) {
            const html = getHtml()
            const transformed = await server.transformIndexHtml('/', html)
            res.setHeader('Content-Type', 'text/html')
            res.end(transformed)
            return
          }
          next()
        })
      }
    },
  }
}

//
/* VITE CONFIG */
//

const viteConfig: UserConfig = defineConfig({
  root: appPath,
  base: '/',
  mode,
  publicDir: staticFolderPath,

  // Environment variables
  define: defineEnv,

  resolve: {
    alias: {
      pages: pagesFolderPath,
      ui: uiFolderPath,
    },
    // Extensions to try when extension is ommitted in import
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
  },

  plugins: [
    jsTransformPlugin(),
    cokoHtmlPlugin(),
    react({ tsDecorators: true }),
  ],

  build: {
    outDir: buildFolderPath,
    emptyOutDir: true,
    sourcemap: isEnvDevelopment ? 'inline' : false,
    minify: isEnvProduction ? 'esbuild' : false,
    cssCodeSplit: true,
  },

  // Dev server
  server: {
    host: '0.0.0.0',
    port: devServerPort,
    strictPort: false,
    open: false,
  },

  preview: {
    host: '0.0.0.0',
    port: devServerPort,
  },
})

export default viteConfig
