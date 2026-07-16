import { ReactElement } from 'react'
import { faker } from '@faker-js/faker'
import { Paragraph, Text } from '../../../src/ui'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: Paragraph,
  title: 'Common/Typography',
})

export const Base = meta.story({
  render: (): ReactElement => (
    <Paragraph>{faker.lorem.sentences(10)}</Paragraph>
  ),
})

export const ParagraphDemo = meta.story({
  render: (): ReactElement => (
    <Paragraph>{faker.lorem.sentences(10)}</Paragraph>
  ),
})

export const TextDemo = meta.story({
  render: (): ReactElement => <Text>{faker.lorem.sentence()}</Text>,
})

export const StrongText = meta.story({
  render: (): ReactElement => <Text strong>{faker.lorem.sentence()}</Text>,
})
