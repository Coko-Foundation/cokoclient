/**
 * This file (and folder) are only meant to provide a playground for our
 * client. They will not be provided in the package distribution build.
 */

import {
  startClient,
  // clientUrl,
  serverUrl,
  webSocketServerUrl,
  yjsWebSocketServerUrl,
} from '../../../src'
import routes from './routes'
import theme from './theme'

/* eslint-disable no-console */
console.log('window.env', window.env)
console.log('Server url:', serverUrl)
console.log('Websocket server url:', webSocketServerUrl)
console.log('Yjs websocket server url:', yjsWebSocketServerUrl)
/* eslint-enable no-console */

// Make sure async functions are supported
// const doSomethingAsync = async () => {
//   await console.error('do it')
// }

const onLogout = () => {
  console.log('logged out!')
}

startClient(routes, theme, { onLogout })
