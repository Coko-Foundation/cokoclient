import { ReactNode } from 'react'
import { faker } from '@faker-js/faker'
import { Ribbon } from '../../../src/ui'

export const Base = (): ReactNode => <Ribbon>{faker.lorem.words(4)}</Ribbon>

export const Success = (): ReactNode => (
  <Ribbon status="success">{faker.lorem.words(4)}</Ribbon>
)

export const Error = (): ReactNode => (
  <Ribbon status="error">{faker.lorem.words(4)}</Ribbon>
)
