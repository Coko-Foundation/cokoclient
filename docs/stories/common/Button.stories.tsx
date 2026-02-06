import { ReactNode } from 'react'
import { faker } from '@faker-js/faker'

import { Button } from '../../../src/ui'

export const Base = (): ReactNode => <Button>{faker.lorem.words(2)}</Button>

export const Primary = (): ReactNode => (
  <Button type="primary">{faker.lorem.words(2)}</Button>
)

export const Danger = (): ReactNode => (
  <Button status="danger">{faker.lorem.words(2)}</Button>
)

export const PrimaryDanger = (): ReactNode => (
  <Button status="error" type="primary">
    {faker.lorem.words(2)}
  </Button>
)

export const Success = (): ReactNode => (
  <Button status="success">{faker.lorem.words(2)}</Button>
)

export const PrimarySuccess = (): ReactNode => (
  <Button status="success" type="primary">
    {faker.lorem.words(2)}
  </Button>
)

export const Link = (): ReactNode => (
  <Button ghost href="#" type="primary">
    Link that looks like a button
  </Button>
)
