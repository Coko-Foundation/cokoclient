import React from 'react'
// import { lorem } from 'faker'

import { ChatInput } from '../../../src/ui'

export const Base = () => (
  <ChatInput
    onSend={incoming => {
      /* eslint-disable-next-line no-console */
      console.log('send this:', incoming)
    }}
  />
)

