import { ReactElement } from 'react'
import { faker } from '@faker-js/faker'

import { Button } from '../../../src/ui'
import preview from '../../../.storybook/preview'

const meta = preview.meta({
  component: Button,
  title: 'Common/Button',
})

export const Base = meta.story({
  render: (): ReactElement => <Button>{faker.lorem.words(2)}</Button>,
})

export const Primary = meta.story({
  render: (): ReactElement => (
    <Button type="primary">{faker.lorem.words(2)}</Button>
  ),
})

export const Danger = meta.story({
  render: (): ReactElement => (
    <Button status="danger">{faker.lorem.words(2)}</Button>
  ),
})

export const PrimaryDanger = meta.story({
  render: (): ReactElement => (
    <Button status="error" type="primary">
      {faker.lorem.words(2)}
    </Button>
  ),
})

export const Success = meta.story({
  render: (): ReactElement => (
    <Button status="success">{faker.lorem.words(2)}</Button>
  ),
})

export const PrimarySuccess = meta.story({
  render: (): ReactElement => (
    <Button status="success" type="primary">
      {faker.lorem.words(2)}
    </Button>
  ),
})

export const Link = meta.story({
  render: (): ReactElement => (
    <Button ghost href="#" type="primary">
      Link that looks like a button
    </Button>
  ),
})

export const Medium = meta.story({
  render: (): ReactElement => (
    <Button size="middle" type="primary">
      {faker.lorem.words(2)}
    </Button>
  ),
})

export const Small = meta.story({
  render: (): ReactElement => (
    <Button size="small" type="primary">
      {faker.lorem.words(2)}
    </Button>
  ),
})
