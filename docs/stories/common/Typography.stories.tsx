import { ReactNode } from 'react'
import { faker } from '@faker-js/faker'
import { Paragraph, Text } from '../../../src/ui'

export const Base = (): ReactNode => (
  <Paragraph>{faker.lorem.sentences(10)}</Paragraph>
)

export const ParagraphDemo = (): ReactNode => (
  <Paragraph>{faker.lorem.sentences(10)}</Paragraph>
)

export const TextDemo = (): ReactNode => <Text>{faker.lorem.sentence()}</Text>

export const StrongText = (): ReactNode => (
  <Text strong>{faker.lorem.sentence()}</Text>
)
