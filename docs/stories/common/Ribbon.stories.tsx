import { ReactElement } from 'react'
import { faker } from '@faker-js/faker'
import { Ribbon } from '../../../src/ui'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: Ribbon,
  title: 'Common/Ribbon',
})

export const Base = meta.story({
  render: (): ReactElement => <Ribbon>{faker.lorem.words(4)}</Ribbon>,
})

export const Success = meta.story({
  render: (): ReactElement => (
    <Ribbon status="success">{faker.lorem.words(4)}</Ribbon>
  ),
})

export const Error = meta.story({
  render: (): ReactElement => (
    <Ribbon status="error">{faker.lorem.words(4)}</Ribbon>
  ),
})
