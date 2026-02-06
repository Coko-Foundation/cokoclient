import { ReactNode } from 'react'

import { ChatInput } from '../../../src/ui'

export const Base = (): ReactNode => (
  <ChatInput
    onSend={incoming => {
      /* eslint-disable-next-line no-console */
      console.log('send this:', incoming)
    }}
  />
)
