import { ReactElement } from 'react'

import { ChatInput } from '../../../src/ui'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: ChatInput,
  title: 'Chat/ChatInput',
})

export const Base = meta.story({
  render: (): ReactElement => (
    <ChatInput
      onSend={incoming => {
        /* eslint-disable-next-line no-console */
        console.log('send this:', incoming)
      }}
    />
  ),
})
