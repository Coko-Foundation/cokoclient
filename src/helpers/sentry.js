import * as Sentry from '@sentry/react'
import { serverUrl } from './getUrl'

const dsn = window.env?.sentry?.dsn || process.env.SENTRY_DSN

const environment =
  window.env?.sentry?.environment || process.env.SENTRY_ENVIRONMENT

if (dsn && environment) {
  Sentry.init({
    dsn,
    environment,
    sendDefaultPii: true,

    integrations: [
      Sentry.consoleLoggingIntegration({ levels: ['log', 'warn', 'error'] }),
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],

    enableLogs: true,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    tracePropagationTargets: [serverUrl],

    // debug: true,
  })
}
