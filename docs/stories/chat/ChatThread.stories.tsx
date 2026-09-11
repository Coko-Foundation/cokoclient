import { ReactElement } from 'react'
import { faker } from '@faker-js/faker'

import { ChatThread } from '../../../src/ui'
import { createData, randomPick } from '../_helpers'
import { noop } from '../../../src/toolkit/funcs'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: ChatThread,
  title: 'Chat/ChatThread',
})

type Datum = {
  id: string
  content: string
  date: string
  own: boolean
  user: string
}

const createMessages = (n: number): Datum[] =>
  createData(
    n,
    (i: number): Datum => ({
      id: `${i}`,
      content: faker.lorem.sentences(2),
      date: new Date().toISOString(),
      own: randomPick([true, false]),
      user: faker.person.fullName(),
    }),
  )

const messages = createMessages(5)

export const Base = meta.story({
  render: (): ReactElement => <ChatThread messages={messages} onSend={noop} />,
})

export const Empty = meta.story({
  render: (): ReactElement => <ChatThread onSend={noop} />,
})
