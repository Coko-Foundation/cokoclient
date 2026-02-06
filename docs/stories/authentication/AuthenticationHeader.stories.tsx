import { ReactNode } from 'react'
import { faker } from '@faker-js/faker'

import { AuthenticationHeader } from '../../../src/ui'

export const Base = (): ReactNode => (
  <AuthenticationHeader>{faker.lorem.words(3)}</AuthenticationHeader>
)
