declare global {
  interface Window {
    env?: {
      serverUrl?: string
      websocketServerUrl?: string
      yjsWebsocketServerUrl?: string

      sentry?: {
        dsn: string
        environment: string
      }
    }
  }
}

const removeTrailingSlashes = (url: string): string => url.replace(/\/+$/, '')

const sanitizeUrl = (url?: string): string | null => {
  if (!url) return null
  return removeTrailingSlashes(url)
}

const serverUrl = sanitizeUrl(window.env?.serverUrl || process.env.SERVER_URL)

const webSocketServerUrl = sanitizeUrl(
  window.env?.websocketServerUrl || process.env.WEBSOCKET_SERVER_URL,
)

const yjsWebSocketServerUrl = sanitizeUrl(
  window.env?.yjsWebsocketServerUrl || process.env.YJS_WEBSOCKET_SERVER_URL,
)

export { serverUrl, webSocketServerUrl, yjsWebSocketServerUrl }
