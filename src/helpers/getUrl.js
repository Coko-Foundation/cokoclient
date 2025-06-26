const removeTrailingSlashes = url => url.replace(/\/+$/, '')

const sanitizeUrl = url => {
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

module.exports = {
  serverUrl,
  webSocketServerUrl,
  yjsWebSocketServerUrl,
}
