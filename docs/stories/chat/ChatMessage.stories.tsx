import { ReactElement } from 'react'
import { faker } from '@faker-js/faker'

import { ChatMessage } from '../../../src/ui'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: ChatMessage,
  title: 'Chat/ChatMessage',
})

const date = new Date().toISOString()

export const Base = meta.story({
  render: (): ReactElement => (
    <ChatMessage
      content={faker.lorem.sentences(2)}
      date={date}
      id={faker.string.uuid()}
      user={faker.person.fullName()}
    />
  ),
})

export const Own = meta.story({
  render: (): ReactElement => (
    <ChatMessage
      content={faker.lorem.sentences(2)}
      date={date}
      id={faker.string.uuid()}
      own
      user={faker.person.fullName()}
    />
  ),
})

export const Short = meta.story({
  render: (): ReactElement => (
    <ChatMessage
      content={faker.lorem.words(1)}
      date={date}
      id={faker.string.uuid()}
      user={faker.person.fullName()}
    />
  ),
})

export const ShortOwn = meta.story({
  render: (): ReactElement => (
    <ChatMessage
      content={faker.lorem.words(1)}
      date={date}
      id={faker.string.uuid()}
      own
      user={faker.person.fullName()}
    />
  ),
})
