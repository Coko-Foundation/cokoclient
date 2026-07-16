import { ReactElement } from 'react'
import { faker } from '@faker-js/faker'

import { ChatMessageList } from '../../../src/ui'
import { createData, randomPick } from '../_helpers'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: ChatMessageList,
  title: 'Chat/ChatMessageList',
})

const createMessages = (
  n: number,
): {
  id: string
  content: string
  date: string
  own: boolean
  user: string
}[] =>
  createData(n, () => ({
    id: faker.string.uuid(),
    content: faker.lorem.sentences(2),
    date: new Date().toISOString(),
    own: randomPick([true, false]),
    user: faker.person.fullName(),
  }))

const messages = createMessages(10)

export const Base = meta.story({
  render: (): ReactElement => <ChatMessageList messages={messages} />,
})

export const Empty = meta.story({
  render: (): ReactElement => <ChatMessageList messages={[]} />,
})
