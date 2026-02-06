import { ReactNode } from 'react'
import { faker } from '@faker-js/faker'

import { TextArea } from '../../../src/ui'

export const Base = (): ReactNode => (
  <TextArea placeholder={faker.lorem.words(4)} rows={3} />
)

export const AutoSize = (): ReactNode => (
  <TextArea autoSize placeholder={faker.lorem.words(4)} />
)
