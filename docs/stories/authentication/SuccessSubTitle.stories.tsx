import { ReactNode } from 'react'
import { faker } from '@faker-js/faker'

import { SuccessSubTitle } from '../../../src/ui'

export const Base = (): ReactNode => (
  <SuccessSubTitle userEmail={faker.internet.email()} />
)
