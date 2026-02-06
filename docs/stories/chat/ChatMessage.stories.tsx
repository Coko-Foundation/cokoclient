import { ReactNode } from 'react'
import { faker } from '@faker-js/faker'

import { ChatMessage } from '../../../src/ui'

const date = new Date().toISOString()

export const Base = (): ReactNode => (
  <ChatMessage
    content={faker.lorem.sentences(2)}
    date={date}
    id={faker.string.uuid()}
    user={faker.person.fullName()}
  />
)

export const Own = (): ReactNode => (
  <ChatMessage
    content={faker.lorem.sentences(2)}
    date={date}
    id={faker.string.uuid()}
    own
    user={faker.person.fullName()}
  />
)

export const Short = (): ReactNode => (
  <ChatMessage
    content={faker.lorem.words(1)}
    date={date}
    id={faker.string.uuid()}
    user={faker.person.fullName()}
  />
)

export const ShortOwn = (): ReactNode => (
  <ChatMessage
    content={faker.lorem.words(1)}
    date={date}
    id={faker.string.uuid()}
    own
    user={faker.person.fullName()}
  />
)
